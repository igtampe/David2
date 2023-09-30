using Igtampe.Actions;
using Igtampe.ChopoSessionManager;
using Igtampe.David2.Common;
using Igtampe.David2.Data;

namespace Igtampe.David2.Actions {
    public class UserAgent : AuthAgent<DavidContext, User> {
        
        public UserAgent(DavidContext Context, ISessionManager Manager) : base(Context, Manager) {}
    }
}