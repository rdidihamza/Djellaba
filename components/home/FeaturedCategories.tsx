import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    name: 'Djellabas',
    href: '/collections/djellabas',
    image: '/images/products/marron/front-with-model.png',
    description: 'Traditional Moroccan elegance',
  },
  {
    name: 'Kaftans',
    href: '/collections/kaftans',
    image: '/images/products/cream/front-with-model.png',
    description: 'Refined feminine silhouettes',
  },
  {
    name: 'Gandouras',
    href: '/collections/gandouras',
    image: '/images/products/marron/left-with-model.png',
    description: 'Heritage menswear, reimagined',
  },
  {
    name: 'Jabador',
    href: '/collections/jabador',
    image: '/images/products/cream/back-with-model.png',
    description: 'Two-piece artisan sets',
  },
  {
    name: 'Accessories',
    href: '/collections/accessories',
    image: '/images/products/marron/right-with-model.png',
    description: 'Finishing touches',
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-cream">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-3">
              The Collection
            </p>
            <h2 className="font-display text-display-lg text-brown-900">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden sm:flex items-center gap-2 text-sm text-brown-500 hover:text-brown-800 transition-colors group"
          >
            All collections
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {categories.map((cat, i) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl bg-sand"
            >
              <div className={`relative overflow-hidden ${i === 0 || i === 4 ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-lg text-cream leading-tight mb-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-cream/70 tracking-wide hidden group-hover:block transition-all">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm text-brown-500 hover:text-brown-800 transition-colors"
          >
            View all collections <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
