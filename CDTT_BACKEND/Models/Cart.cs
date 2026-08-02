namespace CDTT_BACKEND.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Quan hệ với User
        public User? User { get; set; }

        // Một giỏ hàng có nhiều sản phẩm
        public ICollection<CartItem> CartItems { get; set; }
            = new List<CartItem>();
    }
}
