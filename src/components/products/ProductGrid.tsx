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
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default memo(ProductGrid);
