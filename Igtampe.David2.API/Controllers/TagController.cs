using Igtampe.ChopoSessionManager;
using Igtampe.David2.Actions;
using Igtampe.David2.Actions.Requests;
using Igtampe.David2.Data;
using Microsoft.AspNetCore.Mvc;

namespace Igtampe.Toffee.Backend.Controllers {

    [Route("API/Tag")]
    [ApiController]
    public class TagController : ControllerBase {

        private readonly TagAgent agent;

        public TagController(DavidContext Context)
            => agent = new(Context, SessionManager.Manager);

        [HttpGet]
        public async Task<IActionResult> Get([FromHeader] Guid? SessionID)
            => Ok(await agent.Get(SessionID));

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.Get(SessionID, id));

        [HttpPost]
        public async Task<IActionResult> Create([FromHeader] Guid? SessionID, [FromBody] TagRequest request)
            => Ok(await agent.Create(SessionID, request));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromHeader] Guid? SessionID, [FromRoute] Guid id, [FromBody] TagRequest request)
            => Ok(await agent.Update(SessionID, id, request));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.Delete(SessionID, id));
    }
}