"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Edit, 
  Package, 
  AlertTriangle,  
  Plus            
} from "lucide-react";

import Link from "next/link";
import { DeleteProductDialog } from "./delete-product-dialog";

// Interfaces
interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost_price?: number;
  stock_quantity: number;
  min_stock_level: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Không thể tải danh sách sản phẩm";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle successful delete
  const handleDeleteSuccess = () => {
    fetchProducts(); // Refresh the list
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10 w-80"
                disabled
              />
            </div>
          </div>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>
        
        {/* Loading skeletons */}
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Lỗi tải dữ liệu</h3>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
            </div>
            <Button 
              onClick={fetchProducts} 
              className="mt-4"
              variant="outline"
            >
              Thử lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo tên, SKU, danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        
        <Button asChild>
          <Link href="/dashboard/products/create">
            <Plus className="h-4 w-4 mr-2" />
            Thêm sản phẩm
          </Link>
        </Button>
      </div>

      {/* Products Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Hiển thị {filteredProducts.length} trong tổng số {products.length} sản phẩm
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <Package className="h-12 w-12 text-gray-400" />
              <div>
                <h3 className="text-lg font-semibold">
                  {searchTerm ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm nào"}
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? "Thử thay đổi từ khóa tìm kiếm" 
                    : "Thêm sản phẩm đầu tiên để bắt đầu"
                  }
                </p>
              </div>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/dashboard/products/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm sản phẩm đầu tiên
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold truncate">
                        {product.name}
                      </h3>
                      <div className="flex gap-2">
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Đang bán" : "Tạm ẩn"}
                        </Badge>
                        <Badge 
                          variant={product.stock_quantity <= product.min_stock_level ? "destructive" : "outline"}
                        >
                          {product.stock_quantity <= product.min_stock_level ? "Sắp hết" : "Còn hàng"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">SKU</p>
                        <p className="font-mono">{product.sku}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Danh mục</p>
                        <p>{product.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Giá bán</p>
                        <p className="font-semibold text-green-600">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(product.price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tồn kho</p>
                        <p className={product.stock_quantity <= product.min_stock_level ? "text-red-600 font-semibold" : ""}>
                          {product.stock_quantity} sản phẩm
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Sửa
                      </Link>
                    </Button>
                    
                    <DeleteProductDialog
                      productId={product.id}
                      productName={product.name}
                      onSuccess={handleDeleteSuccess}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}