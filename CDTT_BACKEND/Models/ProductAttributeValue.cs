//Giá trị thuộc tính
using System.Text.Json.Serialization;

namespace CDTT_BACKEND.Models
{
    public class ProductAttributeValue
    {
        public int Id { get; set; }

        public int ProductAttributeId { get; set; }

        // Giá trị cụ thể (vd: "Đen", "XL", "128GB")
        public string Value { get; set; } = string.Empty;

        // Quan hệ với ProductAttribute
        [JsonIgnore]
        public ProductAttribute? ProductAttribute { get; set; }

        // Quan hệ Nhiều - Nhiều với ProductVariant
        [JsonIgnore]
        public ICollection<ProductVariant> ProductVariants { get; set; } = new List<ProductVariant>();
    }
}