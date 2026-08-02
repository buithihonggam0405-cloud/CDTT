namespace CDTT_BACKEND.Models
{
    public class Review
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int product_id { get; set; }

        public int Rating { get; set; }

        public string Comment { get; set; } = string.Empty;

        public string Status { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Quan hệ với User
        public User? User { get; set; }

        // Quan hệ với Product
        public Product? Product { get; set; }
    }
}
