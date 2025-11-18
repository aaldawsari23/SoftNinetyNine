// Product Types
export type ProductType = 'bike' | 'part' | 'gear';
// The set of valid stock statuses. Removed the obsolete 'preorder' state since
// the store no longer supports pre‑orders. Products are either available or
// unavailable for purchase.
export type StockStatus = 'available' | 'unavailable';
export type ProductStatus = 'published' | 'hidden';

export interface Product {
  id: string;
  name_ar: string;
  name_en?: string;
  category_id: string;
  brand_id?: string;
  type: ProductType;
  price: number;
  currency: string;
  is_new: boolean;
  stock_status: StockStatus;
  status: ProductStatus;
  specs: Record<string, string>;
  description: string;
  images: string[];
  salla_url?: string;
  created_at: string;
  updated_at: string;
}

// Category Types
export interface Category {
  id: string;
  name_ar: string;
  name_en?: string;
  type: ProductType;
  icon?: string;
  created_at: string;
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  logo_url?: string;
  created_at: string;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  brand?: string;
  type?: ProductType;
  minPrice?: number;
  maxPrice?: number;
  stockStatus?: StockStatus;
  isNew?: boolean;
  search?: string;
}

// Sort Types
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

// Admin User Types
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

// Stats Types
export interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  hiddenProducts: number;
  totalCategories: number;
  totalBrands: number;
}
