//biến thể sản phẩm- kho và giá
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CDTT_BACKEND.Models
{
	public class ProductVariant
	{
		public int Id { get; set; }

		public int product_id { get; set; }

		// Mã SKU quản lý kho riêng cho từng biến thể (vd: "IP15-128GB-RED")
		public string Sku { get; set; } = string.Empty;

		// Giá riêng của biến thể
		public decimal Price { get; set; }

		// Số lượng tồn kho riêng của biến thể
		public int Quantity { get; set; }

		// Ảnh riêng của biến thể (Ví dụ chọn màu Đỏ thì hiện ảnh phiên bản Đỏ)
		public string image_url { get; set; } = string.Empty;

		// Quan hệ với Product gốc
		[ForeignKey("product_id")]
		[JsonIgnore]
		public Product? Product { get; set; }

		// Quan hệ Nhiều - Nhiều với ProductAttributeValue
		public ICollection<ProductAttributeValue> AttributeValues { get; set; } = new List<ProductAttributeValue>();
	}
}