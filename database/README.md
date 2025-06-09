# 📁 filepath: d:\Thang\nextjs-with-supabase-latest\database\README.md
# 🗄️ Database Setup Guide

## 📋 Hướng dẫn cài đặt Database Schema

### 🚀 Cách 1: Chạy trong Supabase Dashboard
1. Truy cập https://supabase.com/dashboard
2. Chọn project của bạn
3. Vào **SQL Editor**
4. Copy toàn bộ nội dung file `setup.sql`
5. Paste và click **Run**

### 🛠️ Cách 2: Sử dụng Supabase CLI (Nâng cao)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Run migration
supabase db reset --db-url "your-database-url"
```

## 📊 Database Schema Overview

### Bảng chính:
- **categories** - Danh mục sản phẩm
- **products** - Sản phẩm  
- **customers** - Khách hàng
- **orders** - Đơn hàng
- **order_items** - Chi tiết đơn hàng
- **transactions** - Giao dịch thu chi

### Quan hệ:
```
categories → products (one-to-many)
customers → orders (one-to-many)  
orders → order_items (one-to-many)
products → order_items (one-to-many)
orders → transactions (one-to-one, optional)
```

## ✅ Verification (Kiểm tra sau khi setup)

Chạy query này để kiểm tra:
```sql
SELECT 
  'categories' as table_name, COUNT(*) as record_count FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products  
UNION ALL
SELECT 'customers', COUNT(*) FROM customers;
```

Kết quả mong đợi:
- categories: 5 records
- products: 6 records  
- customers: 4 records

## 🔐 Security (RLS)

Tất cả bảng có Row Level Security enabled với policy:
- Chỉ authenticated users mới truy cập được
- Full access (SELECT, INSERT, UPDATE, DELETE)

## 📈 Performance

Đã tạo indexes cho:
- Primary keys (auto)
- Foreign keys  
- Frequently queried columns
- Search fields

## 🚨 Troubleshooting

### Lỗi thường gặp:
1. **Permission denied**: Kiểm tra RLS policies
2. **Foreign key constraint**: Kiểm tra thứ tự insert data
3. **Unique constraint**: Kiểm tra duplicate values

### Reset database:
```sql
-- Chạy phần DROP TABLES ở đầu file setup.sql
```