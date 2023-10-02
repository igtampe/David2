using Igtampe.Actions;
using Igtampe.ChopoSessionManager;
using Igtampe.David2.Actions.Exceptions;
using Igtampe.David2.Actions.Requests;
using Igtampe.David2.Common;
using Igtampe.David2.Data;
using Microsoft.EntityFrameworkCore;

namespace Igtampe.David2.Actions {
    public class CharacterAgent : SessionedActionAgent<DavidContext> {

        private UserAgent UserAgent { get; set; }

        public CharacterAgent(DavidContext Context, ISessionManager Manager) : base(Context, Manager) 
            => UserAgent = new UserAgent(Context, Manager);

        #region Read

        public async Task<Character> Get(Guid? session, Guid id) {
            var s = await GetSession(session);
            var c = await Context.UserCharacters(s.Username).FirstOrDefaultAsync(A => A.ID == id);
            return c ?? throw new TagNotFoundException(id);
        }

        public async Task<List<Character>> Get(Guid? session) {
            var s = await GetSession(session);
            var c = await Context.UserCharacters(s.Username)
                .OrderBy(A => A.Name)
                .ToListAsync();
            return c;
        }

        #endregion

        #region Create

        public async Task<Character> Create(Guid? session, CharacterRequest request) {
            var u = await UserAgent.GetMe(session)
                ?? throw new InvalidOperationException("This isn't supposed to happen");

            var c = new Character() {
                Name = request.Name,
                ImageURL = request.ImageURL,
                Color = request.Color,
                Owner = u
            };

            Context.Add(c);
            await Context.SaveChangesAsync();
            return c;
        }

        #endregion

        #region Update
        public async Task<Character> Update(Guid? session, Guid id, CharacterRequest request) {

            //Get the tag
            var c = await Get(session, id);

            c.Name = request.Name;
            c.Color = request.Color;
            c.ImageURL = request.ImageURL;

            Context.Update(c);
            await Context.SaveChangesAsync();
            return c;

        }
        #endregion

        #region Delete
        public async Task<Character> Delete(Guid? session, Guid id) {

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