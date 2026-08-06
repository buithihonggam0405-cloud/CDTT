using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CDTT_BACKEND.Migrations
{
    /// <inheritdoc />
    public partial class ChangeVariantAttributeValueToManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductVariantAttributeValue",
                columns: table => new
                {
                    AttributeValueId = table.Column<int>(type: "int", nullable: false),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductVariantAttributeValue", x => new { x.AttributeValueId, x.ProductVariantId });
                    table.ForeignKey(
                        name: "FK_ProductVariantAttributeValue_ProductAttributeValue_AttributeValueId",
                        column: x => x.AttributeValueId,
                        principalTable: "ProductAttributeValue",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductVariantAttributeValue_ProductVariant_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "ProductVariant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariantAttributeValue_ProductVariantId",
                table: "ProductVariantAttributeValue",
                column: "ProductVariantId");

            // Copy existing relationship data to join table before dropping the foreign key column
            migrationBuilder.Sql("INSERT INTO ProductVariantAttributeValue (ProductVariantId, AttributeValueId) SELECT ProductVariantId, Id FROM ProductAttributeValue WHERE ProductVariantId IS NOT NULL");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductAttributeValue_ProductVariant_ProductVariantId",
                table: "ProductAttributeValue");

            migrationBuilder.DropIndex(
                name: "IX_ProductAttributeValue_ProductVariantId",
                table: "ProductAttributeValue");

            migrationBuilder.DropColumn(
                name: "ProductVariantId",
                table: "ProductAttributeValue");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductVariantId",
                table: "ProductAttributeValue",
                type: "int",
                nullable: true);

            // Copy relationship data back from join table
            migrationBuilder.Sql("UPDATE ProductAttributeValue SET ProductVariantId = (SELECT TOP 1 ProductVariantId FROM ProductVariantAttributeValue WHERE AttributeValueId = ProductAttributeValue.Id)");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttributeValue_ProductVariantId",
                table: "ProductAttributeValue",
                column: "ProductVariantId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductAttributeValue_ProductVariant_ProductVariantId",
                table: "ProductAttributeValue",
                column: "ProductVariantId",
                principalTable: "ProductVariant",
                principalColumn: "Id");

            migrationBuilder.DropTable(
                name: "ProductVariantAttributeValue");
        }
    }
}
