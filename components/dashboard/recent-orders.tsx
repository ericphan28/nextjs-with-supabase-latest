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

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Chưa có đơn hàng nào</h3>
        <p className="text-muted-foreground mb-4">
          Tạo đơn hàng đầu tiên để bắt đầu bán hàng
        </p>
        <div className="flex gap-2 justify-center">
          <Button asChild>
            <Link href="/orders/create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tạo đơn hàng đầu tiên
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Xem sản phẩm</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">#{order.order_number}</span>
              <Badge className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {order.customer?.name || 'Khách lẻ'} • {new Date(order.created_at).toLocaleDateString('vi-VN')}
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">
              {formatCurrency(order.total_amount)}
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center">
        <a 
          href="/orders" 
          className="text-sm text-primary hover:underline"
        >
          Xem tất cả đơn hàng →
        </a>
      </div>
    </div>
  );
}