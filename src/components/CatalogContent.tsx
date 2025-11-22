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

  const [showSubcategories, setShowSubcategories] = useState(false);

  return (
    <div className="space-y-4">
      {/* Ultra Compact Filter Bar */}
      <div className="glass rounded-lg p-2 sticky top-16 z-40">
        {/* Search + Main Categories in one row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-8 text-xs h-8"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-sm">🔍</span>
          </div>

          {/* Main Type Icons - Very Small */}
          <div className="flex gap-1">
            {[
              { key: 'all', icon: '📋' },
              { key: 'bike', icon: '🏍️' },
              { key: 'part', icon: '⚙️' },
              { key: 'gear', icon: '🪖' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setSelectedType(opt.key as any);
                  setSelectedCategory('all');
                  setShowSubcategories(opt.key !== 'all');
                }}
                className={`w-8 h-8 rounded-lg text-base transition-all ${
                  selectedType === opt.key
                    ? 'bg-primary shadow-lg'
                    : 'bg-background-card hover:bg-background-hover'
                }`}
                title={opt.key === 'all' ? 'الكل' : opt.key === 'bike' ? 'دراجات' : opt.key === 'part' ? 'قطع' : 'إكسسوارات'}
              >
                {opt.icon}
              </button>
            ))}
          </div>

          <span className="text-xs text-text-muted whitespace-nowrap">
            <span className="text-primary font-bold">{filteredProducts.length}</span>
          </span>
        </div>

        {/* Condition Filters - Bikes Only */}
        {selectedType === 'bike' && (
          <div className="flex gap-1 mb-2">
            {[
              { key: 'all', label: 'الكل', icon: '📋' },
              { key: 'new', label: 'جديد', icon: '✨' },
              { key: 'used', label: 'مستعمل', icon: '🔧' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedCondition(opt.key as any)}
                className={`px-2 py-1 rounded text-[10px] transition-all ${
                  selectedCondition === opt.key
                    ? 'bg-secondary text-white'
                    : 'bg-background-card text-text-secondary hover:bg-background-hover'
                }`}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Collapsible Subcategories */}
        {selectedType !== 'all' && filteredCategories.length > 0 && showSubcategories && (
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2 py-0.5 rounded text-[9px] transition-all ${
                selectedCategory === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-background-card text-text-secondary'
              }`}
            >
              الكل
            </button>
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-2 py-0.5 rounded text-[9px] transition-all ${
                  selectedCategory === category.id
                    ? 'bg-accent text-white'
                    : 'bg-background-card text-text-secondary'
                }`}
              >
                {category.icon} {category.name_ar}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
