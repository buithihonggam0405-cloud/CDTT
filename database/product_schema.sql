-- Schema cho bảng sản phẩm, biến thể, thuộc tính và hình ảnh
-- Dùng cho MySQL/MariaDB

CREATE TABLE IF NOT EXISTS product (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT NULL,
    Price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    thumbnail VARCHAR(500) NULL,
    Quantity INT NOT NULL DEFAULT 0,
    Status VARCHAR(20) NOT NULL DEFAULT 'active',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS productvariants (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    Sku VARCHAR(100) NOT NULL UNIQUE,
    Price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    Quantity INT NOT NULL DEFAULT 0,
    ImageUrl VARCHAR(500) NULL,
    CONSTRAINT fk_productvariants_product
        FOREIGN KEY (product_id) REFERENCES product(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS productattributes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProductId INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    CONSTRAINT fk_productattributes_product
        FOREIGN KEY (ProductId) REFERENCES product(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS productattributesvalues (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    AttributeId INT NOT NULL,
    Value VARCHAR(255) NOT NULL,
    CONSTRAINT fk_productattributesvalues_attribute
        FOREIGN KEY (AttributeId) REFERENCES productattributes(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS productimages (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    Image_url VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_productimages_product
        FOREIGN KEY (product_id) REFERENCES product(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cart (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    Description TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cartitem (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CartId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_cartitem_cart
        FOREIGN KEY (CartId) REFERENCES cart(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_cartitem_product
        FOREIGN KEY (ProductId) REFERENCES product(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS orders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    ShippingAddress TEXT NULL,
    PhoneNumber VARCHAR(20) NULL,
    Status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS orderdetails (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    ProductVariantId INT NULL,
    Quantity INT NOT NULL DEFAULT 1,
    UnitPrice DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_orderdetails_order
        FOREIGN KEY (order_id) REFERENCES orders(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_orderdetails_product
        FOREIGN KEY (product_id) REFERENCES product(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_orderdetails_variant
        FOREIGN KEY (ProductVariantId) REFERENCES productvariants(Id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS payment (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    PaymentMethod VARCHAR(50) NOT NULL,
    PaymentStatus VARCHAR(50) NOT NULL DEFAULT 'Pending',
    TransactionCode VARCHAR(100) NULL,
    PaymentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payment_order
        FOREIGN KEY (order_id) REFERENCES orders(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS review (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    product_id INT NOT NULL,
    Rating INT NOT NULL,
    Comment TEXT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_product
        FOREIGN KEY (product_id) REFERENCES product(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_product_category_id ON product(category_id);
CREATE INDEX idx_productvariants_product_id ON productvariants(product_id);
CREATE INDEX idx_productattributes_product_id ON productattributes(ProductId);
CREATE INDEX idx_productattributesvalues_attribute_id ON productattributesvalues(AttributeId);
CREATE INDEX idx_productimages_product_id ON productimages(product_id);
CREATE INDEX idx_cart_user_id ON cart(UserId);
CREATE INDEX idx_cartitem_cart_id ON cartitem(CartId);
CREATE INDEX idx_cartitem_product_id ON cartitem(ProductId);
CREATE INDEX idx_orders_user_id ON orders(UserId);
CREATE INDEX idx_orderdetails_order_id ON orderdetails(order_id);
CREATE INDEX idx_orderdetails_product_id ON orderdetails(product_id);
CREATE INDEX idx_payment_order_id ON payment(order_id);
CREATE INDEX idx_review_product_id ON review(product_id);
CREATE INDEX idx_review_user_id ON review(UserId);
