"use client";

import { useState, useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  ArrowLeft, 
  Calculator, 
  Package, 
  Loader2, 
  RefreshCw,
  Eye,
  EyeOff,
  Tag,
  Warehouse,
  DollarSign,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { productSchema, type ProductFormData } from "@/lib/validations/product";

interface EditProductFormProps {
  productId: string;
}

export function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
    reset,
    formState: { errors, isDirty },
  } = form;

  // Watch all values for calculations
  const watchedValues = watch();
  const { price, cost_price: costPrice, stock_quantity, min_stock_level, is_active } = watchedValues;
  
  const profit = price && costPrice ? price - costPrice : 0;
  const profitMargin = price && costPrice && price > 0 ? (profit / price * 100) : 0;
  
  // Stock status
  const stockStatus = stock_quantity <= min_stock_level ? 'low' : 'good';
  const stockColor = stockStatus === 'low' ? 'text-red-600' : 'text-green-600';

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) throw error;

        if (data) {
          reset({
            name: data.name || "",
            sku: data.sku || "",
            category: data.category || "",
            description: data.description || "",
            price: data.price || 0,
            cost_price: data.cost_price || 0,
            stock_quantity: data.stock_quantity || 0,
            min_stock_level: data.min_stock_level || 5,
            is_active: data.is_active ?? true,
          });
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Không thể tải thông tin sản phẩm";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId, reset]);

  // Generate SKU
  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `PRD-${timestamp}-${randomStr}`;
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      const supabase = createClient();

      if (!data.sku || data.sku.trim() === "") {
        data.sku = generateSKU();
      }

      const { error } = await supabase
        .from('products')
        .update({
          name: data.name,
          sku: data.sku,
          category: data.category,
          description: data.description || null,
          price: data.price,
          cost_price: data.cost_price || null,
          stock_quantity: data.stock_quantity,
          min_stock_level: data.min_stock_level,
          is_active: data.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', productId);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/products");
        router.refresh();
      }, 1500);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra khi cập nhật sản phẩm";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Đang tải thông tin sản phẩm
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Vui lòng chờ trong giây lát...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild className="shadow-sm">
              <Link href="/dashboard/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại danh sách
              </Link>
            </Button>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Chỉnh sửa sản phẩm
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Cập nhật thông tin sản phẩm trong hệ thống
                  </p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <Badge variant={is_active ? "default" : "secondary"} className="text-sm">
                {is_active ? (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    Đang bán
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3 mr-1" />
                    Tạm ẩn
                  </>
                )}
              </Badge>
              <Badge variant={stockStatus === 'low' ? "destructive" : "default"} className="text-sm">
                <Warehouse className="h-3 w-3 mr-1" />
                {stockStatus === 'low' ? 'Sắp hết hàng' : 'Còn hàng'}
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Giá bán</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(price || 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Lợi nhuận</p>
                  <p className={`text-lg font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {profitMargin.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Warehouse className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tồn kho</p>
                  <p className={`text-lg font-semibold ${stockColor}`}>
                    {stock_quantity || 0} sản phẩm
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SKU</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                    {watch("sku") || "Chưa có"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message - Horizontal Layout */}
        {success && (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full shadow-sm">
                    <Save className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-1">
                    🎉 Cập nhật thành công!
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Thông tin sản phẩm đã được lưu vào hệ thống. Đang chuyển về trang danh sách...
                  </p>
                </div>
                
                {/* Animation & Progress */}
                <div className="flex-shrink-0 flex items-center gap-3">
                  {/* Animated dots */}
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="h-2 w-2 bg-green-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  
                  {/* Spinner */}
                  <div className="animate-spin">
                    <Loader2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="bg-green-200 dark:bg-green-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out animate-pulse" 
                    style={{width: '100%'}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="shadow-sm border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Thông tin cơ bản
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product Name */}
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      Tên sản phẩm
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Nhập tên sản phẩm..."
                      {...register("name")}
                      className={`h-11 ${errors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* SKU */}
                  <div className="space-y-3">
                    <Label htmlFor="sku" className="text-sm font-medium">
                      SKU (Mã sản phẩm)
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="sku"
                        placeholder="Để trống để tự động tạo"
                        {...register("sku")}
                        className="h-11 font-mono"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setValue("sku", generateSKU())}
                        className="px-4 h-11 whitespace-nowrap"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Tạo mã mới
                      </Button>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                      Danh mục
                      <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="category"
                      {...register("category")}
                      className={`w-full h-11 px-3 border bg-background rounded-md text-sm transition-colors ${
                        errors.category ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                      }`}
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="Điện tử">📱 Điện tử</option>
                      <option value="Thời trang">👔 Thời trang</option>
                      <option value="Gia dụng">🏠 Gia dụng</option>
                      <option value="Thực phẩm">🍎 Thực phẩm</option>
                      <option value="Sách & Văn phòng">📚 Sách & Văn phòng</option>
                      <option value="Sức khỏe & Làm đẹp">💄 Sức khỏe & Làm đẹp</option>
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Mô tả sản phẩm
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Nhập mô tả chi tiết sản phẩm..."
                      rows={4}
                      {...register("description")}
                      className="resize-none transition-colors focus:border-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Stock Management */}
              <Card className="shadow-sm border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Warehouse className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    Quản lý tồn kho
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="stock_quantity" className="text-sm font-medium flex items-center gap-2">
                        Số lượng tồn kho
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="stock_quantity"
                        type="number"
                        min="0"
                        placeholder="0"
                        {...register("stock_quantity", { valueAsNumber: true })}
                        className={`h-11 ${errors.stock_quantity ? "border-red-300" : ""} transition-colors`}
                      />
                      {errors.stock_quantity && (
                        <p className="text-sm text-red-600">{errors.stock_quantity.message}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="min_stock_level" className="text-sm font-medium flex items-center gap-2">
                        Mức cảnh báo tồn kho
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="min_stock_level"
                        type="number"
                        min="0"
                        placeholder="5"
                        {...register("min_stock_level", { valueAsNumber: true })}
                        className={`h-11 ${errors.min_stock_level ? "border-red-300" : ""} transition-colors`}
                      />
                      {errors.min_stock_level && (
                        <p className="text-sm text-red-600">{errors.min_stock_level.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card className="shadow-sm border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Calculator className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    Thông tin giá
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="price" className="text-sm font-medium flex items-center gap-2">
                      Giá bán
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="0"
                      {...register("price", { valueAsNumber: true })}
                      className={`h-11 ${errors.price ? "border-red-300" : ""} transition-colors`}
                    />
                    {errors.price && (
                      <p className="text-sm text-red-600">{errors.price.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="cost_price" className="text-sm font-medium">
                      Giá vốn
                    </Label>
                    <Input
                      id="cost_price"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="0"
                      {...register("cost_price", { valueAsNumber: true })}
                      className="h-11 transition-colors"
                    />
                  </div>

                  {/* Profit Display */}
                  {price && costPrice && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border">
                      <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Phân tích lợi nhuận</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Lợi nhuận:</span>
                          <span className={`font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(profit)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Tỷ lệ lợi nhuận:</span>
                          <span className={`font-semibold ${profitMargin >= 20 ? 'text-green-600' : 'text-orange-600'}`}>
                            {profitMargin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Status */}
              <Card className="shadow-sm border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Trạng thái sản phẩm</CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Switch
                          id="is_active"
                          checked={watch("is_active")}
                          onCheckedChange={(checked) => setValue("is_active", checked)}
                        />
                        <div>
                          <Label htmlFor="is_active" className="font-medium cursor-pointer">
                            Kích hoạt sản phẩm
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {is_active ? "Sản phẩm đang hiển thị và có thể bán" : "Sản phẩm đang bị ẩn"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !isDirty}
                  className="w-full h-12 text-base font-medium shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Cập nhật sản phẩm
                      {isDirty && <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">Có thay đổi</span>}
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 text-base" 
                  asChild
                >
                  <Link href="/dashboard/products">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Hủy bỏ
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
