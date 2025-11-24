'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/data/config';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { LazyProductImage } from '@/components/ui/LazyProductImage';
import { Product, Brand, Category } from '@/types';

interface ProductDetailsProps {
  product: Product;
  brand: Brand | null;
  category: Category | undefined;
  relatedProducts: Product[];
}

export default function ProductDetails({ product, brand, category, relatedProducts }: ProductDetailsProps) {
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const displayName = product.name_ar || product.name_en || 'منتج';
  const isAvailable = product.is_available ?? true;

  const handleBuyNow = () => {
    if (product.salla_url) {
      window.open(product.salla_url, '_blank');
    } else {
      const message = `مرحباً، أريد الاستفسار عن: ${displayName} - السعر: ${product.price} ${product.currency}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`تم إضافة ${quantity} من "${displayName}" إلى السلة`, 'success');
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background py-4 md:py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-secondary mb-4 md:mb-6">
          <Link href="/" className="hover:text-primary">الرئيسية</Link>
          {' / '}
          <Link href="/catalog" className="hover:text-primary">المنتجات</Link>
          {' / '}
          <span className="text-white">{displayName}</span>
        </nav>

        {/* Mobile-first responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
          {/* Image Section - Enhanced */}
          <div className="space-y-3 md:space-y-4">
            <div className="bg-gradient-to-b from-background-light to-background rounded-xl md:rounded-2xl overflow-hidden border border-white/10 sticky top-20">
              <div className="aspect-square relative">
                <LazyProductImage product={product} alt={displayName} />
                {!isAvailable && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="px-4 py-2 bg-danger text-white text-base md:text-lg font-bold rounded-xl">
                      غير متوفر
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Meta - Mobile */}
            <div className="lg:hidden bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex flex-wrap gap-2 text-xs">
                {brand && (
                  <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full font-semibold">
                    {brand.name}
                  </span>
                )}
                {category && (
                  <span className="px-3 py-1.5 bg-white/10 text-white rounded-full">
                    {category.name_ar}
                  </span>
                )}
                {(product.sku || product.id) && (
                  <span className="px-3 py-1.5 bg-white/5 text-text-muted rounded-full font-mono">
                    {product.sku || product.id}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info Section - Redesigned */}
          <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div>
              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.is_new && (
                  <span className="px-3 py-1 bg-gradient-to-r from-accent to-yellow-500 text-background text-sm rounded-full font-bold">
                    جديد
                  </span>
                )}
                {isAvailable ? (
                  <span className="px-3 py-1 bg-green-500/20 text-green-500 text-sm rounded-full font-semibold">
                    متوفر
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-sm rounded-full font-semibold">
                    غير متوفر
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{displayName}</h1>
            </div>

            {/* Meta Info - Desktop */}
            <div className="hidden lg:flex flex-wrap gap-4 pb-6 border-b border-white/10">
              {brand && (
                <div>
                  <span className="text-text-muted text-sm">العلامة التجارية</span>
                  <p className="text-white font-semibold">{brand.name}</p>
                </div>
              )}
              {category && (
                <div>
                  <span className="text-text-muted text-sm">الفئة</span>
                  <p className="text-white font-semibold">{category.name_ar}</p>
                </div>
              )}
              {(product.sku || product.id) && (
                <div>
                  <span className="text-text-muted text-sm">رقم المنتج</span>
                  <p className="text-white font-mono font-semibold">{product.sku || product.id}</p>
                </div>
              )}
            </div>

            {/* Price Section */}
            {product.price > 0 && (
              <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/20">
                <p className="text-sm text-text-muted mb-1">السعر</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-green-500">
                    {product.price.toLocaleString('ar-SA')}
                  </span>
                  <span className="text-lg text-green-500/80">{product.currency}</span>
                </div>
              </div>
            )}

            {/* Specifications */}
            {((product.specs && Object.keys(product.specs).length > 0) || product.specifications) && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3">المواصفات</h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 space-y-2">
                  {product.specifications?.model && (
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-text-muted">الموديل</span>
                      <span className="text-white font-semibold">{product.specifications.model}</span>
                    </div>
                  )}
                  {product.specifications?.specification && (
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-text-muted">المواصفة</span>
                      <span className="text-white font-semibold">{product.specifications.specification}</span>
                    </div>
                  )}
                  {product.specs && Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-text-muted">{key}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && product.description.trim() !== '' && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3">الوصف</h2>
                <p className="text-text-secondary leading-relaxed bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  {product.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 sticky bottom-0 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 lg:static lg:bg-transparent lg:p-0">
              {isAvailable && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white/5 rounded-xl border border-white/10">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-white/5 transition-colors"
                      aria-label="تقليل"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 font-semibold min-w-[50px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-white/5 transition-colors"
                      aria-label="زيادة"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                    disabled={isInCart(product.id)}
                  >
                    {isInCart(product.id) ? (
                      <>
                        <span>✓</span>
                        <span>في السلة</span>
                      </>
                    ) : (
                      <>
                        <span>أضف للسلة</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}

              <button onClick={handleBuyNow} className="btn-secondary w-full py-3 flex items-center justify-center gap-2">
                <span>{product.salla_url ? 'الشراء من سلة' : 'واتساب للاستفسار'}</span>
                <span>📱</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedProducts.map(p => {
                const relatedName = p.name_ar || p.name_en || 'منتج';
                return (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:border-primary/50 transition-all"
                  >
                    <div className="aspect-square bg-gradient-to-b from-background-light to-background rounded-lg mb-3 overflow-hidden">
                      <LazyProductImage product={p} alt={relatedName} />
                    </div>
                    <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">{relatedName}</h3>
                    {p.price > 0 && (
                      <p className="text-green-500 font-bold text-sm">{p.price.toLocaleString('ar-SA')} {p.currency}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
