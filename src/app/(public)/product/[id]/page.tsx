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

  return (
    <ProductDetails
      product={product}
      brand={brand || null}
      category={category}
      relatedProducts={relatedProducts}
    />
  );
}
