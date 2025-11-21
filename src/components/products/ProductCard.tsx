import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayName = product.name_ar || product.name_en || 'منتج';
  const isAvailable = product.stock_status === 'available';
  const isBike = product.type === 'bike';

  const imageSrc = (product.images && product.images.length > 0 && product.images[0]) || '';

  return (
    <Link href={`/product/${product.id}`} className="group h-full block">
      <div className="product-card h-full flex flex-col p-2 md:p-3 relative hover:scale-[1.02] transition-transform duration-300">
        {/* Image */}
        <div className={`relative overflow-hidden rounded-lg bg-background mb-2 md:mb-3 ${
          isBike ? 'h-40 md:h-56' : 'h-32 md:h-40'
        }`}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-background-card">
              <span className="text-3xl md:text-4xl opacity-30">🏍️</span>
            </div>
          )}

          {/* Badges - Compact */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_new ? (
              <span className="px-2 py-0.5 bg-success/90 text-white text-[10px] md:text-xs font-bold rounded-md backdrop-blur-sm">
                ✨ جديد
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-secondary/90 text-white text-[10px] md:text-xs font-bold rounded-md backdrop-blur-sm">
                مستعمل
              </span>
            )}
          </div>

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

          {/* Specs - Only show for bikes and only mileage */}
          {isBike && product.specs?.['الممشى'] && (
            <div className="mb-2 text-[10px] md:text-xs text-text-muted">
              الممشى: <span className="text-white font-semibold">{product.specs['الممشى']}</span>
            </div>
          )}

          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-1 md:gap-2">
              <span className="text-lg md:text-2xl font-black text-primary">
                {product.price.toLocaleString('ar-SA')}
              </span>
              <span className="text-[10px] md:text-xs text-text-secondary font-semibold">
                {product.currency}
              </span>
            </div>
            {isAvailable && (
              <div className="flex items-center gap-1 mt-1 text-success text-[10px] md:text-xs font-semibold">
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
