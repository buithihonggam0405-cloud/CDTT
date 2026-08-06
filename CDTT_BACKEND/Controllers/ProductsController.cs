using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CDTT_BACKEND.Models;
using TCDTT_BACKEND.Data;

namespace CDTT_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Images)
                .Include(p => p.Attributes)
                    .ThenInclude(a => a.AttributeValues)
                .Include(p => p.Variants)
                    .ThenInclude(v => v.AttributeValues)
                .AsSplitQuery()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest(new { message = "ID sản phẩm không trùng khớp." });
            }

            // Bỏ qua validation các quan hệ phụ khi cập nhật
            ModelState.Remove("Category");
            ModelState.Remove("Images");
            ModelState.Remove("Attributes");
            ModelState.Remove("Variants");
            ModelState.Remove("CartItems");
            ModelState.Remove("OrderDetails");
            ModelState.Remove("Reviews");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            product.Category = null; // Tránh EF cố tình chèn/sửa Category
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi cập nhật SQL", error = ex.InnerException?.Message ?? ex.Message });
            }

            return NoContent();
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] Product product)
        {
            // 1. Loại bỏ các Navigation Property khỏi Model Validation để tránh bị ăn lỗi 400
            ModelState.Remove("Category");
            ModelState.Remove("Images");
            ModelState.Remove("Attributes");
            ModelState.Remove("Variants");
            ModelState.Remove("CartItems");
            ModelState.Remove("OrderDetails");
            ModelState.Remove("Reviews");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // 2. Kiểm tra danh mục truyền lên có thực sự tồn tại trong Database không
                var categoryExists = await _context.Categories.AnyAsync(c => c.Id == product.category_id);
                if (!categoryExists)
                {
                    return BadRequest(new { message = $"Mã danh mục {product.category_id} không tồn tại trong CSDL!" });
                }

                // 3. Đảm bảo đối tượng quan hệ = null để Entity Framework chỉ Insert dữ liệu vào bảng Products
                product.Category = null;

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
            }
            catch (DbUpdateException ex)
            {
                // In ra lỗi cụ thể từ SQL Server nếu chèn thất bại
                var innerMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                Console.WriteLine($"[SQL ERROR]: {innerMessage}");
                return StatusCode(500, new { message = "Lỗi CSDL khi chèn sản phẩm!", detail = innerMessage });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[SYSTEM ERROR]: {ex.Message}");
                return StatusCode(500, new { message = "Lỗi Server!", detail = ex.Message });
            }
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}