using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CDTT_BACKEND.Migrations
{
    /// <inheritdoc />
    public partial class FixProductVariantAndAttributeFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductAttribute_Products_ProductId",
                table: "ProductAttribute");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariant_Products_ProductId",
                table: "ProductVariant");

            migrationBuilder.DropIndex(
                name: "IX_ProductAttribute_ProductId",
                table: "ProductAttribute");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ProductAttribute");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "ProductVariant",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttribute_product_id",
                table: "ProductAttribute",
                column: "product_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductAttribute_Products_product_id",
                table: "ProductAttribute",
                column: "product_id",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariant_Products_ProductId",
                table: "ProductVariant",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductAttribute_Products_product_id",
                table: "ProductAttribute");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariant_Products_ProductId",
                table: "ProductVariant");

            migrationBuilder.DropIndex(
                name: "IX_ProductAttribute_product_id",
                table: "ProductAttribute");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "ProductVariant",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "ProductAttribute",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttribute_ProductId",
                table: "ProductAttribute",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductAttribute_Products_ProductId",
                table: "ProductAttribute",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariant_Products_ProductId",
                table: "ProductVariant",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
