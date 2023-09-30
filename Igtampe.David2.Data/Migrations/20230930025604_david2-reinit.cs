using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Igtampe.David2.Data.Migrations
{
    public partial class david2reinit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Username = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ImageURL = table.Column<string>(type: "text", nullable: false),
                    IsAdmin = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table => table.PrimaryKey("PK_User", x => x.Username));

            migrationBuilder.CreateTable(
                name: "Artist",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    URL = table.Column<string>(type: "text", nullable: false),
                    ImageURL = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    OwnerUsername = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artist", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Artist_User_OwnerUsername",
                        column: x => x.OwnerUsername,
                        principalTable: "User",
                        principalColumn: "Username");
                });

            migrationBuilder.CreateTable(
                name: "Character",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ImageURL = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    OwnerUsername = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Character", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Character_User_OwnerUsername",
                        column: x => x.OwnerUsername,
                        principalTable: "User",
                        principalColumn: "Username");
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    OwnerUsername = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Tag_User_OwnerUsername",
                        column: x => x.OwnerUsername,
                        principalTable: "User",
                        principalColumn: "Username");
                });

            migrationBuilder.CreateTable(
                name: "Commission",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ArtistID = table.Column<Guid>(type: "uuid", nullable: true),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    BodyType = table.Column<int>(type: "integer", nullable: false),
                    ColorType = table.Column<int>(type: "integer", nullable: false),
                    ImageURL = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpectedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OwnerUsername = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commission", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Commission_Artist_ArtistID",
                        column: x => x.ArtistID,
                        principalTable: "Artist",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Commission_User_OwnerUsername",
                        column: x => x.OwnerUsername,
                        principalTable: "User",
                        principalColumn: "Username");
                });

            migrationBuilder.CreateTable(
                name: "CharacterCommission (Dictionary<string, object>)",
                columns: table => new
                {
                    CharactersID = table.Column<Guid>(type: "uuid", nullable: false),
                    CommissionsID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterCommission (Dictionary<string, object>)", x => new { x.CharactersID, x.CommissionsID });
                    table.ForeignKey(
                        name: "FK_CharacterCommission (Dictionary<string, object>)_Character_~",
                        column: x => x.CharactersID,
                        principalTable: "Character",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CharacterCommission (Dictionary<string, object>)_Commission~",
                        column: x => x.CommissionsID,
                        principalTable: "Commission",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CommissionTag (Dictionary<string, object>)",
                columns: table => new
                {
                    CommissionsID = table.Column<Guid>(type: "uuid", nullable: false),
                    TagsID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommissionTag (Dictionary<string, object>)", x => new { x.CommissionsID, x.TagsID });
                    table.ForeignKey(
                        name: "FK_CommissionTag (Dictionary<string, object>)_Commission_Commi~",
                        column: x => x.CommissionsID,
                        principalTable: "Commission",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommissionTag (Dictionary<string, object>)_Tag_TagsID",
                        column: x => x.TagsID,
                        principalTable: "Tag",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artist_OwnerUsername",
                table: "Artist",
                column: "OwnerUsername");

            migrationBuilder.CreateIndex(
                name: "IX_Character_OwnerUsername",
                table: "Character",
                column: "OwnerUsername");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterCommission (Dictionary<string, object>)_Commission~",
                table: "CharacterCommission (Dictionary<string, object>)",
                column: "CommissionsID");

            migrationBuilder.CreateIndex(
                name: "IX_Commission_ArtistID",
                table: "Commission",
                column: "ArtistID");

            migrationBuilder.CreateIndex(
                name: "IX_Commission_OwnerUsername",
                table: "Commission",
                column: "OwnerUsername");

            migrationBuilder.CreateIndex(
                name: "IX_CommissionTag (Dictionary<string, object>)_TagsID",
                table: "CommissionTag (Dictionary<string, object>)",
                column: "TagsID");

            migrationBuilder.CreateIndex(
                name: "IX_Tag_OwnerUsername",
                table: "Tag",
                column: "OwnerUsername");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CharacterCommission (Dictionary<string, object>)");

            migrationBuilder.DropTable(
                name: "CommissionTag (Dictionary<string, object>)");

            migrationBuilder.DropTable(
                name: "Character");

            migrationBuilder.DropTable(
                name: "Commission");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "Artist");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
