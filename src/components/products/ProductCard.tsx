import Link from 'next/link';
import { Product } from '@/types';
import { LazyProductImage } from '@/components/ui/LazyProductImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayName = product.name_ar || product.name_en || 'منتج';
  const isAvailable = product.stock_status === 'available';

  return (
    <Link href={`/product/${product.id}`} className="group h-full block">
      <div className="product-card h-full flex flex-col p-2 md:p-3 relative hover:scale-[1.02] transition-transform duration-300">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg bg-background mb-2 md:mb-3 h-32 md:h-40">
          <LazyProductImage product={product} alt={displayName} />

          {!isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="px-3 py-1 bg-danger text-white text-xs md:text-sm font-bold rounded-lg">
                غير متوفر
              </span>
            </div>
          )}
        </div>

        {/* Content - Compact */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {displayName}
          </h3>

          {/* Specifications */}
          {product.specifications?.model && (
            <div className="mb-1 text-[10px] md:text-xs text-text-muted">
              موديل: <span className="text-white font-semibold">{product.specifications.model}</span>
            </div>
          )}
          {product.specifications?.specification && (
            <div className="mb-1 text-[10px] md:text-xs text-text-muted">
              <span className="text-white font-semibold">{product.specifications.specification}</span>
            </div>
          )}

          {/* Availability Status */}
          <div className="mt-auto">
            {isAvailable && (
              <div className="flex items-center gap-1 text-success text-[10px] md:text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                <span>متوفر</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
