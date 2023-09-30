using Igtampe.ChopoSessionManager;
using Igtampe.David2.Actions;
using Igtampe.David2.Actions.Requests;
using Igtampe.David2.Common;
using Igtampe.David2.Data;
using Microsoft.AspNetCore.Mvc;

namespace Igtampe.Toffee.Backend.Controllers {

    [Route("API/Commission")]
    [ApiController]
    public class CommissionController : ControllerBase {

        private readonly CommissionAgent agent;

        public CommissionController(DavidContext Context)
            => agent = new(Context, SessionManager.Manager);

        [HttpGet]
        public async Task<IActionResult> Get([FromHeader] Guid? SessionID)
            => Ok(CommissionAgent.OrganizeCommissionList(await agent.Get(SessionID)));

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.Get(SessionID, id, true));

        [HttpGet("Artist/{id}")]
        public async Task<IActionResult> GetByArtist([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.GetByArtist(SessionID, id));

        [HttpGet("Character/{id}")]
        public async Task<IActionResult> GetByCharacter([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.GetByCharacter(SessionID, id));

        [HttpGet("Tag/{id}")]
        public async Task<IActionResult> GetByTag([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.GetByTag(SessionID, id));

        //---------------------------------------------------------------------------------------------------------------

        [HttpPost]
        public async Task<IActionResult> Create([FromHeader] Guid? SessionID, [FromBody] CommissionRequest request)
            => Ok(await agent.Create(SessionID, request));

        //---------------------------------------------------------------------------------------------------------------

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromHeader] Guid? SessionID, [FromRoute] Guid id, [FromBody] CommissionRequest request)
            => Ok(await agent.Update(SessionID, id, request));

        [HttpPut("{id}/status/{status}")]
        public async Task<IActionResult> UpdateStatus([FromHeader] Guid? SessionID, [FromRoute] Guid id, [FromRoute] Status status)
            => Ok(await agent.UpdateStatus(SessionID, id, status));

        [HttpPut("{id}/paid")]
        public async Task<IActionResult> UpdatePaid([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.Paid(SessionID, id));

        [HttpPut("{id}/finish")]
        public async Task<IActionResult> UpdateFinished([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.Finished(SessionID, id));

        //---------------------------------------------------------------------------------------------------------------

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromHeader] Guid? SessionID, [FromRoute] Guid id)
            => Ok(await agent.Delete(SessionID, id));

    }
}