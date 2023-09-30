using Igtampe.David2.Common;
using Igtampe.Exceptions;

namespace Igtampe.David2.Actions.Exceptions {
   
    public class ArtistNotFoundException : ObjectNotFoundException<Artist, Guid> {
        public ArtistNotFoundException(Guid ID) : base(ID) { }
    }
    public class CharacterNotFoundException : ObjectNotFoundException<Character, Guid> {
        public CharacterNotFoundException(Guid ID) : base(ID) { }
    }
    public class CommissionNotFoundException : ObjectNotFoundException<Commission, Guid> {
        public CommissionNotFoundException(Guid ID) : base(ID) { }
    }
    public class TagNotFoundException : ObjectNotFoundException<Tag, Guid> {
        public TagNotFoundException(Guid ID) : base(ID) { }
    }
}
