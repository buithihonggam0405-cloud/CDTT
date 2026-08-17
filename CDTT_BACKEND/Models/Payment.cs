using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDTT_BACKEND.Models
{
    public class Payment
    {
        // Giữ nguyên Id theo chuẩn C#
        public int Id { get; set; }

        [Column("order_id")]
        public int order_id { get; set; }

        public decimal amount { get; set; }

        [Column("payment_method")]
        public string PaymentMethod { get; set; } = "COD";

        [Column("payment_status")]
        public string PaymentStatus { get; set; } = "Pending";

        [Column("transaction_code")]
        public string? TransactionCode { get; set; }

        [Column("payment_date")]
        public DateTime? PaymentDate { get; set; }

        // Quan hệ Navigation với Order
        [ForeignKey("order_id")]
        public Order? Order { get; set; }
    }
}