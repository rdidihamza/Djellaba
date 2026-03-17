import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'

export function SignatureCollection() {
  const featured = products.slice(0, 2)

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-parchment">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-3">
            Signature
          </p>
          <h2 className="font-display text-display-lg text-brown-900 mb-3">
            The Founding Collection
          </h2>
          <p className="text-brown-500 text-base max-w-lg mx-auto">
            Two colorways. One silhouette. Designed once, worn for years.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Brown variant */}
          <Link
            href="/products/djellaba-marron-classique?color=marron"
            className="group relative overflow-hidden rounded-3xl bg-sand"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/products/marron/front-with-model.png"
                alt="Djellaba Marron Classique — Brown"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold-300 mb-2">
                      Men · Djellabas
                    </p>
                    <h3 className="font-display text-2xl text-cream mb-1">
                      Djellaba Marron Classique
                    </h3>
                    <p className="text-cream/70 text-sm">Brown</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cream/60 text-xs line-through">2,800 MAD</p>
                    <p className="font-display text-xl text-cream">2,200 MAD</p>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-gold-300 text-sm group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>

          {/* Cream variant */}
          <Link
            href="/products/djellaba-marron-classique?color=cream"
            className="group relative overflow-hidden rounded-3xl bg-brown-100"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/products/cream/front-with-model.png"
                alt="Djellaba Marron Classique — Cream"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold-300 mb-2">
                      Men · Djellabas
                    </p>
                    <h3 className="font-display text-2xl text-cream mb-1">
                      Djellaba Classique
                    </h3>
                    <p className="text-cream/70 text-sm">Cream</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cream/60 text-xs line-through">2,800 MAD</p>
                    <p className="font-display text-xl text-cream">2,200 MAD</p>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-gold-300 text-sm group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/collections/men"
            className="inline-flex items-center gap-2 text-sm font-medium text-brown-600 hover:text-brown-900 transition-colors group"
          >
            View all men&apos;s pieces
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
