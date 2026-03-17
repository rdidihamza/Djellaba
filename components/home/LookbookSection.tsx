import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const editorialImages = [
  {
    src: '/images/products/marron/front-with-model.png',
    alt: 'Editorial — Djellaba Marron',
    caption: 'The Marron Edit',
    href: '/products/djellaba-marron-classique',
    span: 'col-span-1 row-span-2',
    aspect: 'aspect-[2/3]',
  },
  {
    src: '/images/products/cream/front-with-model.png',
    alt: 'Editorial — Djellaba Crème',
    caption: 'Heritage Cream',
    href: '/products/djellaba-marron-classique?color=cream',
    span: 'col-span-1',
    aspect: 'aspect-square',
  },
  {
    src: '/images/products/marron/left-with-model.png',
    alt: 'Editorial — Side Profile',
    caption: 'Silhouette Study',
    href: '/lookbook',
    span: 'col-span-1',
    aspect: 'aspect-square',
  },
  {
    src: '/images/products/cream/back-with-model.png',
    alt: 'Editorial — Back View',
    caption: 'The Back Story',
    href: '/lookbook',
    span: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/3]',
  },
]

export function LookbookSection() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-cream">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-3">
              Editorial
            </p>
            <h2 className="font-display text-display-lg text-brown-900">Lookbook</h2>
          </div>
          <Link
            href="/lookbook"
            className="hidden sm:flex items-center gap-2 text-sm text-brown-500 hover:text-brown-800 transition-colors group"
          >
            View full lookbook
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {editorialImages.map((img, i) => (
            <Link
              key={i}
              href={img.href}
              className={`group relative overflow-hidden rounded-2xl bg-sand ${i === 0 ? 'row-span-2' : ''}`}
            >
              <div className={`relative w-full ${i === 0 ? 'h-full min-h-[500px]' : img.aspect}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-cream text-sm font-display">{img.caption}</p>
                  <div className="flex items-center gap-1 text-gold-300 text-xs mt-1">
                    <span>Discover</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
