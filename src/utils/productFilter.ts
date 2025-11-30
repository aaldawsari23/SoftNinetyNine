import { Product } from '@/types';
import hiddenProductsData from '@/../public/data/hidden-products.json';

/**
 * تصفية المنتجات لإخفاء المنتجات ذات الصور الضعيفة
 */
export function filterVisibleProducts(products: Product[]): Product[] {
  const hiddenIds = new Set(hiddenProductsData.hiddenProductIds);

  return products.filter(product => {
    // إخفاء المنتجات المدرجة في القائمة
    if (hiddenIds.has(product.id) || hiddenIds.has(product.sku)) {
      return false;
    }

    // إخفاء المنتجات غير المتوفرة
    if (product.is_available === false) {
      return false;
    }

    return true;
  });
}

/**
 * ترتيب المنتجات حسب الأولوية
 * - المنتجات المميزة أولاً
 * - ثم حسب التاريخ
 */
export function sortProductsByPriority(products: Product[]): Product[] {
  return products.sort((a, b) => {
    // المنتجات المميزة أولاً
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;

    // ثم حسب التاريخ (الأحدث أولاً)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}
