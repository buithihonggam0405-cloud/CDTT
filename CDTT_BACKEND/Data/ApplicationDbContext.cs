using Microsoft.EntityFrameworkCore;
using CDTT_BACKEND.Models;

namespace TCDTT_BACKEND.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(
			DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}

		public DbSet<User> Users { get; set; }

		public DbSet<Category> Categories { get; set; }

		public DbSet<Product> Products { get; set; }

		public DbSet<Cart> Carts { get; set; }

		public DbSet<CartItem> CartItems { get; set; }

		public DbSet<Order> Orders { get; set; }

		public DbSet<OrderDetail> OrderDetails { get; set; }

		public DbSet<Payment> Payments { get; set; }

		public DbSet<Review> Reviews { get; set; }

		public DbSet<Contact> Contacts { get; set; }

		protected override void OnModelCreating(
			ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// User - Cart: 1 - 1
			modelBuilder.Entity<Cart>()
				.HasOne(c => c.User)
				.WithOne(u => u.Cart)
				.HasForeignKey<Cart>(c => c.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			// Category - Product: 1 - N
			modelBuilder.Entity<Product>()
				.HasOne(p => p.Category)
				.WithMany(c => c.Products)
				.HasForeignKey(p => p.category_id)
				.OnDelete(DeleteBehavior.Restrict);

			// Cart - CartItem: 1 - N
			modelBuilder.Entity<CartItem>()
				.HasOne(ci => ci.Cart)
				.WithMany(c => c.CartItems)
				.HasForeignKey(ci => ci.CartId)
				.OnDelete(DeleteBehavior.Cascade);

			// Product - CartItem: 1 - N
			modelBuilder.Entity<CartItem>()
				.HasOne(ci => ci.Product)
				.WithMany(p => p.CartItems)
				.HasForeignKey(ci => ci.ProductId)
				.OnDelete(DeleteBehavior.Restrict);

			// ProductVariant - CartItem: 1 - N
			modelBuilder.Entity<CartItem>()
				.HasOne(ci => ci.ProductVariant)
				.WithMany()
				.HasForeignKey(ci => ci.ProductVariantId)
				.OnDelete(DeleteBehavior.Restrict);

			// User - Order: 1 - N
			modelBuilder.Entity<Order>()
				.HasOne(o => o.User)
				.WithMany(u => u.Orders)
				.HasForeignKey(o => o.UserId)
				.OnDelete(DeleteBehavior.Restrict);

			// Order - OrderDetail: 1 - N
			modelBuilder.Entity<OrderDetail>()
				.HasOne(od => od.Order)
				.WithMany(o => o.OrderDetails)
				.HasForeignKey(od => od.order_id)
				.OnDelete(DeleteBehavior.Cascade);

			// Product - OrderDetail: 1 - N
			modelBuilder.Entity<OrderDetail>()
				.HasOne(od => od.Product)
				.WithMany(p => p.OrderDetails)
				.HasForeignKey(od => od.product_id)
				.OnDelete(DeleteBehavior.Restrict);

			// Order - Payment: 1 - 1
			modelBuilder.Entity<Payment>()
				.HasOne(p => p.Order)
				.WithOne(o => o.Payment)
				.HasForeignKey<Payment>(p => p.order_id)
				.OnDelete(DeleteBehavior.Cascade);

			// User - Review: 1 - N
			modelBuilder.Entity<Review>()
				.HasOne(r => r.User)
				.WithMany(u => u.Reviews)
				.HasForeignKey(r => r.UserId)
				.OnDelete(DeleteBehavior.Restrict);

			// Product - Review: 1 - N
			modelBuilder.Entity<Review>()
				.HasOne(r => r.Product)
				.WithMany(p => p.Reviews)
				.HasForeignKey(r => r.product_id)
				.OnDelete(DeleteBehavior.Cascade);

			// Decimal precision
			modelBuilder.Entity<Product>()
				.Property(p => p.Price)
				.HasPrecision(18, 2);

			modelBuilder.Entity<Order>()
				.Property(o => o.TotalAmount)
				.HasPrecision(18, 2);

			modelBuilder.Entity<OrderDetail>()
				.Property(od => od.UnitPrice)
				.HasPrecision(18, 2);


			modelBuilder.Entity<Payment>()
				.Property(p => p.amount)
				.HasPrecision(18, 2);

			modelBuilder.Entity<ProductVariant>()
				.Property(pv => pv.Price)
				.HasPrecision(18, 2);

			// Product - ProductVariant: 1 - N
			modelBuilder.Entity<ProductVariant>()
				.Property(pv => pv.product_id)
				.HasColumnName("ProductId");

			modelBuilder.Entity<ProductVariant>()
				.HasOne(pv => pv.Product)
				.WithMany(p => p.Variants)
				.HasForeignKey(pv => pv.product_id)
				.OnDelete(DeleteBehavior.Cascade);

			// Product - ProductAttribute: 1 - N
			modelBuilder.Entity<ProductAttribute>()
				.HasOne(pa => pa.Product)
				.WithMany(p => p.Attributes)
				.HasForeignKey(pa => pa.product_id)
				.OnDelete(DeleteBehavior.Cascade);

			// ProductVariant - ProductAttributeValue: Many-to-Many
			modelBuilder.Entity<ProductVariant>()
				.HasMany(pv => pv.AttributeValues)
				.WithMany(av => av.ProductVariants)
				.UsingEntity<Dictionary<string, object>>(
					"ProductVariantAttributeValue",
					j => j.HasOne<ProductAttributeValue>().WithMany().HasForeignKey("AttributeValueId").OnDelete(DeleteBehavior.Cascade),
					j => j.HasOne<ProductVariant>().WithMany().HasForeignKey("ProductVariantId").OnDelete(DeleteBehavior.Restrict)
				);
		}
	    public DbSet<CDTT_BACKEND.Models.Address> Address { get; set; } = default!;
	    public DbSet<CDTT_BACKEND.Models.ProductAttribute> ProductAttribute { get; set; } = default!;
	    public DbSet<CDTT_BACKEND.Models.ProductAttributeValue> ProductAttributeValue { get; set; } = default!;
	    public DbSet<CDTT_BACKEND.Models.ProductImage> ProductImage { get; set; } = default!;
	    public DbSet<CDTT_BACKEND.Models.ProductVariant> ProductVariant { get; set; } = default!;
	}
}