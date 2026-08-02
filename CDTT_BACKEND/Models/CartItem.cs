namespace CDTT_BACKEND.Models
{
    public class CartItem
    {
        public int Id { get; set; }

        public int CartId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        // Quan hệ với Cart
        public Cart? Cart { get; set; }

        // Quan hệ với Product
        public Product? Product { get; set; }
    }
}
