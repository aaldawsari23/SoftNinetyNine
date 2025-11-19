import { Product } from '@/types';
import ProductCard from './ProductCard';
import { memo } from 'react';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 md:py-16">
        <div className="text-4xl md:text-5xl mb-4">🔍</div>
        <p className="text-text-secondary text-base md:text-lg">لا توجد منتجات متاحة</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">{title}</h2>
      )}
      <div className="grid auto-rows-fr gap-3 md:gap-4 lg:gap-6 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default memo(ProductGrid);
