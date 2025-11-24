import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 md:p-16 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-5xl md:text-6xl mb-4 animate-float">🔍</div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">لا توجد منتجات متاحة</h3>
          <p className="text-text-secondary text-sm md:text-base">جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {title && (
        <h2 className="section-title animate-slide-down">{title}</h2>
      )}
      {/* Grid: Uniform layout for all products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${Math.min(index * 30, 300)}ms`,
              animationFillMode: 'both'
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
