import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

const collectionMeta: Record<string, { title: string; description: string }> = {
  djellabas: {
    title: 'Djellabas',
    description: 'Full-length Moroccan djellabas — traditional silhouette, contemporary finish.',
  },
  kaftans: {
    title: 'Kaftans',
    description: 'Refined Moroccan kaftans for elevated feminine dressing.',
  },
  gandouras: {
    title: 'Gandouras',
    description: 'Heritage Moroccan gandouras — lightweight, fluid, and effortlessly refined.',
  },
  jabador: {
    title: 'Jabador',
    description: 'Two-piece Moroccan sets, tailored for modern occasions.',
  },
  men: {
    title: "Men's Collection",
    description: 'Premium Moroccan menswear — djellabas, gandouras, and jabador.',
  },
  women: {
    title: "Women's Collection",
    description: 'Refined Moroccan womenswear — kaftans, djellabas, and more.',
  },
  'new-arrivals': {
    title: 'New Arrivals',
    description: 'The latest additions to the Djellaba collection.',
  },
  'best-sellers': {
    title: 'Best Sellers',
    description: 'The pieces our community returns to, season after season.',
  },
  'limited-edition': {
    title: 'Limited Edition',
    description: 'Exclusive, small-run pieces crafted for those who seek rarity.',
  },
  accessories: {
    title: 'Accessories',
    description: 'Considered Moroccan accessories to complete the look.',
  },
}

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return Object.keys(collectionMeta).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = collectionMeta[params.slug]
  if (!meta) return {}
  return {
    title: `${meta.title} | Djellaba`,
    description: meta.description,
  }
}

export default function CollectionPage({ params }: Props) {
  const meta = collectionMeta[params.slug]
  if (!meta) notFound()

  // Filter products by collection or category
  const collectionProducts = products.filter(
    (p) =>
      p.collection.includes(params.slug as any) ||
      p.category === params.slug
  )

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-parchment border-b border-gold-100">
        <div className="max-w-8xl mx-auto px-6 lg:px-10 py-12">
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Collections', href: '/collections' },
              { label: meta.title },
            ]}
          />
          <div className="mt-5">
            <h1 className="font-display text-display-lg text-brown-900">{meta.title}</h1>
            <p className="mt-2 text-brown-500 text-base max-w-lg">{meta.description}</p>
          </div>
          <p className="mt-3 text-xs text-brown-400 tracking-wide">
            {collectionProducts.length} {collectionProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-12">
        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-brown-400 mb-2">
              New pieces arriving soon
            </p>
            <p className="text-sm text-brown-400">
              This collection is being curated. Check back shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
