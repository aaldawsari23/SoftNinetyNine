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
      {/* Modern Filter Bar */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background/50 text-white px-4 py-2.5 pr-10 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {/* Category Filter */}
            {availableCategories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-background/50 text-white px-4 py-2.5 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
              >
                <option value="all">كل الفئات</option>
                {availableCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                ))}
              </select>
            )}

            {/* Brand Filter */}
            {availableBrands.length > 1 && (
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-background/50 text-white px-4 py-2.5 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
              >
                <option value="all">كل العلامات</option>
                {availableBrands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-sm text-text-muted">
            عرض <span className="text-primary font-bold">{filteredProducts.length}</span> منتج
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
