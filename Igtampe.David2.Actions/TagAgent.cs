using Igtampe.Actions;
using Igtampe.ChopoSessionManager;
using Igtampe.David2.Actions.Exceptions;
using Igtampe.David2.Actions.Requests;
using Igtampe.David2.Common;
using Igtampe.David2.Data;
using Microsoft.EntityFrameworkCore;

namespace Igtampe.David2.Actions {
    public class TagAgent : SessionedActionAgent<DavidContext> {

        private UserAgent UserAgent { get; set; }

        public TagAgent(DavidContext Context, ISessionManager Manager) : base(Context, Manager) 
            => UserAgent = new UserAgent(Context, Manager);

        #region Read

        public async Task<Tag> Get(Guid? session, Guid id) {
            var s = await GetSession(session);
            var t = await Context.UserTags(s.Username).FirstOrDefaultAsync(A=>A.ID == id);
            return t ?? throw new TagNotFoundException(id);
        }

        public async Task<List<Tag>> Get(Guid? session) {
            var s = await GetSession(session);
            var t = await Context.UserTags(s.Username)
                .OrderBy(A=>A.Name)
                .ToListAsync();
            return t;
        }

        #endregion

        #region Create

        public async Task<Tag> Create(Guid? session, TagRequest request) {
            var u = await UserAgent.GetMe(session) 
                ?? throw new InvalidOperationException("This isn't supposed to happen");
            
            var t = new Tag() {
                Name = request.Name,
                Color = request.Color,
                Owner = u
            };
            
            Context.Add(t);
            await Context.SaveChangesAsync();
            return t;
        }

        #endregion

        #region Update
        public async Task<Tag> Update(Guid? session, Guid id, TagRequest request) { 

            //Get the tag
            var t = await Get(session, id);
            
            t.Name = request.Name;
            t.Color = request.Color;

            Context.Update(t);
            await Context.SaveChangesAsync();
            return t;
        
        }
        #endregion

        #region Delete
        public async Task<Tag> Delete(Guid? session, Guid id) {

            //Get the tag (this also verifies ownership)
            var t = await Get(session, id);

            //Then boom boom adios
            Context.Remove(t);
            await Context.SaveChangesAsync();

            return t;

        }

        #endregion

    }
}