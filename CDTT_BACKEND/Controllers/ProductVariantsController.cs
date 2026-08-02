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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductVariant(int id, ProductVariant productVariant)
        {
            if (id != productVariant.Id)
            {
                return BadRequest();
            }

            _context.Entry(productVariant).State = EntityState.Modified;

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
