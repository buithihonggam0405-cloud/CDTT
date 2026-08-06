using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CDTT_BACKEND.Models
{
    [Table("product_images")] // Đổi tên bảng dưới CSDL thành snake_case
    public class ProductImage
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("product_id")]
        public int product_id { get; set; } // Hoặc để ProductId với [Column("product_id")]

        [Column("image_url")]
        public string image_url { get; set; } = string.Empty;

        [Column("sort_order")]
        public int SortOrder { get; set; } = 0;

        // Quan hệ Navigation với Product (Trường FK phải trùng với tên ở trên)
        [ForeignKey("product_id")]
        [JsonIgnore]
        public Product? Product { get; set; }
    }
}