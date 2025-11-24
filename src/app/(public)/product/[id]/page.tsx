'use client';

import { products, brands, categories } from '@/data/products';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/data/config';
import { LazyProductImage } from '@/components/ui/LazyProductImage';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const brand = product.brand_id ? brands.find(b => b.id === product.brand_id) : null;
  const category = categories.find(c => c.id === product.category_id);

  const displayName = product.name_ar || product.name_en || 'منتج';
  const isAvailable = product.is_available ?? true;
  // Preorder status removed from the store; treat only available vs unavailable.

  const handleBuyNow = () => {
    // When a product has an external Salla URL configured, redirect the user there.
    // Otherwise, build a WhatsApp link using the centralised phone number and open it in a new tab.
    if (product.salla_url) {
      window.open(product.salla_url, '_blank');
    } else {
      const message = `مرحباً، أريد الاستفسار عن: ${displayName} - السعر: ${product.price} ${product.currency}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-secondary mb-6">
          <Link href="/" className="hover:text-primary">الرئيسية</Link>
          {' / '}
          <Link href="/catalog" className="hover:text-primary">المنتجات</Link>
          {' / '}
          <span className="text-white">{displayName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div>
            <div className="card p-0 overflow-hidden mb-4 h-96">
              <LazyProductImage product={product} alt={displayName} />
            </div>

            {/* Thumbnail Gallery */}
            {false && (
              <div className="grid grid-cols-4 gap-2">
                {product?.images?.slice(1).map((img, idx) => (
                  <div key={idx} className="card p-0 overflow-hidden cursor-pointer hover:border-primary">
                    <img
                      src={img}
                      alt={`${displayName} - ${idx + 2}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            <div className="card">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.is_new ? (
                  <span className="bg-primary text-white text-sm px-3 py-1 rounded-md font-semibold">
                    جديد
                  </span>
                ) : (
                  <span className="bg-yellow-600 text-white text-sm px-3 py-1 rounded-md font-semibold">
                    مستعمل
                  </span>
                )}
                {isAvailable ? (
                  <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-md font-semibold">
                    متوفر
                  </span>
                ) : (
                  <span className="bg-gray-700 text-white text-sm px-3 py-1 rounded-md font-semibold">
                    غير متوفر
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white mb-4">{displayName}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-6">
                {brand && (
                  <div className="flex items-center gap-2">
                    <span>الماركة:</span>
                    <span className="text-white font-semibold">{brand.name}</span>
                  </div>
                )}
                {category && (
                  <div className="flex items-center gap-2">
                    <span>الفئة:</span>
                    <span className="text-white font-semibold">{category.name_ar}</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="bg-background-light p-4 rounded-md mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-green-500">
                    {product.price.toLocaleString('ar-SA')}
                  </span>
                  <span className="text-lg text-text-secondary">{product.currency}</span>
                </div>
              </div>

              {/* Specs */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-3">المواصفات</h2>
                  <div className="bg-background-light p-4 rounded-md space-y-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-text-secondary">{key}</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-3">الوصف</h2>
                  <p className="text-text-secondary leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Buy Button */}
              <button onClick={handleBuyNow} className="btn-primary w-full py-4 text-lg">
                {product.salla_url ? 'اشترِ الآن من سلة' : 'تواصل عبر واتساب'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">منتجات مشابهة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p =>
                p.id !== product.id &&
                p.category_id === product.category_id &&
                (p.is_available ?? true)
              )
              .slice(0, 4)
              .map(p => {
                const relatedProductLink = `/product/${p.id}`;
                const relatedName = p.name_ar || p.name_en || 'منتج';
                return (
                  <Link key={p.id} href={relatedProductLink} className="card p-4 hover:border-primary">
                    <div className="h-32 bg-gray-900 rounded-md mb-3 overflow-hidden">
                      <LazyProductImage product={p} alt={relatedName} />
                    </div>
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{relatedName}</h3>
                    <p className="text-green-500 font-bold">{p.price.toLocaleString('ar-SA')} {p.currency}</p>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
