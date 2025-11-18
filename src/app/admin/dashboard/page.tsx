'use client';

import { products, categories, brands } from '@/data/realData';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = {
    totalProducts: products.length,
    publishedProducts: products.filter(p => p.is_available).length,
    hiddenProducts: products.filter(p => !p.is_available).length,
    totalCategories: categories.length,
    totalBrands: brands.length,
  };

  const recentProducts = products.slice(0, 5);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم</h1>
        <p className="text-text-secondary">مرحباً بك في لوحة إدارة متجر Soft99bike</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="card">
          <div className="text-primary text-2xl mb-2">📦</div>
          <div className="text-3xl font-bold text-white mb-1">{stats.totalProducts}</div>
          <div className="text-sm text-text-secondary">إجمالي المنتجات</div>
        </div>

        <div className="card">
          <div className="text-green-500 text-2xl mb-2">✅</div>
          <div className="text-3xl font-bold text-white mb-1">{stats.publishedProducts}</div>
          <div className="text-sm text-text-secondary">منتجات منشورة</div>
        </div>

        <div className="card">
          <div className="text-yellow-500 text-2xl mb-2">👁️</div>
          <div className="text-3xl font-bold text-white mb-1">{stats.hiddenProducts}</div>
          <div className="text-sm text-text-secondary">منتجات مخفية</div>
        </div>

        <div className="card">
          <div className="text-blue-500 text-2xl mb-2">📁</div>
          <div className="text-3xl font-bold text-white mb-1">{stats.totalCategories}</div>
          <div className="text-sm text-text-secondary">الفئات</div>
        </div>

        <div className="card">
          <div className="text-purple-500 text-2xl mb-2">🏷️</div>
          <div className="text-3xl font-bold text-white mb-1">{stats.totalBrands}</div>
          <div className="text-sm text-text-secondary">الماركات</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-bold text-white mb-4">إجراءات سريعة</h2>
          <div className="space-y-3">
            <Link href="/admin/products?action=new" className="btn-primary w-full flex items-center justify-center gap-2">
              <span>➕</span>
              <span>إضافة منتج جديد</span>
            </Link>
            <Link href="/admin/categories" className="btn-secondary w-full flex items-center justify-center gap-2">
              <span>📁</span>
              <span>إدارة الفئات</span>
            </Link>
            <Link href="/admin/brands" className="btn-secondary w-full flex items-center justify-center gap-2">
              <span>🏷️</span>
              <span>إدارة الماركات</span>
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">أحدث المنتجات</h2>
            <Link href="/admin/products" className="text-primary text-sm hover:text-primary-hover">
              عرض الكل
            </Link>
          </div>
          <div className="space-y-3">
            {recentProducts.map(product => (
              <div key={product.id} className="flex items-center gap-3 p-3 bg-background rounded-md">
                <div className="w-12 h-12 bg-gray-900 rounded-md flex items-center justify-center">
                  {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name_ar} className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <span>🏍️</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">{product.name_ar}</div>
                  <div className="text-sm text-text-secondary">{product.price} {product.currency}</div>
                </div>
                <div>
                  {product.status === 'published' ? (
                    <span className="text-green-500 text-xs">منشور</span>
                  ) : (
                    <span className="text-gray-500 text-xs">مخفي</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
