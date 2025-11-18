'use client';

import { categories, products } from '@/data/realData';

export default function AdminCategoriesPage() {
  const getCategoryProductCount = (categoryId: string) => {
    return products.filter(p => p.category_id === categoryId).length;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">إدارة الفئات</h1>
          <p className="text-text-secondary">عرض وإدارة جميع الفئات</p>
        </div>
        <button className="btn-primary">
          ➕ إضافة فئة جديدة
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const productCount = getCategoryProductCount(category.id);
          return (
            <div key={category.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{category.icon || '📁'}</div>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  category.type === 'bike' ? 'bg-blue-500/20 text-blue-500' :
                  category.type === 'part' ? 'bg-green-500/20 text-green-500' :
                  'bg-purple-500/20 text-purple-500'
                }`}>
                  {category.type === 'bike' ? 'دراجات' : category.type === 'part' ? 'قطع' : 'إكسسوارات'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{category.name_ar}</h3>
              {category.name_en && (
                <p className="text-sm text-text-secondary mb-3">{category.name_en}</p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <span className="text-sm text-text-secondary">
                  {productCount} منتج
                </span>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-400 text-sm">تعديل</button>
                  <button className="text-red-500 hover:text-red-400 text-sm">حذف</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
