'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import { products, categories, brands } from '@/data/products';
import { ProductType } from '@/types';

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.status === 'published');

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand_id === selectedBrand);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [selectedCategory, selectedBrand, searchQuery]);

  const availableCategories = useMemo(() => {
    return categories;
  }, []);

  const availableBrands = useMemo(() => {
    const brandIds = new Set(filteredProducts.map(p => p.brand_id));
    return brands.filter(b => brandIds.has(b.id));
  }, [filteredProducts]);

  return (
    <div className="space-y-4">
      {/* Modern Filter Bar with Chips */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/10">
        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background/50 text-white px-4 py-3 pr-11 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Chips */}
        {availableCategories.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-text-muted font-semibold">الفئات:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                }`}
              >
                الكل
              </button>
              {availableCategories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                  }`}
                >
                  {cat.name_ar}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Brand Chips */}
        {availableBrands.length > 1 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-text-muted font-semibold">العلامات التجارية:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                  selectedBrand === 'all'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                }`}
              >
                الكل
              </button>
              {availableBrands.slice(0, 10).map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                    selectedBrand === brand.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs md:text-sm text-text-muted">
            <span className="text-primary font-bold">{filteredProducts.length}</span> منتج
          </p>
          {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              مسح الفلاتر ✕
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
