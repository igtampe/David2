
using Igtampe.David2.Data;
using Igtampe.Redistributables.Launcher;
using Igtampe.Toffee.Backend.ExceptionHandling;

namespace Igtampe.David2.API {
    public class Program {
        public static void Main(string[] args) {
            Launcher.Launch<DavidContext, DavidExceptionHandlingMiddleware>(new() {
                AllowAllCORS = true,
                AlwaysDev = true,
                App = new() {
                    Name = "David2",
                    Description = "A second attempt of David, a commission tracking application",
                    License = "CC0",
                    ProducesXML = false,
                    XMLDocLoc = "",
                    Version = "v2"
                },
                Author = new() {
                    Name = "Chopo",
                    Email = "me@igtampe.com",
                    Url = "https://www.igtampe.com"
                }
            }, args);
        }
    }
}