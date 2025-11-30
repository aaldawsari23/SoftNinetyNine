'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { LazyProductImage } from '@/components/ui/LazyProductImage';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { categories, brands } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayName = product.name_ar || product.name_en || 'منتج';
  const isAvailable = product.is_available ?? true;
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();

  const category = categories.find(c => c.id === product.category_id);
  const brand = brands.find(b => b.id === product.brand_id);

  // Build secondary info line from specifications
  const getSecondaryInfo = (): string => {
    const specs = product.specifications;
    if (!specs) return '';

    // زيوت (c1)
    if (product.category_id === 'c1') {
      const parts = [];
      if (specs.viscosity) parts.push(specs.viscosity);
      if (specs.volume) parts.push(specs.volume);
      if (specs.oil_type) parts.push(specs.oil_type);
      return parts.join(' • ');
    }

    // كفرات (c5)
    if (product.category_id === 'c5') {
      const parts = [];
      if (specs.size) parts.push(specs.size);
      if (specs.tread_pattern) parts.push(specs.tread_pattern);
      return parts.join(' • ');
    }

    // فلاتر (c2) وبواجي (c3) - عرض الموديل فقط
    if (product.category_id === 'c2' || product.category_id === 'c3') {
      return specs.model || '';
    }

    // باقي المنتجات - عرض الموديل إذا موجود
    return specs.model || '';
  };

  const secondaryInfo = getSecondaryInfo();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    showToast(`تم إضافة "${displayName}" إلى السلة`, 'success');
  };

  return (
    <Link href={`/product/${product.id}`} className="group h-full block">
      <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-[#090909] hover:border-primary/40 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/15 active:scale-[0.98]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#111111] flex items-center justify-center">
          <LazyProductImage product={product} alt={displayName} />

          {/* Quick Add Button - Hidden for motorcycles */}
          {isAvailable && product.type !== 'bike' && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-2 left-2 bg-primary/95 text-white px-2.5 py-1.5 rounded-xl shadow-lg shadow-primary/30 text-[11px] md:text-xs font-semibold hover:bg-primary transition-all active:scale-95"
              aria-label="أضف للسلة"
            >
              + للسلة
            </button>
          )}

          {/* Out of stock badge (بدون تغطية الصورة) */}
          {!isAvailable && (
            <div className="absolute top-2 left-2">
              <span className="px-2.5 py-1 rounded-full bg-red-600/95 text-[10px] md:text-xs font-bold text-white shadow-md shadow-red-500/40">
                غير متوفر
              </span>
            </div>
          )}
        </div>

        {/* Content - Compact - Flex to push price to bottom */}
        <div className="flex-1 flex flex-col p-3 md:p-4 space-y-2">
          {/* Category & Brand */}
          <div className="flex items-center gap-2 text-xs">
            {category && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                {category.name_ar}
              </span>
            )}
            {brand && (
              <span className="text-text-muted">{brand.name}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {displayName}
          </h3>

          {/* Secondary Info - Key specs */}
          {secondaryInfo && (
            <p className="text-xs text-text-muted line-clamp-1">
              {secondaryInfo}
            </p>
          )}

          {/* Spacer to push price to bottom */}
          <div className="flex-1"></div>

          {/* Price */}
          {product.price > 0 && (
            <div className="pt-2 border-t border-white/5">
              <span className="text-lg md:text-xl font-bold text-green-500">{product.price.toLocaleString('ar-SA')} {product.currency}</span>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-2 flex-wrap">
            {isAvailable && (
              <div className="flex items-center gap-1 text-success text-[10px] md:text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                <span>متوفر</span>
              </div>
            )}
            {isInCart(product.id) && (
              <div className="flex items-center gap-1 text-yellow-500 text-[10px] md:text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                <span>في السلة</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
