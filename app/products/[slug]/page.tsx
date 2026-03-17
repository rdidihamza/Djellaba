import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/data/products'
import { ProductPageClient } from './ProductPageClient'

interface Props {
  params: { slug: string }
  searchParams: { color?: string }
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [{ url: product.colors[0].images[0].src }],
    },
  }
}

export default function ProductPage({ params, searchParams }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const initialColor =
    product.colors.find((c) => c.slug === searchParams.color)?.slug ||
    product.colors[0].slug

  return (
    <>
      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            description: product.shortDescription,
            image: product.colors[0].images.map((img) => img.src),
            brand: { '@type': 'Brand', name: 'Djellaba' },
            offers: {
              '@type': 'Offer',
              priceCurrency: product.currency,
              price: product.price,
              availability:
                product.colors[0].stock > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
            },
            aggregateRating: product.rating
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: product.rating,
                  reviewCount: product.reviewCount,
                }
              : undefined,
          }),
        }}
      />
      <ProductPageClient product={product} initialColorSlug={initialColor} />
    </>
  )
}
