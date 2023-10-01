using Igtampe.Actions;
using Igtampe.ChopoSessionManager;
using Igtampe.David2.Actions.Exceptions;
using Igtampe.David2.Actions.Requests;
using Igtampe.David2.Common;
using Igtampe.David2.Data;
using Microsoft.EntityFrameworkCore;

namespace Igtampe.David2.Actions {
    public class CommissionAgent : SessionedActionAgent<DavidContext> {

        private UserAgent UserAgent { get; set; }
        private ArtistAgent ArtistAgent { get; set; }
        private CharacterAgent CharacterAgent { get; set; }
        private TagAgent TagAgent { get; set; }
        
        public CommissionAgent(DavidContext Context, ISessionManager Manager) : base(Context, Manager) {
            UserAgent = new UserAgent(Context, Manager);
            ArtistAgent = new ArtistAgent(Context, Manager);
            CharacterAgent = new CharacterAgent(Context, Manager);
            TagAgent = new TagAgent(Context, Manager);
        }

        #region Read

        public static Dictionary<Status, List<Commission>> OrganizeCommissionList(List<Commission> commissions) {
            //Group this list by status
            var d = commissions.GroupBy(A => A.Status)
                .ToDictionary(
                    A => A.Key, 
                    A => A.OrderByDescending(B=>B.EndDate.HasValue)
                    .ThenByDescending(B=>B.EndDate)
                    .ThenByDescending(B=>B.StartDate.HasValue)
                    .ThenByDescending(B=>B.StartDate)
                    .ToList()
                );

            return d;
        }

        public async Task<Commission> Get(Guid? session, Guid id, bool getEverything = false) {
            var s = await GetSession(session);
            IQueryable<Commission> query = Context.UserCommissions(s.Username);
            if(getEverything) query=DavidContext.ApplyAutoIncludes(query);

            return await query.FirstOrDefaultAsync(A => A.ID == id) 
                ?? throw new CommissionNotFoundException(id);
        }

        public async Task<List<Commission>> Get(Guid? session) {
            var s = await GetSession(session);
            var c = await DavidContext.ApplyAutoIncludes(Context.UserCommissions(s.Username)).ToListAsync();
            return c;
        }

        public async Task<List<Commission>> GetByArtist(Guid? session, Guid artist) {
            var s = await GetSession(session);
            var c = await DavidContext.ApplyAutoIncludes(Context.UserCommissions(s.Username))
                .Where(A=>A.Artist!=null && A.Artist.ID==artist)
                .ToListAsync();
            return c;
        }

        public async Task<List<Commission>> GetByCharacter(Guid? session, Guid character) {
            var s = await GetSession(session);
            var c = await DavidContext.ApplyAutoIncludes(Context.UserCommissions(s.Username))
                .Where(A => A.Characters.Any(B=>B.ID==character))
                .ToListAsync();
            return c;
        }

        public async Task<List<Commission>> GetByTag(Guid? session, Guid tag) {
            var s = await GetSession(session);
            var c = await DavidContext.ApplyAutoIncludes(Context.UserCommissions(s.Username))
                .Where(A => A.Tags.Any(B => B.ID == tag))
                .ToListAsync();
            return c;
        }

        #endregion

        #region Create

        public async Task<Commission> Create(Guid? session, CommissionRequest request) {
            var u = await UserAgent.GetMe(session)
                ?? throw new InvalidOperationException("This isn't supposed to happen");

            var c = new Commission() {
                Name = request.Name,
                Description = request.Description,
                ImageURL = request.ImageURL,
                Color = request.Color,
                Price = request.Price,
                Owner = u,

                BodyType = request.BodyType,
                ColorType = request.ColorType,
                Status = request.Status,

                Artist = request.Artist == null ?
                    null : await ArtistAgent.Get(session,request.Artist ?? throw new InvalidOperationException("This isn't supposed to happen")),

                StartDate = request.StartDate,
                EndDate = request.EndDate,
                ExpectedDate = request.ExpectedDate,
            };

            //Get the tags 
            foreach (var tag in request.Tags) {
                //Get the tag
                var t = await TagAgent.Get(session, tag);

                //Add the tag
                c.Tags.Add(t);
            }

            //Get the characters
            foreach (var character in request.Characters) {
                //Get the tag
                var ch = await CharacterAgent.Get(session, character);

                //Add the tag
                c.Characters.Add(ch);
            }

            Context.Add(c);
            await Context.SaveChangesAsync();
            return c;
        }

        #endregion

        #region Update
        
        public async Task<Commission> Update(Guid? session, Guid id, CommissionRequest request) {

            //Get the Commission
            var c = await Get(session, id);

            c.Name = request.Name;
            c.Description = request.Description;
            c.ImageURL = request.ImageURL;
            c.Color = request.Color;
            c.Price = request.Price;

            c.BodyType = request.BodyType;
            c.ColorType = request.ColorType;
            c.Status = request.Status;

            c.Artist = request.Artist == null ?
                 null : await ArtistAgent.Get(session, request.Artist ?? throw new InvalidOperationException("This isn't supposed to happen"));

            c.StartDate = request.StartDate;
            c.EndDate = request.EndDate;
            c.ExpectedDate = request.ExpectedDate;

            c.Tags.Clear();

            //Get the tags 
            foreach (var tag in request.Tags) {
                //Get the tag
                var t = await TagAgent.Get(session, tag);

                //Add the tag
                c.Tags.Add(t);
            }

            c.Characters.Clear();

            //Get the characters
            foreach (var character in request.Characters) {
                //Get the tag
                var ch = await CharacterAgent.Get(session, character);

                //Add the tag
                c.Characters.Add(ch);
            }

            Context.Update(c);
            await Context.SaveChangesAsync();
            return c;

        }

        public async Task<Commission> UpdateStatus(Guid? session, Guid id, Status status) {
            //Get the Commission
            var c = await Get(session, id);
            c.Status = status;

            Context.Update(c);
            await Context.SaveChangesAsync();

            return c;
        }

        public async Task<Commission> Paid(Guid? session, Guid id) {
            //Get the Commission
            var c = await Get(session, id);
            c.Status = Status.COMMISSIONED;
            c.StartDate= DateTime.UtcNow;

            Context.Update(c);
            await Context.SaveChangesAsync();

            return c;
        }

        public async Task<Commission> Finished(Guid? session, Guid id) {
            //Get the Commission
            var c = await Get(session, id);
            c.Status = Status.DONE;
            c.EndDate = DateTime.UtcNow;

            Context.Update(c);
            await Context.SaveChangesAsync();

            return c;
        }

        #endregion

        #region Delete
        public async Task<Commission> Delete(Guid? session, Guid id) {

            //Get the Commission (this also verifies ownership)
            var c = await Get(session, id);

            //Then boom boom adios
            Context.Remove(c);
            await Context.SaveChangesAsync();

            return c;

        }

        #endregion
    }
}