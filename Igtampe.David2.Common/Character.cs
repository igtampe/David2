using System.Text.Json.Serialization;

namespace Igtampe.David2.Common {
    public class Character : AutomaticallyGeneratableIdentifiable, Nameable, Depictable, Ownable<User> {
        public string Name { get; set; } = "";
        public string ImageURL { get; set; } = "";
        public string Color { get; set; } = "";

        [JsonIgnore]
        public List<Commission> Commissions { get; set; } = new();

        [JsonIgnore]
        public User? Owner { get; set; }
    }
}
