'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import { products, categories, brands } from '@/data/realData';
import { ProductType, StockStatus } from '@/types';

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as ProductType | null;
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
    let filtered = [...products];

    if (selectedStockStatus === 'unavailable') {
      filtered = filtered.filter(p => !p.is_available);
    } else {
      filtered = filtered.filter(p => p.is_available);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand_id === selectedBrand);
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
    <div className="space-y-6">
      {/* Top bar: results count and sort */}
      <div className="card flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-text-secondary text-xs md:text-sm">عدد المنتجات المتاحة الآن</p>
          <p className="text-3xl md:text-4xl font-black text-white">{filteredProducts.length}</p>
          <p className="text-text-muted text-xs md:text-sm">يمكنك البحث أو استخدام الفلاتر للوصول لأسرع نتيجة.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <label className="sr-only" htmlFor="catalog-search">
            البحث في المنتجات
          </label>
          <div className="flex-1">
            <input
              id="catalog-search"
              type="search"
              placeholder="ابحث عن منتج أو كود..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <label className="text-text-secondary whitespace-nowrap">ترتيب حسب</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field text-xs md:text-sm py-2 px-3"
            >
              <option value="newest">الأحدث</option>
              <option value="price-asc">السعر: الأقل أولاً</option>
              <option value="price-desc">السعر: الأعلى أولاً</option>
              <option value="name">الاسم</option>
            </select>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary text-xs md:text-sm py-2 px-4"
            aria-expanded={showFilters}
            aria-controls="advanced-filters"
          >
            {showFilters ? 'إخفاء الفلاتر' : 'فلاتر متقدمة'}
          </button>
        </div>
      </div>

      {/* Quick filter chips */}
      <div className="card space-y-3">
        <p className="text-text-secondary text-xs md:text-sm">فلترة سريعة حسب نوع المنتج</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
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
              className={`flex-shrink-0 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-all duration-200 ${
                selectedType === opt.key
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/30'
                  : 'border-gray-700 text-text-secondary hover:bg-primary/20 hover:border-primary/50'
              }`}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>

        {selectedType !== 'all' && filteredCategories.length > 0 && (
          <div className="pt-3 border-t border-gray-800 space-y-2">
            <p className="text-text-secondary text-xs">تحديد الفئة أدق</p>
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
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-4">
        {/* Filters Sidebar - displayed conditionally */}
        {showFilters && (
          <aside id="advanced-filters" className="space-y-5 lg:col-span-1">
            <div className="card lg:sticky lg:top-24 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span>⚙️</span>
                  <span>فلاتر متقدمة</span>
                </h2>
                <button
                  className="text-text-secondary text-xs hover:text-primary"
                  onClick={() => setShowFilters(false)}
                >
                  إغلاق
                </button>
              </div>

              {/* Brand Filter */}
              <div>
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
              <div>
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

              <div>
                <label className="block text-xs md:text-sm text-text-secondary mb-2 font-semibold">📁 الفئة</label>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-right text-xs md:text-sm px-3 py-2 rounded-lg border transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary/20 border-primary text-white'
                        : 'border-gray-800 text-text-secondary hover:border-primary/40'
                    }`}
                  >
                    كل الفئات
                  </button>
                  {filteredCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-right text-xs md:text-sm px-3 py-2 rounded-lg border transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary/20 border-primary text-white'
                          : 'border-gray-800 text-text-secondary hover:border-primary/40'
                      }`}
                    >
                      {category.name_ar}
                    </button>
                  ))}
                </div>
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
