import { Suspense } from "react";
import Link from "next/link"; // 🔧 THÊM import này
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { LowStockAlerts } from "@/components/dashboard/low-stock-alerts";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  AlertTriangle
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Header with user info, theme toggle, logout */}
      <DashboardHeader />
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">

        {/* Stats Cards */}
        <Suspense fallback={<div>Đang tải thống kê...</div>}>
          <StatsCards />
        </Suspense>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                📈 Biểu đồ Doanh thu
              </CardTitle>
              <CardDescription>Doanh thu 30 ngày gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Đang tải biểu đồ...</div>}>
                <SalesChart />
              </Suspense>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                🛒 Đơn hàng gần đây
              </CardTitle>
              <CardDescription>10 đơn hàng mới nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Đang tải đơn hàng...</div>}>
                <RecentOrders />
              </Suspense>
            </CardContent>
          </Card>

        </div>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ⚠️ Cảnh báo tồn kho
            </CardTitle>
            <CardDescription>Sản phẩm sắp hết hàng</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Đang kiểm tra tồn kho...</div>}>
              <LowStockAlerts />
            </Suspense>
          </CardContent>
        </Card>

        {/* Quick Actions - Thêm navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/products/create">
            <Card className="hover:shadow-md hover:scale-105 transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">➕</div>
                <h3 className="font-semibold">Thêm sản phẩm</h3>
                <p className="text-sm text-muted-foreground">Tạo sản phẩm mới</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/orders/create">
            <Card className="hover:shadow-md hover:scale-105 transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">🛒</div>
                <h3 className="font-semibold">Tạo đơn hàng</h3>
                <p className="text-sm text-muted-foreground">Đơn hàng mới</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/customers/create">
            <Card className="hover:shadow-md hover:scale-105 transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">👥</div>
                <h3 className="font-semibold">Thêm khách hàng</h3>
                <p className="text-sm text-muted-foreground">Khách hàng mới</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/reports">
            <Card className="hover:shadow-md hover:scale-105 transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold">Xem báo cáo</h3>
                <p className="text-sm text-muted-foreground">Phân tích chi tiết</p>
              </CardContent>
            </Card>
          </Link>
        </div>

      </div>
    </div>
  );
}