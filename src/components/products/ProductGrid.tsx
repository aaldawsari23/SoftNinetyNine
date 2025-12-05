import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  layoutType?: 'default' | 'bikes';
}

export default function ProductGrid({ products, title, layoutType = 'default' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 md:p-16 text-center border border-white/10 animate-fade-in">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-5xl md:text-6xl mb-4 animate-float">🔍</div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 animate-slide-up">لا توجد منتجات متاحة</h3>
          <p className="text-text-secondary text-sm md:text-base animate-fade-in" style={{ animationDelay: '200ms' }}>
            جرب تغيير الفلاتر أو البحث بكلمات مختلفة
          </p>
        </div>
      </div>
    );
  }

  // Determine grid classes based on layout type
  const gridClasses = layoutType === 'bikes'
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
    : "grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 lg:gap-5";

  return (
    <div className="space-y-4 md:space-y-6">
      {title && (
        <h2 className="section-title animate-slide-up">{title}</h2>
      )}
      <div className={gridClasses}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
