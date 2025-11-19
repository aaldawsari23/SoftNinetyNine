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
      <div className="card text-center py-12 md:py-16 border-dashed border-gray-700">
        <div className="text-4xl md:text-5xl mb-3">🔍</div>
        <p className="text-white text-lg font-semibold mb-2">لا توجد منتجات متاحة</p>
        <p className="text-text-secondary text-sm md:text-base">
          جرّب تعديل الفلاتر أو تواصل معنا لطلب المنتج الذي تريده
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default memo(ProductGrid);
