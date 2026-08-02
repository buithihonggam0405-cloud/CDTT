//Giá trị thuộc tính
namespace CDTT_BACKEND.Models
{
    public class ProductAttributeValue
    {
        public int Id { get; set; }

        public int ProductAttributeId { get; set; }

        // Giá trị cụ thể (vd: "Đen", "XL", "128GB")
        public string Value { get; set; } = string.Empty;

        // Quan hệ với ProductAttribute
        public ProductAttribute? ProductAttribute { get; set; }
    }
}