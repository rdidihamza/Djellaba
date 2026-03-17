import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, RotateCcw, ZoomIn, Maximize2 } from 'lucide-react'

const features = [
  {
    icon: RotateCcw,
    title: '360° Rotation',
    description: 'Spin the garment and inspect every angle from your screen.',
  },
  {
    icon: ZoomIn,
    title: 'Detail Zoom',
    description: 'Examine stitching, placket, and fabric texture up close.',
  },
  {
    icon: Maximize2,
    title: 'Full-Screen View',
    description: 'Expand to full screen for an immersive product experience.',
  },
]

export function Experience3DSection() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-brown-900 overflow-hidden">
      <div className="max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-cream order-2 lg:order-1">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-400 mb-5">
              Immersive Shopping
            </p>
            <h2 className="font-display text-display-lg text-cream leading-tight mb-5">
              Inspect every angle.
              <br />
              <em className="text-gold-300 not-italic">Before you decide.</em>
            </h2>
            <p className="text-brown-300 text-base leading-relaxed mb-8 max-w-md">
              We believe you should know exactly what you&apos;re wearing before it arrives.
              Our angle-based viewer lets you study the silhouette, fabric drape, and detailing
              from every perspective — on model and flat.
            </p>

            <div className="space-y-5 mb-10">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon size={16} className="text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-cream mb-0.5">{f.title}</h3>
                    <p className="text-sm text-brown-400">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/products/djellaba-marron-classique"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold-500 text-brown-950 text-sm font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-gold-400 transition-colors shadow-gold-lg group"
            >
              Try it on the Marron Classique
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Visual */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/products/marron/front-without-model.png"
                alt="Djellaba product view — angle switcher experience"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Angle Indicator overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Angle pills */}
                {['Front', 'Back', 'Left', 'Right'].map((label, i) => {
                  const positions = [
                    'bottom-24 left-1/2 -translate-x-1/2',
                    'bottom-14 left-1/2 -translate-x-1/2 opacity-50',
                    'bottom-8 left-1/2 -translate-x-1/2 opacity-30',
                    'bottom-2 left-1/2 -translate-x-1/2 opacity-15',
                  ]
                  return (
                    <div
                      key={label}
                      className={`absolute ${positions[i]} px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${i === 0 ? 'bg-gold-500 text-brown-950' : 'bg-brown-900/60 text-cream/70'} transition-all`}
                    >
                      {label}
                    </div>
                  )
                })}
              </div>

              {/* Top badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-brown-900/80 backdrop-blur-sm text-cream text-[10px] tracking-[0.15em] uppercase rounded-lg">
                Multi-Angle View
              </div>
            </div>

            {/* Floating thumbnail strip */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {[
                '/images/products/marron/front-without-model.png',
                '/images/products/marron/back-without-model.png',
                '/images/products/marron/left-without-model.png',
                '/images/products/marron/right-without-model.png',
              ].map((src, i) => (
                <div
                  key={i}
                  className={`relative w-12 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === 0 ? 'border-gold-400 shadow-gold' : 'border-brown-700/60 opacity-70'}`}
                >
                  <Image
                    src={src}
                    alt={`Angle ${i}`}
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
