using System.Text.Json.Serialization;

namespace Igtampe.David2.Common {

    public enum BodyType {
        NA = -1,
        NONE = 0,
        BUST = 2,
        HALF = 3,
        FULL = 4
    }

    public enum ColorType {
        NA = -1,
        NONE = 0,
        SKETCH = 1,
        LINEART = 2,
    }

    public enum Status {
        BRAINSTORMING = 0,
        READY = 1,
        SCHEDULED = 2,
        COMMISSIONED = 3,
        SKETCHED = 4,
        COLORED = 5,
        DONE = 6
    }

    public class Commission : AutomaticallyGeneratableIdentifiable, Depictable, Nameable, Describable, Ownable<User> {

        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public Artist? Artist { get; set; }
        public int Price { get; set; } = 0;
        public List<Character> Characters { get; set; } = new();
        public int CharCount => Characters.Count;
        public Status Status { get; set; } = Status.BRAINSTORMING;
        
        public BodyType BodyType { get; set; } = BodyType.NONE;
        public ColorType ColorType { get; set; } = ColorType.NONE;
        public string ImageURL { get; set; } = "";
        public string Color { get; set; } = "";
        public List<Tag> Tags { get; set; } = new();

        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set;} = null;
        public DateTime? ExpectedDate { get; set;} = null;
        public int? SLA => (ExpectedDate - StartDate)?.Days;
        public int? TTC => (EndDate - StartDate)?.Days;

        public int? DaysOver => (DateTime.Now - ExpectedDate)?.Days;

        public bool IsOverdue => DaysOver > 0;
        public DateOnly? Month => StartDate==null ? null : 
            new DateOnly(StartDate?.Year ?? 1, StartDate?.Month ?? 1, 1);

        [JsonIgnore]
        public User? Owner { get; set; }
    }
}