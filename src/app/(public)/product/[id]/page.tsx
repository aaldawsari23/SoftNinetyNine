import { products, brands, categories } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetails from './ProductDetails';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const brand = product.brand_id ? brands.find(b => b.id === product.brand_id) : null;
  const category = categories.find(c => c.id === product.category_id);

  // Get related products
  const relatedProducts = products
    .filter(p =>
      p.id !== product.id &&
      p.category_id === product.category_id &&
      (p.is_available ?? true)
    )
    .slice(0, 5);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name_ar || product.name_en || product.name || 'منتج',
    description: product.short_description || product.description,
    sku: product.sku || product.id,
    image: product.images?.length ? product.images : product.image_url ? [product.image_url] : undefined,
    brand: brand
      ? {
          '@type': 'Brand',
          name: brand.name,
        }
      : undefined,
    category: category?.name_ar,
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency || 'SAR',
      price: product.price,
      availability: product.is_available === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <ProductDetails
        product={product}
        brand={brand || null}
        category={category}
        relatedProducts={relatedProducts}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
