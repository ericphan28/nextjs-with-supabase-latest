# 🛍️ KẾ HOẠCH PHÁT TRIỂN WEB APP QUẢN LÝ BÁN HÀNG

## 📋 TỔNG QUAN DỰ ÁN
- **Mục tiêu**: Xây dựng hệ thống quản lý bán hàng hoàn chỉnh
- **Công nghệ**: Next.js 15 + Supabase + TypeScript + Tailwind CSS
- **Timeline**: 6-8 tuần
- **Theme System**: ✅ Đã hoàn thành (Light/Dark/System mode)

---

## 🚀 GIAI ĐOẠN 1: HỆ THỐNG BÁN HÀNG CƠ BẢN (Tuần 1-2)

### 📦 1.1 QUẢN LÝ SẢN PHẨM
**Files cần tạo:**
- `app/products/page.tsx` - Danh sách sản phẩm
- `app/products/create/page.tsx` - Thêm sản phẩm mới
- `app/products/[id]/edit/page.tsx` - Sửa sản phẩm
- `components/products/product-form.tsx` - Form sản phẩm
- `components/products/product-table.tsx` - Bảng sản phẩm
- `components/products/product-card.tsx` - Card sản phẩm

**Chức năng:**
- ✅ Thêm/Sửa/Xóa sản phẩm
- ✅ Upload hình ảnh sản phẩm
- ✅ Quản lý danh mục
- ✅ Quản lý tồn kho
- ✅ Mã SKU tự động
- ✅ Giá bán/giá vốn

### 👥 1.2 QUẢN LÝ KHÁCH HÀNG
**Files cần tạo:**
- `app/customers/page.tsx` - Danh sách khách hàng
- `app/customers/create/page.tsx` - Thêm khách hàng
- `app/customers/[id]/page.tsx` - Chi tiết khách hàng
- `components/customers/customer-form.tsx` - Form khách hàng
- `components/customers/customer-table.tsx` - Bảng khách hàng

**Chức năng:**
- ✅ Thêm/Sửa/Xóa khách hàng
- ✅ Thông tin liên hệ
- ✅ Địa chỉ giao hàng
- ✅ Mã số thuế
- ✅ Phân loại khách hàng (lẻ/sỉ)

### 📋 1.3 QUẢN LÝ ĐỢN HÀNG
**Files cần tạo:**
- `app/orders/page.tsx` - Danh sách đơn hàng
- `app/orders/create/page.tsx` - Tạo đơn hàng mới
- `app/orders/[id]/page.tsx` - Chi tiết đơn hàng
- `components/orders/order-form.tsx` - Form đơn hàng
- `components/orders/order-table.tsx` - Bảng đơn hàng
- `components/orders/order-items.tsx` - Items trong đơn

**Chức năng:**
- ✅ Tạo đơn hàng mới
- ✅ Thêm sản phẩm vào đơn
- ✅ Tính toán thuế VAT
- ✅ Áp dụng giảm giá
- ✅ Trạng thái đơn hàng
- ✅ In hóa đơn

### 📊 1.4 DASHBOARD TỔNG QUAN
**Files cần tạo:**
- `app/dashboard/page.tsx` - Dashboard chính
- `components/dashboard/stats-cards.tsx` - Thẻ thống kê
- `components/dashboard/sales-chart.tsx` - Biểu đồ doanh thu
- `components/dashboard/recent-orders.tsx` - Đơn hàng gần đây
- `components/dashboard/low-stock-alerts.tsx` - Cảnh báo hết hàng

**Chức năng:**
- ✅ Tổng doanh thu theo ngày/tháng/năm
- ✅ Số lượng đơn hàng
- ✅ Số khách hàng mới
- ✅ Sản phẩm bán chạy
- ✅ Cảnh báo tồn kho thấp

---

## 💰 GIAI ĐOẠN 2: QUẢN LÝ TÀI CHÍNH (Tuần 3-4)

### 📈 2.1 QUẢN LÝ THU CHI
**Files cần tạo:**
- `app/finance/page.tsx` - Tổng quan tài chính
- `app/finance/income/page.tsx` - Quản lý thu nhập
- `app/finance/expenses/page.tsx` - Quản lý chi phí
- `components/finance/transaction-form.tsx` - Form giao dịch
- `components/finance/transaction-table.tsx` - Bảng giao dịch
- `components/finance/category-manager.tsx` - Quản lý danh mục

**Chức năng:**
- ✅ Ghi nhận thu nhập từ bán hàng
- ✅ Ghi nhận các khoản chi phí
- ✅ Phân loại thu chi theo danh mục
- ✅ Upload chứng từ/hóa đơn
- ✅ Tìm kiếm và lọc giao dịch

### 📊 2.2 BÁO CÁO TÀI CHÍNH
**Files cần tạo:**
- `app/reports/page.tsx` - Trang báo cáo chính
- `app/reports/profit-loss/page.tsx` - Báo cáo lãi lỗ
- `app/reports/cash-flow/page.tsx` - Báo cáo lưu chuyển tiền tệ
- `components/reports/profit-loss-chart.tsx` - Biểu đồ lãi lỗ
- `components/reports/cash-flow-chart.tsx` - Biểu đồ cash flow
- `components/reports/export-buttons.tsx` - Nút xuất báo cáo

**Chức năng:**
- ✅ Báo cáo lãi lỗ theo tháng/quý/năm
- ✅ Biểu đồ doanh thu và chi phí
- ✅ Phân tích xu hướng kinh doanh
- ✅ Xuất báo cáo PDF/Excel
- ✅ So sánh với kỳ trước

