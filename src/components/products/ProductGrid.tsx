import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="glass rounded-2xl p-16 md:p-20 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-6xl md:text-7xl mb-6 animate-float">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-2">لا توجد منتجات متاحة</h3>
          <p className="text-text-secondary">جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="section-title animate-slide-down">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`animate-fade-in ${
              product.type === 'bike'
                ? 'sm:col-span-2 lg:col-span-2 xl:col-span-2'
                : 'col-span-1'
            }`}
            style={{
              animationDelay: `${Math.min(index * 50, 500)}ms`,
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
