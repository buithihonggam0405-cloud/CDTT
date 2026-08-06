//Thuộc tính sản phẩm màu sắc-kích cỡ
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CDTT_BACKEND.Models
{
	public class ProductAttribute
	{
		public int Id { get; set; }

		public int product_id { get; set; }

		// Tên thuộc tính (vd: "Màu sắc", "Size", "Dung lượng")
		public string Name { get; set; } = string.Empty;

		// Quan hệ với Product gốc
		[ForeignKey("product_id")]
		[JsonIgnore]
		public Product? Product { get; set; }

		// Danh sách các giá trị thuộc tính (vd: Màu sắc -> Đen, Trắng, Đỏ)
		public ICollection<ProductAttributeValue> AttributeValues { get; set; }
			= new List<ProductAttributeValue>();
	}
}