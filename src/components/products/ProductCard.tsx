import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayName = product.name_ar || product.name_en || 'منتج';
  const isAvailable = product.stock_status === 'available';

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

  const imageSrc =
    (product.images && product.images.length > 0 && product.images[0]) ||
    fallbackImages[product.category_id] ||
    '';

  return (
    <Link href={`/product/${product.id}`} className="group h-full block">
      <div className="product-card h-full flex flex-col p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/0 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-background-card to-background mb-4 ${
          product.type === 'bike' ? 'h-52 md:h-64' : 'h-40 md:h-48'
        }`}>
          {imageSrc ? (
            <>
              <img
                src={imageSrc}
                alt={displayName}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background-card to-background-hover">
              <span className="text-4xl md:text-5xl opacity-30 group-hover:scale-110 transition-transform">🏍️</span>
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_new ? (
              <span className="badge-new">
                ✨ جديد
              </span>
            ) : (
              <span className="badge-used">
                مستعمل
              </span>
            )}
            {!isAvailable && (
              <span className="badge-unavailable">
                غير متوفر
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <span>عرض سريع</span>
              <span>←</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-base md:text-lg font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
            {displayName}
          </h3>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="glass p-3 rounded-lg mb-4 text-xs md:text-sm space-y-1">
              {product.type === 'bike' && product.specs['الممشى'] && (
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">الممشى:</span>
                  <span className="text-white font-semibold">{product.specs['الممشى']}</span>
                </div>
              )}
              {Object.entries(product.specs)
                .filter(([key]) => key !== 'الممشى')
                .slice(0, 1)
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-text-muted">{key}:</span>
                    <span className="text-white font-semibold">{value}</span>
                  </div>
                ))}
            </div>
          )}

          <div className="mt-auto">
            <div className="relative p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {product.price.toLocaleString('ar-SA')}
                  </span>
                  <span className="text-sm text-text-secondary font-bold">
                    {product.currency}
                  </span>
                </div>
                {isAvailable && (
                  <div className="text-success text-xs font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                    <span>متوفر</span>
                  </div>
                )}
              </div>

              <div className="mt-2 text-xs text-text-muted group-hover:text-primary transition-colors flex items-center gap-1">
                <span>اضغط للتفاصيل</span>
                <span className="group-hover:translate-x-1 transition-transform inline-block">←</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
