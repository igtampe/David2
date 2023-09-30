using Igtampe.ChopoSessionManager;
using Igtampe.Controllers;
using Igtampe.David2.Common;
using Igtampe.David2.Data;
using Microsoft.AspNetCore.Mvc;

namespace Igtampe.Toffee.Backend.Controllers {

    [Route("API/Users")]
    [ApiController]
    public class DavidUserController : UserController<DavidContext, User> {
        public DavidUserController(DavidContext Context) : base(Context, SessionManager.Manager) { }
    }
}