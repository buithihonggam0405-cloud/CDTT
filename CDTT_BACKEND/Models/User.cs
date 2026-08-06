namespace CDTT_BACKEND.Models
{
    public class User
    {
        public int Id { get; set; }

        public string username { get; set; } = string.Empty;

        public string password { get; set; } = string.Empty;

        public string name { get; set; } = string.Empty;
        
        public string email { get; set; } = string.Empty;

        public string phone { get; set; } = string.Empty;

        public string Role { get; set; } = "Customer";

        public string Status { get; set; } = "Active";

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Cart? Cart { get; set; }

        public ICollection<Order> Orders { get; set; } = new List<Order>();

        public ICollection<Review> Reviews { get; set; } = new List<Review>();

        // Một User có nhiều địa chỉ
        public ICollection<Address> Addresses { get; set; }
            = new List<Address>();
    }
}