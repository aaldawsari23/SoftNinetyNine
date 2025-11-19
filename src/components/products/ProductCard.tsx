import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { memo } from 'react';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const displayName = product.name || product.name_en || 'منتج';
  const isAvailable = product.is_available;

  const fallbackImages: { [key: string]: string } = {
    'c-oil': 'https://images.pexels.com/photos/31864583/pexels-photo-31864583.jpeg',
    'c-oil-filter': 'https://images.pexels.com/photos/31864583/pexels-photo-31864583.jpeg',
    'c-air-filter': 'https://images.pexels.com/photos/31864583/pexels-photo-31864583.jpeg',
    'c-brake-pad': 'https://images.pexels.com/photos/5111310/pexels-photo-5111310.jpeg',
    'c-chain': 'https://images.pexels.com/photos/5111315/pexels-photo-5111315.jpeg',
    'c-battery': 'https://images.pexels.com/photos/5111315/pexels-photo-5111315.jpeg',
    'c-spark': 'https://images.pexels.com/photos/5111315/pexels-photo-5111315.jpeg',
    'c-tire': 'https://images.pexels.com/photos/14700339/pexels-photo-14700339.jpeg',
    'c-brake-fluid': 'https://images.pexels.com/photos/31864583/pexels-photo-31864583.jpeg',
    'c-coolant': 'https://images.pexels.com/photos/31864583/pexels-photo-31864583.jpeg',
    'c-electronics': 'https://images.pexels.com/photos/5111315/pexels-photo-5111315.jpeg',
    'c-lighting': 'https://images.pexels.com/photos/5111315/pexels-photo-5111315.jpeg',
    'c-accessory': 'https://images.pexels.com/photos/5111315/pexels-photo-5111315.jpeg',
    'c-helmet': 'https://images.pexels.com/photos/1915149/pexels-photo-1915149.jpeg',
    'c-gloves': 'https://images.pexels.com/photos/20662860/pexels-photo-20662860.png',
    'c-jacket': 'https://images.pexels.com/photos/15142722/pexels-photo-15142722.jpeg',
    'c-boots': 'https://images.pexels.com/photos/20662861/pexels-photo-20662861.png',
    'c-armor': 'https://images.pexels.com/photos/15142722/pexels-photo-15142722.jpeg',
    'c-gear-accessory': 'https://images.pexels.com/photos/15142722/pexels-photo-15142722.jpeg'
  };

  const imageSrc = product.image_url || fallbackImages[product.category_id] || '';

  return (
    <Link href={`/product/${product.id}`} className="group h-full">
      <div className="product-card h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden mb-3 rounded-xl bg-gray-900/80 border border-gray-800/70 aspect-[4/3] min-h-[10rem] sm:min-h-[11rem]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={displayName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 480px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              priority={false}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <span className="text-3xl md:text-4xl">🏍️</span>
            </div>
          )}

          {/* Badges - moved to LEFT for RTL */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            <span className={`text-[10px] md:text-xs px-2 py-1 rounded-md font-bold shadow-lg ${
              product.is_featured ? 'bg-green-600 text-white' : 'bg-primary text-white'
            }`}>
              {product.is_featured ? 'مميز' : 'جديد'}
            </span>
            {!isAvailable && (
              <span className="bg-gray-700 text-white text-[10px] md:text-xs px-2 py-1 rounded-md font-bold shadow-lg">
                غير متوفر
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-1">
          <h3 className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {displayName}
          </h3>

          {/* Specs Preview */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="text-[10px] md:text-xs text-text-secondary mb-3 space-y-0.5">
              {Object.entries(product.specifications)
                .slice(0, 2)
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-text-muted">{key}:</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
            </div>
          )}

          {/* Price - more prominent */}
          <div className="mt-auto pt-3 border-t border-gray-800">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl md:text-2xl font-black text-green-400">
                {product.price.toLocaleString('ar-SA')}
              </span>
              <span className="text-xs md:text-sm text-text-secondary font-semibold">
                {product.currency}
              </span>
            </div>
            <p className="text-[10px] text-text-muted mt-1 group-hover:text-primary transition-colors">
              اضغط لعرض التفاصيل ←
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
