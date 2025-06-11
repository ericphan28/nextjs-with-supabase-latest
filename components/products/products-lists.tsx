"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Eye, Package, Filter } from "lucide-react";
import Link from "next/link";
import { ProductsViewToggle } from "./products-view-toggle";
import { ProductsTable } from "./products-table";
import { DeleteProductDialog } from "./delete-product-dialog";

interface Product {
  id: string;
  name: string;
  price: number;
  cost_price: number;
  sku: string;
  category: string;
  stock_quantity: number;
  min_stock_level: number;
  is_active: boolean;
  created_at: string;
}

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";
type ViewType = 'card' | 'table';

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [view, setView] = useState<ViewType>('card');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStockStatus = (current: number, min: number): { text: string; color: BadgeVariant } => {
    if (current === 0) return { text: 'Hết hàng', color: 'destructive' };
    if (current <= min) return { text: 'Sắp hết', color: 'secondary' };
    return { text: 'Còn hàng', color: 'default' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm min-w-[150px]"
        >
          <option value="all">Tất cả danh mục</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Gia dụng">Gia dụng</option>
          <option value="Thực phẩm">Thực phẩm</option>
        </select>
      </div>

      {/* Products Count & View Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Hiển thị {filteredProducts.length} sản phẩm
        </p>
        <ProductsViewToggle view={view} onViewChange={setView} />
      </div>

      {/* Products Display - Card hoặc Table */}
      {view === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock_quantity, product.min_stock_level);
            const profit = product.price - (product.cost_price || 0);
            const profitMargin = product.cost_price ? (profit / product.price * 100) : 0;

            return (
              <Card key={product.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg line-clamp-2 flex-1">{product.name}</CardTitle>
                    <Badge variant={stockStatus.color} className="shrink-0">
                      {stockStatus.text}
                    </Badge>
                  </div>
                  {product.sku && (
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Price Info */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Giá bán:</span>
                      <span className="font-semibold text-green-600 text-lg">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    {product.cost_price && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Giá vốn:</span>
                          <span className="text-sm">{formatCurrency(product.cost_price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Lợi nhuận:</span>
                          <span className="text-sm font-medium text-blue-600">
                            {formatCurrency(profit)} ({profitMargin.toFixed(1)}%)
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Stock Info */}
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Tồn kho:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-lg">{product.stock_quantity}</span>
                      {product.stock_quantity <= product.min_stock_level && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Danh mục:</span>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Sửa
                      </Link>
                    </Button>
                    <DeleteProductDialog
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <ProductsTable products={filteredProducts} />
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Không tìm thấy sản phẩm</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory !== "all" 
              ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc" 
              : "Chưa có sản phẩm nào trong hệ thống"}
          </p>
          <Button asChild>
            <Link href="/dashboard/products/create">
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm đầu tiên
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}