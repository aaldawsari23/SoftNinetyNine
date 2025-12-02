'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { LazyProductImage } from '@/components/ui/LazyProductImage';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { categories, brands } from '@/data/products';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayName = product.name_ar || product.name_en || 'منتج';
  const isAvailable = product.is_available ?? true;
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setIsCelebrating(true);

    // Add to cart
    addToCart(product);
    showToast(`تم إضافة "${displayName}" إلى السلة`, 'success');

    // Reset celebration animation after it completes
    setTimeout(() => {
      setIsCelebrating(false);
      setIsAdding(false);
    }, 600);
  };

  return (
    <Link href={`/product/${product.id}`} className="group h-full block">
      <div className={`h-full flex flex-col rounded-2xl border border-white/10 bg-[#090909] hover:border-primary/40 transition-all shadow-sm card-glow active:scale-[0.98] animate-fade-in ${isCelebrating ? 'animate-celebrate' : ''} ${isInCart(product.id) ? 'in-cart-ring' : ''}`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#111111] flex items-center justify-center">
          <LazyProductImage product={product} alt={displayName} />

          {/* Quick Add Button - Hidden for motorcycles */}
          {isAvailable && product.type !== 'bike' && (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`absolute bottom-3 left-3 cart-add-btn text-white text-xs font-bold disabled:opacity-60 disabled:cursor-not-allowed ${isAdding ? 'animate-pulse' : ''}`}
              aria-label="أضف للسلة"
            >
              {isAdding ? '✓ تمت الإضافة' : '+ أضف للسلة'}
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
          {/* Category & Brand - Improved spacing */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            {category && (
              <span className="cat-badge">
                {category.name_ar}
              </span>
            )}
            {brand && (
              <span className="text-text-muted/80 text-[11px]">• {brand.name}</span>
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

          {/* Price - Premium badge style */}
          {product.price > 0 && (
            <div className="pt-2 border-t border-white/5">
              <span className="price-badge text-green-400 text-base md:text-lg">{product.price.toLocaleString('ar-SA')} <span className="text-green-400/70 text-sm">{product.currency}</span></span>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-3 flex-wrap">
            {isAvailable && (
              <div className="flex items-center gap-1.5 text-success text-[11px] font-semibold">
                <span className="status-dot bg-success"></span>
                <span>متوفر</span>
              </div>
            )}
            {isInCart(product.id) && (
              <div className="flex items-center gap-1.5 text-yellow-400 text-[11px] font-bold">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16 6V4a2 2 0 00-2-2H6a2 2 0 00-2 2v2H2v10a2 2 0 002 2h12a2 2 0 002-2V6h-2zm-8 8a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                </svg>
                <span>في السلة</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
