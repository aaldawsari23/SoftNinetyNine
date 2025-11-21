'use client';

import { useState, useMemo } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/mockData';
import { ProductType } from '@/types';

export default function Home() {
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');
  const [selectedCondition, setSelectedCondition] = useState<'all' | 'new' | 'used'>('all');

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

    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [selectedType, selectedCondition]);

  return (
    <div className="min-h-screen bg-background py-4 md:py-6">
      <div className="container mx-auto px-3 md:px-4">
        {/* Compact Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">متجر سوفت تسعة وتسعين</h1>
          <p className="text-text-secondary text-sm md:text-base">دراجات نارية، قطع غيار، وإكسسوارات</p>
        </div>

        {/* Compact Filter Bar - Fixed and Small */}
        <div className="glass rounded-xl p-3 md:p-4 mb-4 md:mb-6 sticky top-16 md:top-18 z-40">
          {/* Main Type Filters */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { key: 'all', label: 'الكل', icon: '🔍' },
              { key: 'bike', label: 'دراجات', icon: '🏍️' },
              { key: 'part', label: 'قطع غيار', icon: '⚙️' },
              { key: 'gear', label: 'إكسسوارات', icon: '🪖' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedType(opt.key as any)}
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
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border-light">
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

          {/* Results Count */}
          <div className="mt-3 pt-2 border-t border-border-light">
            <p className="text-xs md:text-sm text-text-muted">
              <span className="text-primary font-bold text-base md:text-lg">{filteredProducts.length}</span> منتج متوفر
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
