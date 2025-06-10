"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockProducts: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
}

export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setError(null);
        const supabase = createClient();

        console.log('Fetching dashboard stats...');

        // Test connection first
        const { data: testData, error: testError } = await supabase
          .from('products')
          .select('count')
          .limit(1);
          
        if (testError) {
          throw new Error(`Database connection failed: ${testError.message}`);
        }

        // Get stats with error handling for each query
        const [ordersResult, customersResult, lowStockResult] = await Promise.allSettled([
          supabase.from('orders').select('total_amount, created_at, status'),
          supabase.from('customers').select('*', { count: 'exact', head: true }),
          supabase.from('products').select('*', { count: 'exact', head: true }).lt('stock_quantity', 'min_stock_level')
        ]);

        // Process results
        let totalRevenue = 0;
        let totalOrders = 0;
        let totalCustomers = 0;
        let lowStockProducts = 0;

        if (ordersResult.status === 'fulfilled' && ordersResult.value.data) {
          const orders = ordersResult.value.data;
          totalRevenue = orders
            .filter(order => order.status === 'delivered')
            .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
          totalOrders = orders.length;
        }

        if (customersResult.status === 'fulfilled') {
          totalCustomers = customersResult.value.count || 0;
        }

        if (lowStockResult.status === 'fulfilled') {
          lowStockProducts = lowStockResult.value.count || 0;
        }

        // Mock changes for demo
        const revenueChange = Math.floor(Math.random() * 20) - 5;
        const ordersChange = Math.floor(Math.random() * 15) - 3;
        const customersChange = Math.floor(Math.random() * 10) + 2;

        setStats({
          totalRevenue,
          totalOrders,
          totalCustomers,
          lowStockProducts,
          revenueChange,
          ordersChange,
          customersChange
        });

        console.log('Stats loaded successfully:', {
          totalRevenue,
          totalOrders,
          totalCustomers,
          lowStockProducts
        });

      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-4 text-center text-red-600 py-8">
        <p className="font-medium">Lỗi tải thống kê: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-sm text-primary hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!stats) {
    return <div>Không thể tải dữ liệu thống kê</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          <DollarSign className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
          <div className="flex items-center gap-1 text-xs">
            {getTrendIcon(stats.revenueChange)}
            <span className={getTrendColor(stats.revenueChange)}>
              {stats.revenueChange > 0 ? '+' : ''}{stats.revenueChange}% so với tháng trước
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Total Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
          <ShoppingCart className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs">
            {getTrendIcon(stats.ordersChange)}
            <span className={getTrendColor(stats.ordersChange)}>
              {stats.ordersChange > 0 ? '+' : ''}{stats.ordersChange}% so với tháng trước
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Total Customers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
          <Users className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs">
            {getTrendIcon(stats.customersChange)}
            <span className={getTrendColor(stats.customersChange)}>
              {stats.customersChange > 0 ? '+' : ''}{stats.customersChange}% so với tháng trước
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cảnh báo tồn kho</CardTitle>
          <Package className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.lowStockProducts}</div>
          <div className="text-xs text-muted-foreground">
            sản phẩm sắp hết hàng
          </div>
        </CardContent>
      </Card>

    </div>
  );
}