using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace open_project_web_api.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShortDesc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LongDesc = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Exposures",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShortDesc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LongDesc = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ProjectID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exposures", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Exposures_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exposures_ProjectID",
                table: "Exposures",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ShortDesc_StartDate",
                table: "Projects",
                columns: new[] { "ShortDesc", "StartDate" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exposures");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
