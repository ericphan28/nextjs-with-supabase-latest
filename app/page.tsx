import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import {
  Building2,
  BarChart3,
  Package,
  Bell,
  DollarSign,
  Smartphone,
  FileSpreadsheet,
  Headphones,
  ArrowRight,
  CheckCircle,
  Store,
  Hammer,
  Tractor,
  Star,
  Pizza,
  Shirt,
  Wrench,
  Pill,
  Book,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BarChart3,
      title: "Báo cáo thống kê",
      description: "Theo dõi doanh thu chi tiết từng sản phẩm, phân tích xu hướng bán hàng"
    },
    {
      icon: Package,
      title: "Quản lý tồn kho",
      description: "Theo dõi nhập/xuất tự động, kiểm soát số lượng hàng hóa chính xác"
    },
    {
      icon: Bell,
      title: "Cảnh báo real-time",
      description: "Thông báo tự động khi hết hàng, sắp hết hạn sử dụng"
    },
    {
      icon: DollarSign,
      title: "Tính toán lợi nhuận",
      description: "Phân tích chi phí và margin từng mặt hàng, tối ưu giá bán"
    },
    {
      icon: Smartphone,
      title: "Mobile friendly",
      description: "Truy cập dễ dàng trên điện thoại, quản lý mọi lúc mọi nơi"
    }
  ];

  const targetAudience = [
    { icon: Store, title: "Cửa hàng tạp hóa", description: "Quản lý đa dạng mặt hàng" },
    { icon: Pizza, title: "Nhà hàng/Cafe", description: "Kiểm soát nguyên liệu" },
    { icon: Shirt, title: "Shop thời trang", description: "Phân loại thời trang theo mùa" },
    { icon: Wrench, title: "Cửa hàng phụ tùng", description: "Quản lý linh kiện" },
    { icon: Pill, title: "Nhà thuốc", description: "Theo dõi hạn sử dụng" },
    { icon: Book, title: "Nhà sách", description: "Quản lý xuất bản phẩm" },
    { icon: Hammer, title: "Vật liệu xây dựng", description: "Theo dõi tồn kho lớn" },
    { icon: Tractor, title: "Vật tư nông nghiệp", description: "Quản lý theo mùa vụ" }
  ];

  const testimonials = [
    {
      quote: "Hệ thống giúp chúng tôi theo dõi tồn kho hiệu quả hơn nhiều",
      author: "Chị Hương",
      business: "Cửa hàng tạp hóa"
    },
    {
      quote: "Dashboard rất trực quan, dễ sử dụng ngay từ ngày đầu",
      author: "Anh Đức",
      business: "Cửa hàng vật liệu xây dựng"
    },
    {
      quote: "Cảnh báo hết hàng giúp chúng tôi không bao giờ thiếu nguyên liệu",
      author: "Anh Minh",
      business: "Quán cơm"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/25" />
      
      {/* Header */}
      <header className="relative z-10 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                  Gia Kiệm Số
                </Link>
                <p className="text-xs text-muted-foreground hidden sm:block">GiaKiemSo.com</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tính năng
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Bảng giá
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Liên hệ
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              {hasEnvVars && <AuthButton />}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Badge */}
            <Badge variant="outline" className="mb-6 bg-primary/5 border-primary/20">
              <Star className="w-3 h-3 mr-1" />
              Quản lý bán hàng thông minh cho hộ kinh doanh
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Quản lý bán hàng{" "}
              <span className="text-primary">thông minh</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tối ưu tồn kho - Tăng lợi nhuận với dashboard real-time. 
              Dễ sử dụng, hiệu quả cao cho hộ kinh doanh nhỏ lẻ.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-base px-8 py-3 h-auto">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Hỗ trợ khởi tạo từ Excel
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 py-3 h-auto">
                <Headphones className="w-4 h-4 mr-2" />
                Tư vấn miễn phí
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Miễn phí tư vấn</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Dễ sử dụng</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Hiệu quả cao</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Tại sao chọn Gia Kiệm Số?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Giải pháp toàn diện giúp hộ kinh doanh quản lý hiệu quả và tăng trưởng bền vững
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="relative z-10 py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Phù hợp cho mọi loại hình kinh doanh
            </h2>
            <p className="text-lg text-muted-foreground">
              Từ cửa hàng nhỏ đến hộ kinh doanh gia đình, chúng tôi có giải pháp phù hợp
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <Card key={index} className="text-center border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:scale-105 transition-transform">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <audience.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{audience.title}</h3>
                  <p className="text-sm text-muted-foreground">{audience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="text-lg text-muted-foreground">
              Phản hồi từ những hộ kinh doanh đã tin tưởng sử dụng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Gói sử dụng đơn giản
            </h2>
            <p className="text-lg text-muted-foreground">
              Minh bạch, không phí ẩn, phù hợp với mọi quy mô hộ kinh doanh
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <Badge className="mx-auto mb-4 bg-primary">Khuyến nghị</Badge>
                <CardTitle className="text-2xl">Gói Hộ Kinh Doanh</CardTitle>
                <CardDescription className="text-lg">Phù hợp cho mọi loại hình kinh doanh nhỏ lẻ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-3">
                  {[
                    "✅ Tư vấn thiết lập miễn phí",
                    "✅ Hỗ trợ import dữ liệu từ Excel",
                    "✅ Không giới hạn sản phẩm",
                    "✅ Báo cáo thống kê chi tiết", 
                    "✅ Cảnh báo tồn kho real-time",
                    "✅ Cập nhật tính năng tự động"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t">
                  <Button size="lg" className="w-full text-base">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Bắt đầu với dữ liệu Excel
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="w-full text-base">
                    <Headphones className="w-4 h-4 mr-2" />
                    Liên hệ tư vấn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Bắt đầu ngay hôm nay
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Liên hệ với chúng tôi để được tư vấn và hỗ trợ thiết lập hệ thống
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="text-base px-8 py-3 h-auto">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Khởi tạo từ Excel ngay
              </Button>
              <a href="https://zalo.me/0907136029" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-base px-8 py-3 h-auto">
                  Liên hệ Zalo: 0907 136 029
                </Button>
              </a>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>Email: support@giakiemso.com</p>
              <p>Hotline: 0907 136 029 (hỗ trợ qua Zalo)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-muted/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Gia Kiệm Số</h3>
                  <p className="text-xs text-muted-foreground">GiaKiemSo.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Hệ thống quản lý bán hàng thông minh cho hộ kinh doanh Việt Nam
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Liên kết</h4>
              <div className="space-y-2 text-sm">
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors block">
                  Tính năng
                </Link>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors block">
                  Bảng giá
                </Link>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors block">
                  Liên hệ
                </Link>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Hỗ trợ</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Hotline: 0907 136 029</p>
                <p>Email: support@giakiemso.com</p>
                <p>Zalo: 0907 136 029</p>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Pháp lý</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Điều khoản sử dụng</p>
                <p>Chính sách bảo mật</p>
                <p>Chính sách hoàn tiền</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Gia Kiệm Số. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
