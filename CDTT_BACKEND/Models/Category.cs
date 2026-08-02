using System;
using System.Collections.Generic;

namespace CDTT_BACKEND.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        // Slug chuẩn SEO cho URL (vd: /danh-muc/dien-thoai)
        public string Slug { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        // ParentId null nghĩa là Danh mục cấp cao nhất (Root Category)
        public int? ParentId { get; set; }

        // Thứ tự sắp xếp hiển thị
        public int SortOrder { get; set; } = 0;

        // Trạng thái: Active (Hoạt động), Inactive (Ẩn)
        public string Status { get; set; } = "Active";

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Mối quan hệ danh mục CHA - CON (Self-referencing relationship)
        public Category? ParentCategory { get; set; }
        public ICollection<Category> SubCategories { get; set; } = new List<Category>();

        // Mối quan hệ với Product
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}