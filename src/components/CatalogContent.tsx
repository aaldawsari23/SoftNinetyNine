'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import { products, categories } from '@/data/mockData';
import { ProductType } from '@/types';

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as ProductType | null;
  const conditionParam = searchParams.get('condition');
  const categoryParam = searchParams.get('category');

  const [selectedType, setSelectedType] = useState<ProductType | 'all'>(typeParam || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedCondition, setSelectedCondition] = useState<'all' | 'new' | 'used'>(
    conditionParam === 'new' || conditionParam === 'used' ? (conditionParam as any) : 'all',
  );
  const [searchQuery, setSearchQuery] = useState('');

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

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name_ar?.toLowerCase().includes(query) ||
        p.name?.toLowerCase().includes(query) ||
        p.name_en?.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [selectedType, selectedCategory, searchQuery, selectedCondition]);

  const filteredCategories = useMemo(() => {
    if (selectedType === 'all') return categories;
    return categories.filter(c => c.type === selectedType);
  }, [selectedType]);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Compact Filter Bar - Fixed and Small */}
      <div className="glass rounded-xl p-3 md:p-4 sticky top-16 md:top-18 z-40">
        {/* Search + Count */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10 text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
          </div>
          <div className="text-left">
            <p className="text-xs md:text-sm text-text-muted">
              <span className="text-primary font-bold text-base md:text-lg">{filteredProducts.length}</span> منتج
            </p>
          </div>
        </div>

        {/* Main Type Filters */}
        <div className="flex flex-wrap gap-2 mb-2">
          {[
            { key: 'all', label: 'الكل', icon: '🔍' },
            { key: 'bike', label: 'دراجات', icon: '🏍️' },
            { key: 'part', label: 'قطع غيار', icon: '⚙️' },
            { key: 'gear', label: 'إكسسوارات', icon: '🪖' },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setSelectedType(opt.key as any);
                setSelectedCategory('all');
              }}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ${
                selectedType === opt.key
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-background-card text-text-secondary hover:bg-background-hover hover:text-white'
              }`}
            >
              <span className="mr-1">{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Condition Filters - Only show for bikes */}
        {selectedType === 'bike' && (
          <div className="flex flex-wrap gap-2 mb-2 pt-2 border-t border-border-light">
            <span className="text-text-muted text-xs md:text-sm self-center">الحالة:</span>
            {[
              { key: 'all', label: 'الكل' },
              { key: 'new', label: 'جديد ✨' },
              { key: 'used', label: 'مستعمل 🔧' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedCondition(opt.key as any)}
                className={`px-3 py-1 md:px-4 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                  selectedCondition === opt.key
                    ? 'bg-secondary text-white'
                    : 'bg-background-card text-text-secondary hover:bg-background-hover hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Categories - Compact Chips */}
        {selectedType !== 'all' && filteredCategories.length > 0 && (
          <div className="pt-2 border-t border-border-light">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2 py-1 rounded-md text-[10px] md:text-xs font-medium transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-accent text-white'
                    : 'bg-background-card text-text-secondary hover:bg-background-hover'
                }`}
              >
                كل الفئات
              </button>
              {filteredCategories.slice(0, 10).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-2 py-1 rounded-md text-[10px] md:text-xs font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-accent text-white'
                      : 'bg-background-card text-text-secondary hover:bg-background-hover'
                  }`}
                >
                  {category.icon} {category.name_ar}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
