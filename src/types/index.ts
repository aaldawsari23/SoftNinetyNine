// Product Types
export type ProductType = 'bike' | 'part' | 'gear';
export type StockStatus = 'available' | 'unavailable';
export type ProductStatus = 'published' | 'hidden';

export interface Product {
  id: string;
  sku?: string;
  name?: string; // For compatibility with realData.ts
  name_ar?: string;
  name_en?: string;
  category_id: string;
  brand_id?: string;
  type: ProductType;
  price: number;
  currency: string;
  is_new?: boolean;
  is_featured?: boolean; // For compatibility with realData.ts
  is_available?: boolean; // For compatibility with realData.ts
  stock_status?: StockStatus;
  stock_quantity?: number; // For compatibility with realData.ts
  status?: ProductStatus;
  specs?: Record<string, string>;
  specifications?: Record<string, string>; // For compatibility with realData.ts
  description: string;
  images?: string[];
  image_url?: string; // For compatibility with realData.ts
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
