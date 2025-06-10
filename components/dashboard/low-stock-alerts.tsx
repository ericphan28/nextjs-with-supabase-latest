"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  current_stock: number;
  min_stock_level: number;
  price: number;
}

export function LowStockAlerts() {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLowStockProducts() {
      try {
        const supabase = createClient();
        
        // Query products where current_stock <= min_stock_level
        const { data, error } = await supabase
          .from('products')
          .select('id, name, current_stock, min_stock_level, price')
          .lte('current_stock', 'min_stock_level')
          .order('current_stock', { ascending: true })
          .limit(10);

        if (error) {
          console.error('Error fetching low stock products:', error);
          return;
        }

        setLowStockProducts(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLowStockProducts();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return { text: 'Hết hàng', color: 'bg-red-100 text-red-800' };
    if (current <= min * 0.5) return { text: 'Rất thấp', color: 'bg-red-100 text-red-800' };
    return { text: 'Thấp', color: 'bg-yellow-100 text-yellow-800' };
  };

  if (loading) {
    return <div className="flex justify-center py-4">Đang kiểm tra tồn kho...</div>;
  }

  // 🔧 FIX: Use proper type instead of any
  const handleRestock = (productId: string): void => {
    // Handle restock logic here
    console.log('Restock product:', productId);
  };

  if (lowStockProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-lg font-semibold text-green-700 mb-2">Tất cả sản phẩm đều đủ hàng!</h3>
        <p className="text-muted-foreground">Không có cảnh báo tồn kho nào</p>
        <p className="text-xs text-muted-foreground mt-2">(Dựa trên sample data hiện tại)</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lowStockProducts.map((product) => {
        const status = getStockStatus(product.current_stock, product.min_stock_level);
        
        return (
          <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{product.name}</span>
                  <Badge className={`${status.color} text-xs`}>
                    {status.text}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Còn {product.current_stock} / Tối thiểu {product.min_stock_level} • {formatCurrency(product.price)}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleRestock(product.id)}
              className="text-sm text-primary hover:underline"
            >
              Nhập hàng
            </button>
            
          </div>
        );
      })}
    </div>
  );
}