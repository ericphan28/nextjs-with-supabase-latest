import { Suspense } from "react";
import { ProductsList } from "@/components/products/products-lists";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header với Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">
            Quản lý danh sách sản phẩm, tồn kho và giá bán
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Excel
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button asChild>
            <Link href="/dashboard/products/create">
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm
            </Link>
          </Button>
        </div>
      </div>

      {/* Products List */}
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground">Đang tải danh sách sản phẩm...</p>
          </div>
        </div>
      }>
        <ProductsList />
      </Suspense>
    </div>
  );
}