### 💳 2.3 QUẢN LÝ THANH TOÁN
**Files cần tạo:**
- `app/payments/page.tsx` - Quản lý thanh toán
- `components/payments/payment-methods.tsx` - Phương thức thanh toán
- `components/payments/payment-history.tsx` - Lịch sử thanh toán

**Chức năng:**
- ✅ Ghi nhận thanh toán khách hàng
- ✅ Quản lý công nợ
- ✅ Nhắc nhở thanh toán
- ✅ Phương thức thanh toán đa dạng

---

## 📋 GIAI ĐOẠN 3: QUẢN LÝ THUẾ & BÁO CÁO (Tuần 5-6)

### 🧾 3.1 TÍNH TOÁN THUẾ VAT
**Files cần tạo:**
- `app/tax/page.tsx` - Quản lý thuế
- `app/tax/vat-calculation/page.tsx` - Tính thuế VAT
- `app/tax/settings/page.tsx` - Cài đặt thuế
- `components/tax/vat-calculator.tsx` - Máy tính VAT
- `components/tax/tax-summary.tsx` - Tổng hợp thuế

**Chức năng:**
- ✅ Tính thuế VAT tự động
- ✅ Quản lý thuế suất theo sản phẩm
- ✅ Báo cáo thuế theo tháng/quý
- ✅ Tổng hợp thuế đầu vào/đầu ra
- ✅ Cài đặt thuế suất linh hoạt

### 📋 3.2 BÁO CÁO THUẾ CHÍNH PHỦ
**Files cần tạo:**
- `app/tax/reports/page.tsx` - Báo cáo thuế
- `app/tax/forms/page.tsx` - Tờ khai thuế
- `components/tax/government-forms.tsx` - Form chính phủ
- `components/tax/tax-export.tsx` - Xuất báo cáo thuế

**Chức năng:**
- ✅ Tờ khai thuế VAT
- ✅ Báo cáo thuế TNDN
- ✅ Xuất file XML cho cơ quan thuế
- ✅ Lưu trữ tờ khai đã nộp
- ✅ Lịch nhắc nộp thuế

### 📊 3.3 PHÂN TÍCH KINH DOANH
**Files cần tạo:**
- `app/analytics/page.tsx` - Phân tích kinh doanh
- `components/analytics/business-insights.tsx` - Thông tin kinh doanh
- `components/analytics/trend-analysis.tsx` - Phân tích xu hướng

**Chức năng:**
- ✅ Phân tích sản phẩm bán chạy
- ✅ Xu hướng doanh thu theo mùa
- ✅ Hiệu quả kinh doanh theo danh mục
- ✅ Dự báo doanh thu
- ✅ So sánh hiệu suất

---

## 🚀 GIAI ĐOẠN 4: TÍNH NĂNG NÂNG CAO (Tuần 7+)

### 🏪 4.1 HỖ TRỢ NHIỀU CỬA HÀNG
**Files cần tạo:**
- `app/stores/page.tsx` - Quản lý cửa hàng
- `components/stores/store-selector.tsx` - Chọn cửa hàng
- `components/stores/store-comparison.tsx` - So sánh cửa hàng

### 👨‍💼 4.2 QUẢN LÝ NHÂN VIÊN
**Files cần tạo:**
- `app/staff/page.tsx` - Quản lý nhân viên
- `components/staff/role-permissions.tsx` - Phân quyền
- `components/staff/activity-log.tsx` - Nhật ký hoạt động

### 📱 4.3 TÍNH NĂNG MOBILE
**Files cần tạo:**
- Responsive design cho tất cả components
- PWA configuration
- Offline mode support

---

## 🗄️ CẤU TRÚC DATABASE CHI TIẾT

### Bảng chính:
1. **products** - Sản phẩm
2. **customers** - Khách hàng  
3. **orders** - Đơn hàng
4. **order_items** - Chi tiết đơn hàng
5. **transactions** - Giao dịch thu chi
6. **categories** - Danh mục sản phẩm
7. **tax_settings** - Cài đặt thuế
8. **payment_methods** - Phương thức thanh toán

### Quan hệ:
- orders → customers (many-to-one)
- order_items → orders (many-to-one)
- order_items → products (many-to-one)
- transactions → orders (one-to-one, optional)

---

## ✅ CHECKLIST TIẾN ĐỘỰC HIỆN

### Tuần 1:
- [ ] Setup database schema
- [ ] Tạo products management
- [ ] Tạo customers management
- [ ] Basic dashboard

### Tuần 2:
- [ ] Orders management
- [ ] Inventory tracking
- [ ] Invoice generation
- [ ] Testing end-to-end flow

### Tuần 3:
- [ ] Financial transactions
- [ ] Income/expense tracking
- [ ] Basic reporting

### Tuần 4:
- [ ] Advanced reports
- [ ] Profit/loss analysis
- [ ] Export functionality

### Tuần 5:
- [ ] VAT calculation
- [ ] Tax reports
- [ ] Government forms

### Tuần 6:
- [ ] Business analytics
- [ ] Performance optimization
- [ ] User testing

---

## 🎯 MỤC TIÊU CUỐI CÙNG

Hoàn thành một hệ thống quản lý bán hàng đầy đủ với:
- ✅ Quản lý sản phẩm, khách hàng, đơn hàng
- ✅ Theo dõi thu chi và báo cáo tài chính
- ✅ Tính toán và báo cáo thuế tự động
- ✅ Giao diện đẹp với theme switching
- ✅ Mobile responsive
- ✅ Bảo mật cao với Supabase RLS

**LƯU Ý**: Roadmap này sẽ được cập nhật theo tiến độ thực tế!