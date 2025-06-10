"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";
import Link from "next/link";

interface Customer {
  name: string;
}

interface Order {
  id: string;
  order_number: string;
  customer: Customer | null;
  total_amount: number;
  status: string;
  created_at: string;
}

// Raw data type from Supabase
interface OrderFromDB {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  customer: Customer[] | null; // Supabase returns array for foreign key
}

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentOrders() {
      try {
        const supabase = createClient();
        
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            order_number,
            total_amount,
            status,
            created_at,
            customer:customers(name)
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        
        // Transform data to match our interface
        const transformedOrders: Order[] = (data as OrderFromDB[])?.map(order => ({
          id: order.id,
          order_number: order.order_number,
          total_amount: order.total_amount,
          status: order.status,
          created_at: order.created_at,
          customer: order.customer && order.customer.length > 0 ? order.customer[0] : null
        })) || [];

        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentOrders();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Chờ xử lý',
      confirmed: 'Đã xác nhận',
      shipped: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy'
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (loading) {
    return <div className="flex justify-center py-4">Đang tải đơn hàng...</div>;
  }

  // 🔧 FIX: Mobile-responsive empty state
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Chưa có đơn hàng nào</h3>
        <p className="text-muted-foreground mb-4 text-sm px-2">
          Tạo đơn hàng đầu tiên để bắt đầu bán hàng
        </p>
        
        {/* 🔧 FIX: Responsive button container */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center px-4">
          
          {/* 🔧 FIX: Primary button - responsive text */}
          <Button asChild className="w-full sm:w-auto">
            <Link href="/orders/create" className="flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Tạo đơn hàng đầu tiên</span>
              <span className="xs:hidden">Tạo đơn hàng</span>
            </Link>
          </Button>
          
          {/* 🔧 FIX: Secondary button - responsive text */}
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/products" className="flex items-center justify-center gap-2">
              <span className="hidden xs:inline">Xem sản phẩm</span>
              <span className="xs:hidden">Sản phẩm</span>
            </Link>
          </Button>
          
        </div>
      </div>
    );
  }

  // 🔧 FIX: Orders list with mobile-responsive layout
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors gap-2">
          
          {/* 🔧 FIX: Order info section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium text-sm">#{order.order_number}</span>
              <Badge className={`${getStatusColor(order.status)} text-xs`}>
                {getStatusText(order.status)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {order.customer?.name || 'Khách lẻ'} • {new Date(order.created_at).toLocaleDateString('vi-VN')}
            </div>
          </div>
          
          {/* 🔧 FIX: Amount section */}
          <div className="text-left sm:text-right">
            <div className="font-semibold text-sm">
              {formatCurrency(order.total_amount)}
            </div>
          </div>
          
        </div>
      ))}

      {/* 🔧 FIX: View all link */}
      <div className="text-center pt-2">
        <Link 
          href="/orders" 
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
        >
          Xem tất cả đơn hàng →
        </Link>
      </div>
    </div>
  );
}