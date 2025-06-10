"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";

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

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
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

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Sản phẩm
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                SKU
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Danh mục
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                Giá bán
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                Giá vốn
              </th>
              <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                Tồn kho
              </th>
              <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                Trạng thái
              </th>
              <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock_quantity, product.min_stock_level);
              const profit = product.price - (product.cost_price || 0);
              const profitMargin = product.cost_price ? (profit / product.price * 100) : 0;

              return (
                <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="font-medium line-clamp-1">{product.name}</div>
                      {profitMargin > 0 && (
                        <div className="text-xs text-blue-600">
                          Lợi nhuận: {formatCurrency(profit)} ({profitMargin.toFixed(1)}%)
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {product.sku || 'N/A'}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-semibold text-green-600">
                      {formatCurrency(product.price)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm">
                      {product.cost_price ? formatCurrency(product.cost_price) : 'N/A'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-medium">{product.stock_quantity}</span>
                      {product.stock_quantity <= product.min_stock_level && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <Badge variant={stockStatus.color}>
                      {stockStatus.text}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/products/${product.id}/edit`}>
                          <Edit className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không có sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}