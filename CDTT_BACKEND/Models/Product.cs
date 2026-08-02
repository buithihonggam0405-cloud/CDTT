using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDTT_BACKEND.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Column("category_id")]
        public int category_id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        // Ảnh đại diện chính
        public string thumbnail { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string Status { get; set; } = "Available";

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Quan hệ với Category
        [ForeignKey("category_id")]
        public Category? Category { get; set; }

        // Quan hệ với Album ảnh phụ, Thuộc tính, Biến thể
        public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
        public ICollection<ProductAttribute> Attributes { get; set; } = new List<ProductAttribute>();
        public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();

        // Quan hệ với CartItem, OrderDetail, Review
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}