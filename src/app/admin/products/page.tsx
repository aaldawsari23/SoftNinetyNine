'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import Link from 'next/link';
import { getDataProvider } from '@/lib/data-providers';
import { filterProducts } from '@/utils/catalog';

export default function AdminProductsPage() {
  const dataProvider = getDataProvider();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'hidden'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from provider
  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        // TODO: استبدل هذه القراءة المباشرة بنداء API حقيقي عند تفعيل مزود api
        const data = await dataProvider.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        const success = await dataProvider.deleteProduct(productId);
        if (success) {
          setProducts(prev => prev.filter(p => p.id !== productId));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('حدث خطأ أثناء حذف المنتج');
      }
    }
  };

  const handleToggleStatus = async (productId: string) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const newStatus = product.status === 'published' ? 'hidden' : 'published';
      const updated = await dataProvider.updateProduct(productId, { status: newStatus });

      setProducts(prev => prev.map(p =>
        p.id === productId ? updated : p
      ));
    } catch (error) {
      console.error('Error updating product status:', error);
      alert('حدث خطأ أثناء تحديث حالة المنتج');
    }
  };

  const filteredProducts = filterProducts(products, {
    search: searchQuery || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-text-muted">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">إدارة المنتجات</h1>
          <p className="text-sm md:text-base text-text-secondary">عرض وإدارة جميع المنتجات</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary w-full sm:w-auto text-center text-sm md:text-base">
          ➕ إضافة منتج جديد
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-4 md:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <input
              type="text"
              placeholder="البحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full text-sm md:text-base"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="input-field w-full text-sm md:text-base"
            >
              <option value="all">كل الحالات</option>
              <option value="published">منشور</option>
              <option value="hidden">مخفي</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card p-3">
            <div className="flex gap-3">
              {/* Image */}
              <div className="w-16 h-16 bg-gray-900 rounded-md overflow-hidden flex-shrink-0">
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name_ar} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🏍️</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{product.name_ar}</h3>
                {product.name_en && (
                  <p className="text-xs text-text-muted truncate">{product.name_en}</p>
                )}

                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-text-secondary">
                    {product.type === 'bike' ? 'دراجة' : product.type === 'part' ? 'قطعة' : 'إكسسوار'}
                  </span>
                  <span className="text-sm font-bold text-white">{product.price} {product.currency}</span>
                </div>

                {/* Status Badge */}
                <div className="mt-2">
                  {product.status === 'published' ? (
                    <span className="bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded-md inline-block">
                      منشور
                    </span>
                  ) : (
                    <span className="bg-gray-500/20 text-gray-500 text-xs px-2 py-0.5 rounded-md inline-block">
                      مخفي
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex-1 text-center bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 py-2 px-3 rounded-lg text-xs font-semibold transition-colors"
              >
                ✏️ تعديل
              </Link>
              <button
                onClick={() => handleToggleStatus(product.id)}
                className="flex-1 bg-primary/20 text-primary hover:bg-primary/30 py-2 px-3 rounded-lg text-xs font-semibold transition-colors"
              >
                {product.status === 'published' ? '👁️ إخفاء' : '👁️‍🗨️ نشر'}
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 py-2 px-3 rounded-lg text-xs font-semibold transition-colors"
              >
                🗑️ حذف
              </button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 card">
            <p className="text-text-secondary text-sm">لا توجد منتجات</p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-right py-3 px-4 text-text-secondary font-semibold">الصورة</th>
              <th className="text-right py-3 px-4 text-text-secondary font-semibold">الاسم</th>
              <th className="text-right py-3 px-4 text-text-secondary font-semibold">النوع</th>
              <th className="text-right py-3 px-4 text-text-secondary font-semibold">السعر</th>
              <th className="text-right py-3 px-4 text-text-secondary font-semibold">الحالة</th>
              <th className="text-right py-3 px-4 text-text-secondary font-semibold">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-800 hover:bg-background-light">
                <td className="py-3 px-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-md overflow-hidden">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.name_ar} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">🏍️</div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-white font-semibold">{product.name_ar}</div>
                  {product.name_en && (
                    <div className="text-text-secondary text-sm">{product.name_en}</div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="text-text-secondary">
                    {product.type === 'bike' ? 'دراجة' : product.type === 'part' ? 'قطعة' : 'إكسسوار'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-white font-semibold">{product.price}</span>
                  <span className="text-text-secondary text-sm mr-1">{product.currency}</span>
                </td>
                <td className="py-3 px-4">
                  {product.status === 'published' ? (
                    <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded-md">
                      منشور
                    </span>
                  ) : (
                    <span className="bg-gray-500/20 text-gray-500 text-xs px-2 py-1 rounded-md">
                      مخفي
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-blue-500 hover:text-blue-400 text-sm transition-colors"
                    >
                      تعديل
                    </Link>
                    <button
                      onClick={() => handleToggleStatus(product.id)}
                      className="text-primary hover:text-primary-hover text-sm transition-colors"
                    >
                      {product.status === 'published' ? 'إخفاء' : 'نشر'}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-400 text-sm transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">لا توجد منتجات</p>
          </div>
        )}
      </div>

      {/* Products Count */}
      <div className="mt-4 text-center md:text-right">
        <p className="text-xs md:text-sm text-text-muted">
          عرض <span className="text-primary font-bold">{filteredProducts.length}</span> منتج
        </p>
      </div>
    </div>
  );
}
