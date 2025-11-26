import { Brand, Category, Product } from '@/types'

interface ProductStructuredDataProps {
  product: Product
  category?: Category | null
  brand?: Brand | null
  baseUrl?: string
}

const removeUndefined = (obj: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined && value !== null)
  )

export default function ProductStructuredData({
  product,
  category,
  brand,
  baseUrl = 'https://soft99bikes.com',
}: ProductStructuredDataProps) {
  const images = product.images && product.images.length > 0
    ? product.images
    : product.image_url
      ? [product.image_url]
      : undefined

  const availability = product.stock_quantity !== undefined
    ? product.stock_quantity > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock'
    : 'https://schema.org/PreOrder'

  const structuredData = removeUndefined({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name_ar || product.name_en,
    description: product.description || product.short_description,
    sku: product.sku,
    mpn: product.model,
    image: images,
    category: category?.name_ar || category?.name,
    brand: brand
      ? {
          '@type': 'Brand',
          name: brand.name_ar || brand.name,
        }
      : undefined,
    offers: removeUndefined({
      '@type': 'Offer',
      url: `${baseUrl}/products/${product.id}`,
      priceCurrency: product.currency || 'SAR',
      price: product.price,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
    }),
  })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
