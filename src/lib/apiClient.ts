/**
 * API Client (Placeholder)
 *
 * جاهز للاتصال بباك-إند حقيقي مستقبلاً بدون تفعيل حالي
 */

import { Product, Category, Brand } from '@/types';

interface ApiClientConfig {
  baseUrl?: string;
  apiKey?: string;
}

const defaultConfig: ApiClientConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  apiKey: process.env.API_SECRET_KEY,
};

function getHeaders() {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (defaultConfig.apiKey) {
    headers['Authorization'] = `Bearer ${defaultConfig.apiKey}`;
  }

  return headers;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${defaultConfig.baseUrl || ''}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
    // TODO: أضف إعادة محاولة/تدوير مفاتيح إذا لزم الأمر
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * دوال جاهزة للاستبدال عند ربط الباك-إند
 * حاليا: ترجع خطأ لأنها غير مفعلة
 */
export const apiClient = {
  async getProducts(): Promise<Product[]> {
    return request<Product[]>('/products');
  },
  async getProduct(id: string): Promise<Product> {
    return request<Product>(`/products/${id}`);
  },
  async getCategories(): Promise<Category[]> {
    return request<Category[]>('/categories');
  },
  async getBrands(): Promise<Brand[]> {
    return request<Brand[]>('/brands');
  },
};

export type ApiClient = typeof apiClient;
