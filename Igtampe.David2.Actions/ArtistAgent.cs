using Igtampe.Actions;
using Igtampe.ChopoSessionManager;
using Igtampe.David2.Actions.Exceptions;
using Igtampe.David2.Actions.Requests;
using Igtampe.David2.Common;
using Igtampe.David2.Data;
using Microsoft.EntityFrameworkCore;

namespace Igtampe.David2.Actions {
    public class ArtistAgent : SessionedActionAgent<DavidContext> {

        private UserAgent UserAgent { get; set; }

        public ArtistAgent(DavidContext Context, ISessionManager Manager) : base(Context, Manager) 
            => UserAgent = new UserAgent(Context, Manager);

        #region Read

        public async Task<Artist> Get(Guid? session, Guid id) {
            var s = await GetSession(session);
            var a = await Context.UserArtists(s.Username).FirstOrDefaultAsync(A => A.ID == id);
            return a ?? throw new ArtistNotFoundException(id);
        }

        public async Task<List<Artist>> Get(Guid? session) {
            var s = await GetSession(session);
            var a = await Context.UserArtists(s.Username).ToListAsync();
            return a;
        }

        #endregion

        #region Create

        public async Task<Artist> Create(Guid? session, ArtistRequest request) {
            var u = await UserAgent.GetMe(session)
                ?? throw new InvalidOperationException("This isn't supposed to happen");

            var a = new Artist() {
                Name = request.Name,
                Color = request.Color,
                URL = request.URL,
                ImageURL = request.ImageURL,
                Owner = u
            };

            Context.Add(a);
            await Context.SaveChangesAsync();
            return a;
        }

        #endregion

        #region Update
        public async Task<Artist> Update(Guid? session, Guid id, ArtistRequest request) {

            //Get the Artist
            var a = await Get(session, id);

            a.Name = request.Name;
            a.Color = request.Color;
            a.ImageURL = request.ImageURL;
            a.URL = request.URL;

            Context.Update(a);
            await Context.SaveChangesAsync();
            return a;

        }
        #endregion

        #region Delete
        public async Task<Artist> Delete(Guid? session, Guid id) {

            //Get the Artist (this also verifies ownership)
            var a = await Get(session, id);

            //Then boom boom adios
            Context.Remove(a);
            await Context.SaveChangesAsync();

            return a;

        }

        #endregion

    }
}