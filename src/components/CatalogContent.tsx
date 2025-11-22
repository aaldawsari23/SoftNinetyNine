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
            <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Main Type Icons - Professional SVG */}
          <div className="flex gap-1">
            {[
              { key: 'all', title: 'الكل', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> },
              { key: 'bike', title: 'دراجات', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 18.89C3.203 18.891 1.667 17.43 1.667 15.629a3.252 3.252 0 0 1 3.25-3.25c.414 0 .81.083 1.17.229L8.5 8.334h-2v-1.5h3.25a1 1 0 0 1 .894.553l1.25 2.5h3.273l-1.255-4.5h-1.745v-1.5h2.416c.416 0 .785.26.922.65l1.796 6.429c.361-.146.757-.229 1.171-.229a3.252 3.252 0 0 1 3.25 3.25c0 1.8-1.536 3.262-3.333 3.262-1.797 0-3.333-1.462-3.333-3.262 0-.87.347-1.659.91-2.24l-1.913-6.85L12 9.834l-1.586 3.173a3.232 3.232 0 0 1 .919 2.242c0 1.8-1.536 3.262-3.333 3.262zM5 10.139c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75zm13.583 0c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75z"/></svg> },
              { key: 'part', title: 'قطع', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
              { key: 'gear', title: 'ملابس', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setSelectedType(opt.key as any);
                  setSelectedCategory('all');
                  setShowSubcategories(opt.key !== 'all');
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  selectedType === opt.key
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-background-card text-text-secondary hover:bg-background-hover hover:text-white'
                }`}
                title={opt.title}
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
              { key: 'all', label: 'الكل' },
              { key: 'new', label: 'جديد' },
              { key: 'used', label: 'مستعمل' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedCondition(opt.key as any)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
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
