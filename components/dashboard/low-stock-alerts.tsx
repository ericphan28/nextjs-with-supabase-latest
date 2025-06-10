"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  sku: string | null;
  stock_quantity: number;
  min_stock_level: number;
  category: string | null;
}

export function LowStockAlerts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLowStockProducts() {
      try {
        setError(null);
        const supabase = createClient();
        
        console.log('🔍 Fetching low stock products...');
        
        // Simplified approach: Get all products first, then filter
        const { data: allProducts, error: queryError } = await supabase
          .from('products')
          .select('id, name, sku, stock_quantity, min_stock_level, category, is_active')
          .eq('is_active', true);
          
        if (queryError) {
          console.error('❌ Query error details:', {
            message: queryError.message,
            code: queryError.code,
            details: queryError.details,
            hint: queryError.hint
          });
          throw queryError;
        }
        
        console.log('✅ All products fetched:', allProducts?.length || 0);
        
        // Filter low stock products in JavaScript
        const lowStockProducts = allProducts?.filter(product => {
          const isLowStock = product.stock_quantity < product.min_stock_level;
          console.log(`Product ${product.name}: ${product.stock_quantity} < ${product.min_stock_level} = ${isLowStock}`);
          return isLowStock;
        }) || [];
        
        console.log('📊 Low stock products found:', lowStockProducts.length);
        
        setProducts(lowStockProducts.slice(0, 10));
        
      } catch (error: any) {
        console.error('❌ Error in fetchLowStockProducts:', error);
        setError(error?.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchLowStockProducts();
  }, []);

  const getStockLevel = (current: number, min: number) => {
    if (current === 0) return { level: 'Hết hàng', color: 'bg-red-100 text-red-800' };
    if (current <= min * 0.5) return { level: 'Rất thấp', color: 'bg-red-100 text-red-800' };
    return { level: 'Thấp', color: 'bg-yellow-100 text-yellow-800' };
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="text-sm text-muted-foreground">🔄 Đang kiểm tra tồn kho...</div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <div className="flex justify-center mb-2">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="font-medium">Lỗi tải dữ liệu tồn kho</p>
        <p className="text-sm mt-2 max-w-md mx-auto break-words">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <div className="flex justify-center mb-2">
          <AlertTriangle className="w-8 h-8 text-green-500" />
        </div>
        <p className="font-medium text-green-600">Tất cả sản phẩm đều đủ hàng!</p>
        <p className="text-sm">Không có cảnh báo tồn kho nào</p>
        <p className="text-xs mt-2 text-muted-foreground">
          (Dựa trên sample data hiện tại)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const stockInfo = getStockLevel(product.stock_quantity, product.min_stock_level);
        return (
          <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                SKU: {product.sku || 'N/A'} • {product.category || 'Chưa phân loại'}
              </div>
            </div>
            <div className="text-right space-y-1">
              <Badge className={stockInfo.color}>
                {stockInfo.level}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {product.stock_quantity}/{product.min_stock_level}
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="text-center">
        <a 
          href="/inventory" 
          className="text-sm text-primary hover:underline"
        >
          Quản lý tồn kho →
        </a>
      </div>
    </div>
  );
}