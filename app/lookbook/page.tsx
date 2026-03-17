import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lookbook | Djellaba',
  description: 'The Djellaba editorial — heritage reimagined for the contemporary wardrobe.',
}

const images = [
  { src: '/images/products/marron/front-with-model.png', alt: 'Djellaba Marron — Front', href: '/products/djellaba-marron-classique?color=marron', label: 'The Marron Edit', col: 'col-span-2 row-span-2' },
  { src: '/images/products/cream/front-with-model.png', alt: 'Djellaba Cream — Front', href: '/products/djellaba-marron-classique?color=cream', label: 'Heritage Cream', col: '' },
  { src: '/images/products/marron/back-with-model.png', alt: 'Djellaba Marron — Back', href: '/products/djellaba-marron-classique', label: 'Rear Study', col: '' },
  { src: '/images/products/cream/left-with-model.png', alt: 'Djellaba Cream — Left', href: '/products/djellaba-marron-classique?color=cream', label: 'Profile', col: '' },
  { src: '/images/products/marron/right-with-model.png', alt: 'Djellaba Marron — Right', href: '/products/djellaba-marron-classique', label: 'Side View', col: '' },
  { src: '/images/products/cream/back-with-model.png', alt: 'Djellaba Cream — Back', href: '/products/djellaba-marron-classique?color=cream', label: 'Clean Back', col: '' },
]

export default function LookbookPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="bg-brown-900 py-20 px-6 lg:px-10 text-center">
        <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-400 mb-4">
          Editorial
        </p>
        <h1 className="font-display text-display-xl text-cream mb-4">Lookbook</h1>
        <p className="text-brown-400 text-base max-w-md mx-auto">
          Season One — The Founding Collection
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <Link
              key={i}
              href={img.href}
              className={`group relative overflow-hidden rounded-2xl bg-sand ${img.col || ''} ${i === 0 ? 'col-span-2 row-span-2' : 'aspect-[3/4]'}`}
            >
              <div className={`relative w-full ${i === 0 ? 'aspect-[3/4]' : 'h-full'} overflow-hidden`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes={i === 0 ? '50vw' : '25vw'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-cream text-sm font-display">{img.label}</p>
                  <div className="flex items-center gap-1 text-gold-300 text-xs mt-0.5">
                    Shop <ArrowRight size={10} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-20">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brown-800 text-cream text-sm font-medium tracking-[0.1em] uppercase rounded-xl hover:bg-brown-700 transition-colors shadow-luxury group"
        >
          Shop the Collection
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
