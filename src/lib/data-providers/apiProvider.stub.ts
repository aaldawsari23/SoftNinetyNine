/**
 * API Provider Stub
 *
 * طبقة مزود بيانات جاهزة للربط لاحقاً مع باك-إند حقيقي
 * حالياً ترجع أخطاء منظمة لإبقاء الواجهة متسقة.
 */

import { DataProvider } from './types';
import { apiClient } from '../apiClient';

function notImplemented(method: string): never {
  throw new Error(`API provider method ${method} is not implemented yet`);
}

export const apiProvider: DataProvider = {
  async getProducts() {
    return apiClient.getProducts();
  },
  async getProductById(id) {
    return apiClient.getProduct(id);
  },
  async createProduct() {
    return notImplemented('createProduct');
  },
  async updateProduct() {
    return notImplemented('updateProduct');
  },
  async deleteProduct() {
    return notImplemented('deleteProduct');
  },
  async getCategories() {
    return apiClient.getCategories();
  },
  async getCategoryById() {
    return notImplemented('getCategoryById');
  },
  async createCategory() {
    return notImplemented('createCategory');
  },
  async updateCategory() {
    return notImplemented('updateCategory');
  },
  async deleteCategory() {
    return notImplemented('deleteCategory');
  },
  async getBrands() {
    return apiClient.getBrands();
  },
  async getBrandById() {
    return notImplemented('getBrandById');
  },
  async createBrand() {
    return notImplemented('createBrand');
  },
  async updateBrand() {
    return notImplemented('updateBrand');
  },
  async deleteBrand() {
    return notImplemented('deleteBrand');
  },
};
