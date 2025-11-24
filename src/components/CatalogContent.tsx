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
      {/* Compact Filter Bar */}
      <div className="glass rounded-lg p-3 sticky top-14 z-40">
        {/* Search */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full pl-8 text-sm h-9"
          />
          <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Filter */}
        {availableCategories.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-text-muted">الفئة:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field text-xs h-7 px-2"
            >
              <option value="all">الكل</option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
              ))}
            </select>
          </div>
        )}

        {/* Brand Filter */}
        {availableBrands.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">العلامة:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="input-field text-xs h-7 px-2"
            >
              <option value="all">الكل</option>
              {availableBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-2 pt-2 border-t border-border-light">
          <p className="text-xs text-text-muted">
            <span className="text-primary font-bold">{filteredProducts.length}</span> منتج
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
