import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function BrandStory() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-parchment">
      <div className="max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-5">
              Our Story
            </p>
            <h2 className="font-display text-display-lg text-brown-900 mb-6">
              Rooted in Morocco,
              <br />
              designed for now.
            </h2>
            <div className="space-y-4 text-brown-600 text-base leading-relaxed max-w-md">
              <p>
                Djellaba was built from a simple conviction: traditional Moroccan garments deserve
                to be worn not only for ceremony, but for the full expression of daily life.
              </p>
              <p>
                We work with artisans whose craft has been passed through generations — and we
                bring their work into a contemporary frame. Clean silhouettes. Precise finishing.
                Fabrics that move with intention.
              </p>
              <p>
                Every piece carries a quiet Moroccan intelligence — measured, considered, and
                built to last beyond the moment it was made.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-brown-700 hover:text-brown-900 transition-colors group"
            >
              About the brand
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/products/cream/front-with-model.png"
                  alt="Brand story — cream djellaba"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="bg-brown-800 rounded-2xl p-5 text-cream">
                <p className="font-display text-2xl font-light mb-1">2+</p>
                <p className="text-xs text-brown-400 tracking-wide">Years of artisan partnership</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-gold-100 rounded-2xl p-5">
                <p className="font-display text-2xl text-brown-800 font-light mb-1">100%</p>
                <p className="text-xs text-brown-500 tracking-wide">Handcrafted in Morocco</p>
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/products/marron/right-with-model.png"
                  alt="Brand story — marron djellaba"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
