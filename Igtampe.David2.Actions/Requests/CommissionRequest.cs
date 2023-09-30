using Igtampe.David2.Common;

namespace Igtampe.David2.Actions.Requests {
    public class CommissionRequest {
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public Guid? Artist { get; set; }
        public int Price { get; set; } = 0;
        public List<Guid> Characters { get; set; } = new();
        public Status Status { get; set; } = Status.BRAINSTORMING;
        public BodyType BodyType { get; set; } = BodyType.NONE;
        public ColorType ColorType { get; set; } = ColorType.NONE;
        public string ImageURL { get; set; } = "";
        public string Color { get; set; } = "";
        public List<Guid> Tags { get; set; } = new();
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;
        public DateTime? ExpectedDate { get; set; } = null;
    }
}
