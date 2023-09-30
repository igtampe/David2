using Igtampe.David2.Common;
using Igtampe.DBContexts;
using Microsoft.EntityFrameworkCore;

namespace Igtampe.David2.Data {
    public class DavidContext : PostgresContext, IUserContext<User> {

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public DbSet<Artist> Artist { get; set; }
        public DbSet<Character> Character { get; set; }
        public DbSet<Commission> Commission { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<User> User { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public static IQueryable<Commission> ApplyAutoIncludes(IQueryable<Commission> queryable)
            => queryable.Include(A => A.Artist).Include(A => A.Characters).Include(A => A.Tags);

        public static IQueryable<E> UserOwned<E>(IQueryable<E> queryable, string user) where E : Ownable<User> 
            => queryable.Where(A => A.Owner != null && A.Owner.Username == user);

        public IQueryable<Artist> UserArtists(string user) => UserOwned(Artist, user);
        public IQueryable<Character> UserCharacters(string user) => UserOwned(Character, user);
        public IQueryable<Commission> UserCommissions(string user) => UserOwned(Commission, user);
        public IQueryable<Tag> UserTags(string user) => UserOwned(Tag, user);

    }
}