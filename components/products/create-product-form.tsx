"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Save, ArrowLeft, Calculator, Package } from "lucide-react";
import Link from "next/link";
import { productSchema, type ProductFormData } from "@/lib/validations/product";

export function CreateProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      description: "",
      price: 0,
      cost_price: 0,
      stock_quantity: 0,
      min_stock_level: 5,
      is_active: true,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  // Watch price and cost_price để tính profit
  const price = watch("price");
  const costPrice = watch("cost_price");
  const profit = price && costPrice ? price - costPrice : 0;
  const profitMargin = price && costPrice && price > 0 ? (profit / price * 100) : 0;

  // Generate SKU tự động
  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `SKU-${timestamp}-${randomStr}`;
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const supabase = createClient();

      // Nếu không có SKU, tự động generate
      if (!data.sku || data.sku.trim() === "") {
        data.sku = generateSKU();
      }

      const { error } = await supabase
        .from('products')
        .insert([{
          name: data.name,
          sku: data.sku,
          category: data.category,
          description: data.description || null,
          price: data.price,
          cost_price: data.cost_price || null,
          stock_quantity: data.stock_quantity,
          min_stock_level: data.min_stock_level,
          is_active: data.is_active,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }]);

      if (error) throw error;

      router.push("/dashboard/products");
      router.refresh();
    } catch (error: unknown) {
      // Fix ESLint error: Replace 'any' with 'unknown' and proper type checking
      const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra khi tạo sản phẩm";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thêm sản phẩm mới</h1>
          <p className="text-muted-foreground">
            Điền thông tin để tạo sản phẩm mới trong hệ thống
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thông tin cơ bản */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Thông tin cơ bản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tên sản phẩm */}
                <div className="space-y-2">
                  <Label htmlFor="name">Tên sản phẩm *</Label>
                  <Input
                    id="name"
                    placeholder="Nhập tên sản phẩm..."
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* SKU */}
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU (Mã sản phẩm)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="sku"
                      placeholder="Để trống để tự động tạo"
                      {...register("sku")}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setValue("sku", generateSKU())}
                    >
                      Tạo mã
                    </Button>
                  </div>
                  {errors.sku && (
                    <p className="text-sm text-red-500">{errors.sku.message}</p>
                  )}
                </div>

                {/* Danh mục */}
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục *</Label>
                  <select
                    id="category"
                    {...register("category")}
                    className={`w-full px-3 py-2 border border-input bg-background rounded-md text-sm ${
                      errors.category ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Điện tử">Điện tử</option>
                    <option value="Thời trang">Thời trang</option>
                    <option value="Gia dụng">Gia dụng</option>
                    <option value="Thực phẩm">Thực phẩm</option>
                    <option value="Sách & Văn phòng">Sách & Văn phòng</option>
                    <option value="Sức khỏe & Làm đẹp">Sức khỏe & Làm đẹp</option>
                  </select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>

                {/* Mô tả */}
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả sản phẩm</Label>
                  <Textarea
                    id="description"
                    placeholder="Nhập mô tả chi tiết sản phẩm..."
                    rows={3}
                    {...register("description")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Thông tin tồn kho */}
            <Card>
              <CardHeader>
                <CardTitle>Quản lý tồn kho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Số lượng tồn kho */}
                  <div className="space-y-2">
                    <Label htmlFor="stock_quantity">Số lượng tồn kho *</Label>
                    <Input
                      id="stock_quantity"
                      type="number"
                      min="0"
                      placeholder="0"
                      {...register("stock_quantity", { valueAsNumber: true })}
                      className={errors.stock_quantity ? "border-red-500" : ""}
                    />
                    {errors.stock_quantity && (
                      <p className="text-sm text-red-500">{errors.stock_quantity.message}</p>
                    )}
                  </div>

                  {/* Mức tồn kho tối thiểu */}
                  <div className="space-y-2">
                    <Label htmlFor="min_stock_level">Mức cảnh báo tồn kho *</Label>
                    <Input
                      id="min_stock_level"
                      type="number"
                      min="0"
                      placeholder="5"
                      {...register("min_stock_level", { valueAsNumber: true })}
                      className={errors.min_stock_level ? "border-red-500" : ""}
                    />
                    {errors.min_stock_level && (
                      <p className="text-sm text-red-500">{errors.min_stock_level.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Giá và trạng thái */}
          <div className="space-y-6">
            {/* Thông tin giá */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Thông tin giá
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Giá bán */}
                <div className="space-y-2">
                  <Label htmlFor="price">Giá bán *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="0"
                    {...register("price", { valueAsNumber: true })}
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">{errors.price.message}</p>
                  )}
                </div>

                {/* Giá vốn */}
                <div className="space-y-2">
                  <Label htmlFor="cost_price">Giá vốn</Label>
                  <Input
                    id="cost_price"
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="0"
                    {...register("cost_price", { valueAsNumber: true })}
                  />
                </div>

                {/* Hiển thị lợi nhuận */}
                {price && costPrice && (
                  <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lợi nhuận:</span>
                      <span className={profit >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(profit)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tỷ lệ lợi nhuận:</span>
                      <span className={profitMargin >= 20 ? "text-green-600 font-medium" : "text-orange-600 font-medium"}>
                        {profitMargin.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trạng thái */}
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={watch("is_active")}
                    onCheckedChange={(checked) => setValue("is_active", checked)}
                  />
                  <Label htmlFor="is_active">Kích hoạt sản phẩm</Label>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Sản phẩm sẽ hiển thị trong danh sách và có thể bán
                </p>
              </CardContent>
            </Card>

            {/* Submit buttons */}
            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Tạo sản phẩm
                  </>
                )}
              </Button>
              
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/dashboard/products">
                  Hủy bỏ
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}