'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDataProvider } from '@/lib/data-providers';
import { Product, Category, Brand } from '@/types';
import { getRelatedProducts } from '@/utils/catalog';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const dataProvider = getDataProvider();

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const foundProduct = await dataProvider.getProductById(productId);

        if (!foundProduct) {
          setError(''DEF*, :J1 EH,H/');
          return;
        }

        setProduct(foundProduct);

        // Load related data
        const [categoryData, brandData, allProducts] = await Promise.all([
          foundProduct.category_id
            ? dataProvider.getCategoryById(foundProduct.category_id)
            : Promise.resolve(null),
          foundProduct.brand_id
            ? dataProvider.getBrandById(foundProduct.brand_id)
            : Promise.resolve(null),
          dataProvider.getProducts({ status: 'published' }),
        ]);

        setCategory(categoryData);
        setBrand(brandData);

        // Get related products
        const related = getRelatedProducts(foundProduct, allProducts, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('-/+ .7# #+F'! *-EJD 'DEF*,');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [productId]);

  const handleWhatsAppContact = () => {
    if (!product) return;
    // Sanitize product data to prevent XSS
    const safeName = (product.name_ar || '').replace(/[<>]/g, '');
    const safePrice = String(product.price || 0).replace(/[<>]/g, '');
    const safeCurrency = (product.currency || '').replace(/[<>]/g, '');

    const message = `E1-('K #1:( ('D'3*A3'1 9F 'DEF*,: ${safeName}\n'D391: ${safePrice} ${safeCurrency}`;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open with security flags
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-text-muted">,'1J *-EJD 'DEF*,...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <p className="text-red-400 mb-4">{error || ''DEF*, :J1 EH,H/'}</p>
          <Link href="/catalog" className="btn-primary inline-block">
            'D9H/) DDC*'DH,
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image_url || ''];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-primary transition-colors">
          'D1&J3J)
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-primary transition-colors">
          'DC*'DH,
        </Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/catalog?category=${category.id}`}
              className="hover:text-primary transition-colors"
            >
              {category.name_ar}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-white">{product.name_ar}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="card p-4 bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[selectedImage]}
              alt={product.name_ar}
              className="w-full aspect-square object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23333" width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23666" font-size="40">5H1) 'DEF*,</text></svg>';
              }}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`card p-2 transition-all ${
                    selectedImage === index
                      ? 'ring-2 ring-primary'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${product.name_ar} ${index + 1}`}
                    className="w-full aspect-square object-contain rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {product.name_ar}
            </h1>
            {product.name_en && (
              <p className="text-lg text-text-secondary">{product.name_en}</p>
            )}
            {product.sku && (
              <p className="text-sm text-text-muted mt-1">1BE 'DEF*,: {product.sku}</p>
            )}
          </div>

          {/* Category & Brand */}
          <div className="flex flex-wrap gap-2">
            {category && (
              <Link
                href={`/catalog?category=${category.id}`}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
              >
                {category.name_ar}
              </Link>
            )}
            {brand && (
              <Link
                href={`/catalog?brand=${brand.id}`}
                className="px-3 py-1.5 bg-white/5 text-text-secondary rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                {brand.name_ar || brand.name}
              </Link>
            )}
            {product.is_new && (
              <span className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm">
                ,/J/
              </span>
            )}
            {product.is_featured && (
              <span className="px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                EEJ2
              </span>
            )}
          </div>

          {/* Price */}
          <div className="card p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <p className="text-sm text-text-secondary mb-2">'D391</p>
            <p className="text-4xl font-bold text-white">
              {product.price}{' '}
              <span className="text-2xl text-text-secondary">{product.currency}</span>
            </p>
            {product.stock_quantity !== undefined && (
              <p className={`text-sm mt-2 ${product.stock_quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {product.stock_quantity > 0 ? `E*HA1 (${product.stock_quantity})` : ':J1 E*HA1'}
              </p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-3">'DH5A</h2>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-3">'DEH'5A'*</h2>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-muted">{key}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Contact Button */}
          <button
            onClick={handleWhatsAppContact}
            className="w-full btn-primary flex items-center justify-center gap-3 py-4"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-lg">*H'5D 9(1 H'*3'(</span>
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">EF*,'* E4'(G)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
