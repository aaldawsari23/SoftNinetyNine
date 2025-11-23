'use client';

import { brands, products } from '@/data/products';

export default function AdminBrandsPage() {
  const getBrandProductCount = (brandId: string) => {
    return products.filter(p => p.brand_id === brandId).length;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">إدارة الماركات</h1>
          <p className="text-text-secondary">عرض وإدارة جميع الماركات</p>
        </div>
        <button className="btn-primary">
          ➕ إضافة ماركة جديدة
        </button>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {brands.map((brand) => {
          const productCount = getBrandProductCount(brand.id);
          return (
            <div key={brand.id} className="card text-center">
              <div className="w-20 h-20 bg-white rounded-md mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {brand.logo_url ? (
                  <img src={brand.logo_url} alt={brand.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-4xl">🏷️</span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{brand.name}</h3>
              <p className="text-sm text-text-secondary mb-4">{productCount} منتج</p>

              <div className="flex gap-2 justify-center">
                <button className="text-blue-500 hover:text-blue-400 text-sm">تعديل</button>
                <button className="text-red-500 hover:text-red-400 text-sm">حذف</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
