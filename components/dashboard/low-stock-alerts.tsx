"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, Database, RefreshCw } from "lucide-react";

interface Product {
  id: string;
  name: string;
  stock_quantity: number;        // 🔧 FIX: Use correct column name
  min_stock_level: number;
  price: number;
  sku?: string;
  category?: string;
}

export function LowStockAlerts() {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    async function fetchLowStockProducts() {
      try {
        const supabase = createClient();
        
        console.log('🔍 Starting products query with correct columns...');
        setDebugInfo("Đang kết nối database...");

        // 🔧 FIX: Use correct column names from database
        const { data, error } = await supabase
          .from('products')
          .select('id, name, stock_quantity, min_stock_level, price, sku, category')
          .eq('is_active', true)  // Only active products
          .order('stock_quantity', { ascending: true })
          .limit(50);

        if (error) {
          console.error('❌ Supabase query error:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          
          setError(`Database error: ${error.message}`);
          setDebugInfo(`Error code: ${error.code}`);
          return;
        }

        console.log('✅ Products query successful:', data?.length || 0, 'products');
        
        if (!data || data.length === 0) {
          setLowStockProducts([]);
          setDebugInfo("No active products found in database");
          return;
        }

        // 🔧 FIX: Filter using correct column name
        const filteredProducts = data.filter(product => 
          product.stock_quantity <= product.min_stock_level
        ).slice(0, 10);

        setLowStockProducts(filteredProducts);
        setDebugInfo(`Found ${filteredProducts.length} low stock products out of ${data.length} total`);
        
      } catch (error) {
        console.error('💥 Unexpected error:', error);
        setError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown'}`);
        setDebugInfo(`Error type: ${typeof error}`);
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
    if (current === 0) return { 
      text: 'Hết hàng', 
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: '🚫'
    };
    if (current <= min * 0.3) return { 
      text: 'Rất thấp', 
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: '🔴' 
    };
    if (current <= min * 0.6) return { 
      text: 'Thấp', 
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: '🟡'
    };
    return { 
      text: 'Cần nhập', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: '⚠️'
    };
  };

  const handleRestock = (product: Product): void => {
    console.log('🔄 Restock requested for:', product.name);
    alert(`📦 Yêu cầu nhập hàng cho "${product.name}" đã được ghi nhận!\n\nSKU: ${product.sku || 'N/A'}\nSố lượng hiện tại: ${product.stock_quantity}\nSố lượng tối thiểu: ${product.min_stock_level}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3">
        <div className="relative">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">Đang kiểm tra tồn kho...</p>
        {debugInfo && (
          <p className="text-xs text-muted-foreground">{debugInfo}</p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-red-700">
          <Database className="w-5 h-5" />
          <h3 className="font-semibold">Lỗi kết nối Database</h3>
        </div>
        
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
        
        {debugInfo && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded font-mono">
            Debug: {debugInfo}
          </div>
        )}
        
        <button 
          onClick={() => window.location.reload()} 
          className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (lowStockProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-lg font-semibold text-green-700 mb-2">Tất cả sản phẩm đều đủ hàng!</h3>
        <p className="text-muted-foreground">Không có cảnh báo tồn kho nào</p>
        {debugInfo && (
          <p className="text-xs text-muted-foreground mt-2">{debugInfo}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Success Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center gap-2 text-green-700">
          <Database className="w-4 h-4" />
          <span className="text-sm font-medium">✅ Kết nối database thành công</span>
        </div>
        {debugInfo && (
          <p className="text-xs text-green-600 mt-1">{debugInfo}</p>
        )}
      </div>

      {/* Products List */}
      <div className="grid gap-3">
        {lowStockProducts.map((product) => {
          const status = getStockStatus(product.stock_quantity, product.min_stock_level);
          const stockPercentage = (product.stock_quantity / product.min_stock_level) * 100;
          
          return (
            <div 
              key={product.id} 
              className="group relative bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/20"
            >
              
              {/* Stock Status Indicator */}
              <div className="absolute top-3 right-3">
                <span className="text-lg">{status.icon}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                
                {/* Product Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <Badge className={`${status.color} text-xs border`}>
                        {status.text}
                      </Badge>
                    </div>
                    
                    {/* SKU & Category */}
                    {(product.sku || product.category) && (
                      <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                        {product.sku && <span>SKU: {product.sku}</span>}
                        {product.sku && product.category && <span>•</span>}
                        {product.category && <span>{product.category}</span>}
                      </div>
                    )}
                    
                    {/* Stock Info */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Tồn kho: <span className="font-medium">{product.stock_quantity}</span></span>
                        <span>Tối thiểu: <span className="font-medium">{product.min_stock_level}</span></span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all ${
                            stockPercentage <= 30 ? 'bg-red-500' :
                            stockPercentage <= 60 ? 'bg-orange-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Giá: <span className="font-medium text-green-600">{formatCurrency(product.price)}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                          {stockPercentage.toFixed(0)}% mức tối thiểu
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <button
                  onClick={() => handleRestock(product)}
                  className="self-start sm:self-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow flex items-center gap-2"
                >
                  <RefreshCw className="w-3 h-3" />
                  Nhập hàng
                </button>
                
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}