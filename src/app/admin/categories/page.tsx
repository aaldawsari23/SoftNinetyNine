'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDataProvider } from '@/lib/data-providers';
import { Category } from '@/types';

export default function CategoriesPage() {
  const dataProvider = getDataProvider();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تحميل الفئات
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await dataProvider.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading categories', err);
        setError('حدث خطأ أثناء تحميل الفئات');
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, [dataProvider]);

  // حذف فئة
  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الفئة؟')) return;

    try {
      await dataProvider.deleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      console.error('Error deleting category', err);
      alert('حدث خطأ أثناء حذف الفئة');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="text-text-secondary">جاري تحميل الفئات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-4">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">الفئات</h1>
          <p className="text-sm md:text-base text-text-secondary mt-1">
            إدارة فئات المنتجات
          </p>
        </div>
        <Link href="/admin/categories/new" className="btn-primary">
          + إضافة فئة
        </Link>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-text-muted mb-4">لا توجد فئات حالياً</p>
          <Link href="/admin/categories/new" className="btn-primary inline-block">
            إضافة أول فئة
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="card p-4 hover:border-primary/30 transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {category.icon && (
                    <span className="text-3xl">{category.icon}</span>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.name_ar}
                    </h3>
                    {category.name_en && (
                      <p className="text-xs text-text-muted">{category.name_en}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Type Badge */}
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
                  {category.type === 'part' && 'قطع غيار'}
                  {category.type === 'bike' && 'دراجات نارية'}
                  {category.type === 'gear' && 'معدات'}
                </span>
              </div>

              {/* Description */}
              {category.description && (
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {category.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-white/5">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="flex-1 text-center py-2 px-3 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 text-center py-2 px-3 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {categories.length > 0 && (
        <div className="card p-4">
          <p className="text-sm text-text-muted">
            إجمالي الفئات: <span className="text-white font-semibold">{categories.length}</span>
          </p>
        </div>
      )}
    </div>
  );
}
