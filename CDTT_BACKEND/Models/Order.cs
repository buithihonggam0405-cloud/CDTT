namespace CDTT_BACKEND.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public decimal TotalAmount { get; set; }

        public string ShippingAddress { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string Status { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // User đặt hàng
        public User? User { get; set; }

        // Chi tiết đơn hàng
        public ICollection<OrderDetail> OrderDetails { get; set; }
            = new List<OrderDetail>();

        // Thanh toán
        public Payment? Payment { get; set; }
    }
}
