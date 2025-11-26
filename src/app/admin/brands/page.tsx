'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDataProvider } from '@/lib/data-providers';
import { Brand } from '@/types';

export default function BrandsPage() {
  const dataProvider = getDataProvider();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تحميل العلامات التجارية
  useEffect(() => {
    async function loadBrands() {
      try {
        const data = await dataProvider.getBrands();
        setBrands(data);
      } catch (err) {
        console.error('Error loading brands', err);
        setError('حدث خطأ أثناء تحميل العلامات التجارية');
      } finally {
        setIsLoading(false);
      }
    }
    loadBrands();
  }, [dataProvider]);

  // حذف علامة تجارية
  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه العلامة التجارية؟')) return;

    try {
      await dataProvider.deleteBrand(id);
      setBrands(brands.filter(brand => brand.id !== id));
    } catch (err) {
      console.error('Error deleting brand', err);
      alert('حدث خطأ أثناء حذف العلامة التجارية');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="text-text-secondary">جاري تحميل العلامات التجارية...</p>
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
          <h1 className="text-2xl md:text-3xl font-bold text-white">العلامات التجارية</h1>
          <p className="text-sm md:text-base text-text-secondary mt-1">
            إدارة العلامات التجارية للمنتجات
          </p>
        </div>
        <Link href="/admin/brands/new" className="btn-primary">
          + إضافة علامة
        </Link>
      </div>

      {/* Brands Grid */}
      {brands.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-text-muted mb-4">لا توجد علامات تجارية حالياً</p>
          <Link href="/admin/brands/new" className="btn-primary inline-block">
            إضافة أول علامة تجارية
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <div key={brand.id} className="card p-4 hover:border-primary/30 transition-colors text-center">
              {/* Logo */}
              <div className="w-20 h-20 bg-white/5 rounded-lg mx-auto mb-4 flex items-center justify-center overflow-hidden border border-white/10">
                {brand.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.logo_url}
                    alt={brand.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="%23333" width="80" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23666" font-size="40">🏷️</text></svg>';
                    }}
                  />
                ) : (
                  <span className="text-3xl">🏷️</span>
                )}
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-white mb-1">
                {brand.name_ar || brand.name}
              </h3>
              {(brand.name_ar && brand.name !== brand.name_ar) && (
                <p className="text-xs text-text-muted mb-3">{brand.name}</p>
              )}

              {/* Description */}
              {brand.description && (
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {brand.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-white/5">
                <Link
                  href={`/admin/brands/${brand.id}/edit`}
                  className="flex-1 text-center py-2 px-3 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => handleDelete(brand.id)}
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
      {brands.length > 0 && (
        <div className="card p-4">
          <p className="text-sm text-text-muted">
            إجمالي العلامات التجارية: <span className="text-white font-semibold">{brands.length}</span>
          </p>
        </div>
      )}
    </div>
  );
}
