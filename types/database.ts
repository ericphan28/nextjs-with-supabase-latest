export interface Product {
  id: string;
  name: string;
  sku?: string;
  category: string;
  price: number;
  cost_price?: number;
  stock_quantity: number;
  min_stock_level: number;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  customer_type: 'individual' | 'business';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}