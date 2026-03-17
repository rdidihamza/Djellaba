import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { getBestSellers } from '@/data/products'

export function BestSellers() {
  const products = getBestSellers()

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-sand">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-3">
              Most Loved
            </p>
            <h2 className="font-display text-display-lg text-brown-900">Best Sellers</h2>
          </div>
          <Link
            href="/collections/best-sellers"
            className="hidden sm:flex items-center gap-2 text-sm text-brown-500 hover:text-brown-800 transition-colors group"
          >
            View all
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-brown-400">
            <p className="font-display text-xl">New pieces arriving soon</p>
          </div>
        )}
      </div>
    </section>
  )
}
