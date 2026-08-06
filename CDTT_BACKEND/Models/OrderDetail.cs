namespace CDTT_BACKEND.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }

        public int order_id { get; set; }

        public int product_id { get; set; }

        // Mới thêm: Lưu vết biến thể cụ thể người dùng chọn mua (Size, Màu sắc...)
        public int? ProductVariantId { get; set; }

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }

        // SubTotal tự động tính toán, không tạo cột lưu cứng ở CSDL
        public decimal SubTotal => Quantity * UnitPrice;

        // Quan hệ với Order
        [System.Text.Json.Serialization.JsonIgnore]
        public Order? Order { get; set; }

        // Quan hệ với Product
        public Product? Product { get; set; }

        // Quan hệ với ProductVariant
        public ProductVariant? ProductVariant { get; set; }
    }
}