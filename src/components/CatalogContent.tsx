'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import { products, categories, brands } from '@/data/mockData';
import { ProductType, StockStatus } from '@/types';

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as ProductType | null;
  const conditionParam = searchParams.get('condition');
  const categoryParam = searchParams.get('category');

  const [selectedType, setSelectedType] = useState<ProductType | 'all'>(typeParam || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState<StockStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'name'>('newest');
  const [selectedCondition, setSelectedCondition] = useState<'all' | 'new' | 'used'>(
    conditionParam === 'new' || conditionParam === 'used' ? (conditionParam as any) : 'all',
  );
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.status === 'published');

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (selectedCondition === 'new') {
      filtered = filtered.filter(p => p.is_new);
    } else if (selectedCondition === 'used') {
      filtered = filtered.filter(p => !p.is_new);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand_id === selectedBrand);
    }

    if (selectedStockStatus !== 'all') {
      filtered = filtered.filter(p => p.stock_status === selectedStockStatus);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name_ar.toLowerCase().includes(query) ||
        p.name_en?.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
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
        filtered.sort((a, b) => a.name_ar.localeCompare(b.name_ar, 'ar'));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return filtered;
  }, [selectedType, selectedCategory, selectedBrand, selectedStockStatus, searchQuery, sortBy, selectedCondition]);

  const filteredCategories = useMemo(() => {
    if (selectedType === 'all') return categories;
    return categories.filter(c => c.type === selectedType);
  }, [selectedType]);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="glass p-4 md:p-6 rounded-2xl animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏍️</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">
                <span className="text-primary text-2xl">{filteredProducts.length}</span> منتج
              </p>
              <p className="text-text-muted text-xs">من أصل {products.filter(p => p.status === 'published').length}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-[300px]">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-10 text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field text-sm min-w-[150px]"
            >
              <option value="newest">الأحدث</option>
              <option value="price-asc">السعر: الأقل</option>
              <option value="price-desc">السعر: الأعلى</option>
              <option value="name">الاسم</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                showFilters
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-background-card border-2 border-border-light text-white hover:border-primary hover:bg-primary/10'
              }`}
            >
              {showFilters ? '✕ إغلاق' : '⚙️ فلاتر'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 animate-slide-up">
        <div className="flex flex-wrap gap-3">
          <span className="text-text-muted text-sm font-semibold">النوع:</span>
          {([
            { key: 'all', label: 'الكل', icon: '🔍', color: 'from-gray-500 to-gray-600' },
            { key: 'bike', label: 'دراجات', icon: '🏍️', color: 'from-primary to-primary-hover' },
            { key: 'part', label: 'قطع غيار', icon: '⚙️', color: 'from-secondary to-secondary-hover' },
            { key: 'gear', label: 'إكسسوارات', icon: '🪖', color: 'from-accent to-yellow-600' },
          ] as { key: ProductType | 'all'; label: string; icon: string; color: string }[]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setSelectedType(opt.key as any);
                setSelectedCategory('all');
              }}
              className={`filter-chip ${
                selectedType === opt.key
                  ? `filter-chip-active bg-gradient-to-r ${opt.color}`
                  : 'filter-chip-inactive'
              }`}
            >
              <span className="mr-1">{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="text-text-muted text-sm font-semibold">الحالة:</span>
          {([
            { key: 'all', label: 'الكل' },
            { key: 'new', label: '✨ جديد' },
            { key: 'used', label: '🔧 مستعمل' },
          ] as { key: 'all' | 'new' | 'used'; label: string }[]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelectedCondition(opt.key)}
              className={`filter-chip ${
                selectedCondition === opt.key
                  ? 'filter-chip-active'
                  : 'filter-chip-inactive'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {selectedType !== 'all' && filteredCategories.length > 0 && (
          <div className="flex flex-wrap gap-3">
            <span className="text-text-muted text-sm font-semibold">الفئة:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`filter-chip ${
                selectedCategory === 'all'
                  ? 'filter-chip-active'
                  : 'filter-chip-inactive'
              }`}
            >
              كل الفئات
            </button>
            {filteredCategories.slice(0, 8).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-chip ${
                  selectedCategory === category.id
                    ? 'filter-chip-active'
                    : 'filter-chip-inactive'
                }`}
              >
                {category.icon} {category.name_ar}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {showFilters && (
          <aside className="lg:col-span-1 animate-slide-up">
            <div className="glass p-6 rounded-2xl sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                فلاتر متقدمة
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-text-secondary mb-3">
                  🏷️ الماركة
                </label>
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

              <div className="mb-6">
                <label className="block text-sm font-semibold text-text-secondary mb-3">
                  📦 حالة التوفر
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'الكل' },
                    { value: 'available', label: '✅ متوفر', color: 'text-success' },
                    { value: 'unavailable', label: '❌ غير متوفر', color: 'text-danger' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="stockStatus"
                        value={option.value}
                        checked={selectedStockStatus === option.value}
                        onChange={(e) => setSelectedStockStatus(e.target.value as StockStatus | 'all')}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className={`${option.color || 'text-white'} font-medium`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSelectedStockStatus('all');
                  setSearchQuery('');
                  setSelectedCondition('all');
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-danger to-danger/80 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-danger/30 transition-all duration-300 hover:scale-105"
              >
                ↺ إعادة تعيين
              </button>

              {(selectedType !== 'all' || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedStockStatus !== 'all' || selectedCondition !== 'all') && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
                  <p className="text-xs text-primary font-semibold">
                    فلاتر نشطة: {
                      [selectedType !== 'all', selectedCategory !== 'all', selectedBrand !== 'all', selectedStockStatus !== 'all', selectedCondition !== 'all']
                        .filter(Boolean).length
                    }
                  </p>
                </div>
              )}
            </div>
          </aside>
        )}

        <div className={showFilters ? 'lg:col-span-4' : 'lg:col-span-5'}>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
