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
  const isMotorcycle = product.type === 'bike';

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
          {/* Image Section - Clean */}
          <div className="space-y-3 md:space-y-4">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#141414] via-[#050505] to-[#000000] border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.75)] overflow-hidden sticky top-20">
              <div className="aspect-square w-full max-w-md mx-auto flex items-center justify-center">
                <LazyProductImage product={product} alt={displayName} />
              </div>

              {/* Out of stock badge - بدون تغطية الصورة */}
              {!isAvailable && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1.5 rounded-full bg-red-600/95 text-xs font-bold text-white shadow-md shadow-red-500/40">
                    غير متوفر حالياً
                  </span>
                </div>
              )}

              {/* حافة خفيفة حول الإطار */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
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
            <div className="mt-6 space-y-3 lg:mt-8">
              {/* For Motorcycles: WhatsApp only */}
              {isMotorcycle && (
                <button onClick={handleBuyNow} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                  <span className="text-lg font-semibold">{product.salla_url ? 'الشراء من سلة' : 'واتساب للاستفسار'}</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </button>
              )}

              {/* For Regular Products: Add to Cart only */}
              {!isMotorcycle && isAvailable && (
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
                    <div className="aspect-[4/3] bg-[#101010] rounded-2xl mb-3 overflow-hidden flex items-center justify-center">
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
