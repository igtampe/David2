using System.Text.Json.Serialization;

namespace Igtampe.David2.Common {
    public class User : ChopoAuth.User {

        [JsonIgnore]
        public List<Artist> Artists { get; set; } = new();
        
        [JsonIgnore]
        public List<Character> Characters { get; set; } = new();
        
        [JsonIgnore]
        public List<Commission> Commissions { get; set; } = new();

        [JsonIgnore]
        public List<Tag> Tags { get; set; } = new();
    }
}
