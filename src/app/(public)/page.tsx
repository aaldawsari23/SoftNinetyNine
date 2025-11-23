'use client';

import { useMemo } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';

export default function Home() {
  const publishedProducts = useMemo(() =>
    products
      .filter(p => p.status === 'published')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    []
  );

  return (
    <div className="min-h-screen bg-background py-4">
      <div className="container mx-auto px-3">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white">سوفت 99</h1>
          <p className="text-text-secondary text-sm">دراجات، قطع غيار، إكسسوارات</p>
        </div>

        <div className="mb-4">
          <p className="text-text-muted text-sm">
            <span className="text-primary font-bold text-lg">{publishedProducts.length}</span> منتج متوفر
          </p>
        </div>

        <ProductGrid products={publishedProducts} />
      </div>
    </div>
  );
}
