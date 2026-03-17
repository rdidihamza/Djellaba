import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections | Djellaba',
  description: 'Explore all Djellaba collections — djellabas, kaftans, gandouras, and more.',
}

const allCollections = [
  {
    slug: 'new-arrivals',
    name: 'New Arrivals',
    image: '/images/products/cream/front-with-model.png',
    count: 1,
  },
  {
    slug: 'djellabas',
    name: 'Djellabas',
    image: '/images/products/marron/front-with-model.png',
    count: 1,
  },
  {
    slug: 'kaftans',
    name: 'Kaftans',
    image: '/images/products/cream/left-with-model.png',
    count: 0,
  },
  {
    slug: 'gandouras',
    name: 'Gandouras',
    image: '/images/products/marron/left-with-model.png',
    count: 0,
  },
  {
    slug: 'jabador',
    name: 'Jabador',
    image: '/images/products/marron/right-with-model.png',
    count: 0,
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    image: '/images/products/cream/right-with-model.png',
    count: 0,
  },
]

export default function CollectionsPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-12">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-3">
            All Collections
          </p>
          <h1 className="font-display text-display-lg text-brown-900">Shop by Category</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {allCollections.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-sand"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="font-display text-xl text-cream">{col.name}</h2>
                  <p className="text-cream/60 text-xs mt-0.5">
                    {col.count > 0 ? `${col.count} piece${col.count !== 1 ? 's' : ''}` : 'Coming soon'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
