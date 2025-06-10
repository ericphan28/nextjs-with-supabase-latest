import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc").max(255, "Tên sản phẩm quá dài"),
  sku: z.string().optional(),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  description: z.string().optional(),
  price: z.number().min(0, "Giá phải lớn hơn 0"),
  cost_price: z.number().min(0, "Giá vốn phải lớn hơn 0").optional(),
  stock_quantity: z.number().int().min(0, "Số lượng phải là số nguyên dương"),
  min_stock_level: z.number().int().min(0, "Mức tồn kho tối thiểu phải là số nguyên dương"),
  is_active: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;