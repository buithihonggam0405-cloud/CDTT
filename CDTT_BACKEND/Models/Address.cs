namespace CDTT_BACKEND.Models
{
    public class Address
    {
        public int Id { get; set; }

        // Khóa ngoại đến User
        public int UserId { get; set; }

        // Người nhận
        public string name { get; set; } = string.Empty;

        // Số điện thoại nhận hàng
        public string phone { get; set; } = string.Empty;

        // Địa chỉ chi tiết (số nhà, tên đường...)
        public string address { get; set; } = string.Empty;

        // Xã / Phường
        public string ward { get; set; } = string.Empty;

        // Quận / Huyện
        public string district { get; set; } = string.Empty;

        // Tỉnh / Thành phố
        public string province { get; set; } = string.Empty;

        // Địa chỉ mặc định
        public bool active { get; set; } = false;

        // Quan hệ với User
        public User? User { get; set; }
    }
}