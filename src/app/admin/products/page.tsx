'use client';

import { useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types';
import Link from 'next/link';

const STORAGE_KEY = 'soft99_admin_products';

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'hidden'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load products from localStorage or use initial data
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch {
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (mounted && products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, mounted]);

  const handleDelete = (productId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleToggleStatus = (productId: string) => {
    setProducts(prev => prev.map(p =>
      p.id === productId
        ? { ...p, status: p.status === 'published' ? 'hidden' : 'published' }
        : p
    ));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name_ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.name_en?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!mounted) {
    return <div className="text-white">جاري التحميل...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">إدارة المنتجات</h1>
          <p className="text-text-secondary">عرض وإدارة جميع المنتجات</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          ➕ إضافة منتج جديد
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="البحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="input-field w-full"
            >
              <option value="all">كل الحالات</option>
              <option value="published">منشور</option>
              <option value="hidden">مخفي</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-x-auto">
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
                      href={`/admin/products/${product.id}`}
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
    </div>
  );
}
