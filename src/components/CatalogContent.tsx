'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import { products, categories, brands } from '@/data/realData';
import { ProductType, StockStatus } from '@/types';

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as ProductType | null;
  const conditionParam = searchParams.get('condition');
  const categoryParam = searchParams.get('category');

  // Filters state
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>(typeParam || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState<StockStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'name'>('newest');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter and sort products with optimizations
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.is_available);

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand_id === selectedBrand);
    }

    if (selectedStockStatus !== 'all') {
      filtered = filtered.filter(p => p.is_available);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.name_en?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.sku?.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ar'));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return filtered;
  }, [selectedType, selectedCategory, selectedBrand, selectedStockStatus, searchQuery, sortBy]);

  const filteredCategories = useMemo(() => {
    if (selectedType === 'all') return categories;
    return categories.filter(c => c.type === selectedType);
  }, [selectedType]);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top bar: results count and sort */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-4 border-b border-gray-800">
        <p className="text-text-secondary text-sm md:text-base">
          <span className="text-primary font-bold">{filteredProducts.length}</span> منتج
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {/* Sorting select */}
          <div className="flex items-center gap-2">
            <label className="text-xs md:text-sm text-text-secondary">الترتيب:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field text-xs md:text-sm py-1.5 md:py-2 px-3"
            >
              <option value="newest">الأحدث</option>
              <option value="price-asc">السعر: الأقل أولاً</option>
              <option value="price-desc">السعر: الأعلى أولاً</option>
              <option value="name">الاسم</option>
            </select>
          </div>
          {/* Advanced filter toggle button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4"
          >
            {showFilters ? '✕ إغلاق الفلاتر' : '⚙️ فلاتر متقدمة'}
          </button>
        </div>
      </div>

      {/* Quick filter chips - simplified single row */}
      <div className="space-y-3">
        {/* Type chips */}
        <div className="flex flex-wrap gap-2">
          {([
            { key: 'all', label: 'الكل', icon: '🔍' },
            { key: 'bike', label: 'دراجات', icon: '🏍️' },
            { key: 'part', label: 'قطع غيار', icon: '⚙️' },
            { key: 'gear', label: 'ملابس وحماية', icon: '🧥' },
          ] as { key: ProductType | 'all'; label: string; icon: string }[]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setSelectedType(opt.key as any);
                setSelectedCategory('all');
              }}
              className={`text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-all duration-200 ${
                selectedType === opt.key
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/30'
                  : 'border-gray-700 text-text-secondary hover:bg-primary/20 hover:border-primary/50'
              }`}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>

        {/* Category chips - only show if type is selected */}
        {selectedType !== 'all' && filteredCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/30'
                  : 'border-gray-700 text-text-secondary hover:bg-primary/20 hover:border-primary/50'
              }`}
            >
              كل الفئات
            </button>
            {filteredCategories.slice(0, 8).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/30'
                    : 'border-gray-700 text-text-secondary hover:bg-primary/20 hover:border-primary/50'
                }`}
              >
                {category.name_ar}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
        {/* Filters Sidebar - displayed conditionally */}
        {showFilters && (
          <aside className="lg:col-span-1">
            <div className="card sticky top-20">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>⚙️</span>
                <span>فلاتر متقدمة</span>
              </h2>

              {/* Search */}
              <div className="mb-5">
                <label className="block text-xs md:text-sm text-text-secondary mb-2 font-semibold">🔍 البحث</label>
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field w-full text-sm"
                />
              </div>

              {/* Brand Filter */}
              <div className="mb-5">
                <label className="block text-xs md:text-sm text-text-secondary mb-2 font-semibold">🏷️ الماركة</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="input-field w-full text-sm"
                >
                  <option value="all">كل الماركات</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock Status Filter */}
              <div className="mb-5">
                <label className="block text-xs md:text-sm text-text-secondary mb-2 font-semibold">📦 حالة التوفر</label>
                <select
                  value={selectedStockStatus}
                  onChange={(e) => setSelectedStockStatus(e.target.value as StockStatus | 'all')}
                  className="input-field w-full text-sm"
                >
                  <option value="all">الكل</option>
                  <option value="available">متوفر</option>
                  <option value="unavailable">غير متوفر</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSelectedStockStatus('all');
                  setSearchQuery('');
                }}
                className="btn-secondary w-full text-sm"
              >
                ↺ إعادة تعيين الكل
              </button>
            </div>
          </aside>
        )}

        {/* Products Column */}
        <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
