-- =================================================
-- 🛍️ SALES MANAGEMENT DATABASE SCHEMA
-- Tạo ngày: 9/6/2025
-- Mục đích: Setup database cho web app quản lý bán hàng
-- =================================================

-- =================================================
-- DROP EXISTING TABLES (IF EXISTS) - Để reset clean
-- =================================================
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- =================================================
-- CREATE TABLES
-- =================================================

-- 1. CATEGORIES TABLE (Bảng danh mục sản phẩm) - Tạo trước vì products sẽ reference
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. PRODUCTS TABLE (Bảng sản phẩm)
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  cost_price DECIMAL(10,2) CHECK (cost_price >= 0),
  sku VARCHAR(100) UNIQUE,
  category VARCHAR(100),
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  min_stock_level INTEGER DEFAULT 0 CHECK (min_stock_level >= 0),
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. CUSTOMERS TABLE (Bảng khách hàng)
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  tax_code VARCHAR(50),
  customer_type VARCHAR(20) DEFAULT 'retail' CHECK (customer_type IN ('retail', 'wholesale')),
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. ORDERS TABLE (Bảng đơn hàng)  
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  order_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
  tax_rate DECIMAL(5,2) DEFAULT 10.00 CHECK (tax_rate >= 0 AND tax_rate <= 100),
  tax_amount DECIMAL(10,2) DEFAULT 0 CHECK (tax_amount >= 0),
  discount_amount DECIMAL(10,2) DEFAULT 0 CHECK (discount_amount >= 0),
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. ORDER_ITEMS TABLE (Bảng chi tiết đơn hàng)
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. TRANSACTIONS TABLE (Bảng giao dịch thu chi)
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  description TEXT,
  transaction_date DATE NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =================================================

-- Products indexes
CREATE INDEX idx_products_sku ON products(sku) WHERE sku IS NOT NULL;
CREATE INDEX idx_products_category ON products(category) WHERE category IS NOT NULL;
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_name ON products(name);

-- Customers indexes  
CREATE INDEX idx_customers_email ON customers(email) WHERE email IS NOT NULL;
CREATE INDEX idx_customers_phone ON customers(phone) WHERE phone IS NOT NULL;
CREATE INDEX idx_customers_type ON customers(customer_type);
CREATE INDEX idx_customers_active ON customers(is_active);

-- Orders indexes
CREATE INDEX idx_orders_customer ON orders(customer_id) WHERE customer_id IS NOT NULL;
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);

-- Order items indexes
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Transactions indexes
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_transactions_order ON transactions(order_id) WHERE order_id IS NOT NULL;

-- =================================================
-- ENABLE ROW LEVEL SECURITY
-- =================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- =================================================
-- CREATE RLS POLICIES
-- =================================================

-- Products policies
CREATE POLICY "Allow authenticated users full access to products" ON products 
  FOR ALL TO authenticated USING (true);

-- Customers policies  
CREATE POLICY "Allow authenticated users full access to customers" ON customers 
  FOR ALL TO authenticated USING (true);

-- Orders policies
CREATE POLICY "Allow authenticated users full access to orders" ON orders 
  FOR ALL TO authenticated USING (true);

-- Order items policies
CREATE POLICY "Allow authenticated users full access to order_items" ON order_items 
  FOR ALL TO authenticated USING (true);

-- Transactions policies
CREATE POLICY "Allow authenticated users full access to transactions" ON transactions 
  FOR ALL TO authenticated USING (true);

-- Categories policies
CREATE POLICY "Allow authenticated users full access to categories" ON categories 
  FOR ALL TO authenticated USING (true);

-- =================================================
-- CREATE TRIGGERS FOR UPDATED_AT
-- =================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for tables with updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =================================================
-- INSERT SAMPLE DATA
-- =================================================

-- Insert sample categories
INSERT INTO categories (name, description) VALUES 
('Điện tử', 'Sản phẩm điện tử, thiết bị công nghệ'),
('Thời trang', 'Quần áo, giày dép, phụ kiện'),
('Gia dụng', 'Đồ gia dụng, nội thất'),
('Thực phẩm', 'Thực phẩm, đồ uống'),
('Sách & Văn phòng phẩm', 'Sách, vở, dụng cụ văn phòng');

-- Insert sample products
INSERT INTO products (name, description, price, cost_price, sku, category, stock_quantity, min_stock_level) VALUES 
('iPhone 15 Pro', 'Điện thoại thông minh cao cấp Apple', 25000000, 22000000, 'IP15PRO001', 'Điện tử', 10, 2),
('Samsung Galaxy S24', 'Điện thoại Android flagship', 20000000, 18000000, 'SS24001', 'Điện tử', 15, 3),
('Áo sơ mi nam', 'Áo sơ mi công sở chất lượng cao', 299000, 180000, 'ASM001', 'Thời trang', 50, 10),
('Quần jean nữ', 'Quần jean skinny fit', 450000, 280000, 'QJN001', 'Thời trang', 30, 5),
('Nồi cơm điện', 'Nồi cơm điện 1.8L cho gia đình', 1200000, 900000, 'NCD001', 'Gia dụng', 25, 5),
('Máy xay sinh tố', 'Máy xay đa năng 500W', 800000, 600000, 'MXST001', 'Gia dụng', 20, 3);

-- Insert sample customers
INSERT INTO customers (name, email, phone, address, customer_type, notes) VALUES 
('Nguyễn Văn A', 'nguyenvana@email.com', '0123456789', '123 Đường ABC, Quận 1, TP.HCM', 'retail', 'Khách hàng thân thiết'),
('Trần Thị B', 'tranthib@email.com', '0987654321', '456 Đường DEF, Quận 2, TP.HCM', 'retail', NULL),
('Công ty TNHH XYZ', 'contact@xyz.com', '0111222333', '789 Đường GHI, Quận 3, TP.HCM', 'wholesale', 'Khách hàng doanh nghiệp'),
('Cửa hàng ABC', 'shop@abc.com', '0444555666', '321 Đường JKL, Quận 4, TP.HCM', 'wholesale', 'Đại lý phân phối');

-- =================================================
-- VERIFICATION QUERIES
-- =================================================

-- Check if all tables were created successfully
SELECT 
  schemaname,
  tablename,
  hasindexes,
  hasrules,
  hastriggers
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('products', 'customers', 'orders', 'order_items', 'transactions', 'categories')
ORDER BY tablename;

-- Count records in each table
SELECT 
  'categories' as table_name, COUNT(*) as record_count FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products  
UNION ALL
SELECT 'customers', COUNT(*) FROM customers
UNION ALL  
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions;

-- SUCCESS MESSAGE
SELECT '🎉 Database schema setup completed successfully!' as status,
       'Tables: 6 created' as tables,
       'Sample data: inserted' as data,
       'RLS: enabled' as security,
       'Indexes: created' as performance;