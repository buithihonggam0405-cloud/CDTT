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
    public class ProductVariantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductVariantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductVariants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductVariant>>> GetProductVariant()
        {
            return await _context.ProductVariant.ToListAsync();
        }

        // GET: api/ProductVariants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductVariant>> GetProductVariant(int id)
        {
            var productVariant = await _context.ProductVariant.FindAsync(id);

            if (productVariant == null)
            {
                return NotFound();
            }

            return productVariant;
        }

        // PUT: api/ProductVariants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // PUT: api/ProductVariants/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductVariant(int id, ProductVariant productVariant)
        {
            if (id != productVariant.Id)
            {
                return BadRequest(new { message = "ID không khớp." });
            }

            var dbVariant = await _context.ProductVariant
                .Include(v => v.AttributeValues)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (dbVariant == null)
            {
                return NotFound();
            }

            dbVariant.Sku = productVariant.Sku;
            dbVariant.Price = productVariant.Price;
            dbVariant.Quantity = productVariant.Quantity;
            dbVariant.image_url = productVariant.image_url;

            // Clear old relationships and add updated ones
            dbVariant.AttributeValues.Clear();
            if (productVariant.AttributeValues != null && productVariant.AttributeValues.Any())
            {
                var valueIds = productVariant.AttributeValues.Select(v => v.Id).ToList();
                var dbValues = await _context.ProductAttributeValue
                    .Where(v => valueIds.Contains(v.Id))
                    .ToListAsync();
                foreach (var val in dbValues)
                {
                    dbVariant.AttributeValues.Add(val);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductVariantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductVariants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductVariant>> PostProductVariant(ProductVariant productVariant)
        {
            if (productVariant.AttributeValues != null && productVariant.AttributeValues.Any())
            {
                var valueIds = productVariant.AttributeValues.Select(v => v.Id).ToList();
                var dbValues = await _context.ProductAttributeValue
                    .Where(v => valueIds.Contains(v.Id))
                    .ToListAsync();
                productVariant.AttributeValues = dbValues;
            }

            _context.ProductVariant.Add(productVariant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductVariant", new { id = productVariant.Id }, productVariant);
        }

        // DELETE: api/ProductVariants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductVariant(int id)
        {
            var productVariant = await _context.ProductVariant.FindAsync(id);
            if (productVariant == null)
            {
                return NotFound();
            }

            _context.ProductVariant.Remove(productVariant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductVariantExists(int id)
        {
            return _context.ProductVariant.Any(e => e.Id == id);
        }
    }
}
