import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const pillars = [
  {
    title: 'Heritage Fabric',
    description:
      'Sourced from traditional Moroccan mills, our fabrics carry centuries of weaving knowledge — breathable, resilient, and effortlessly draped.',
  },
  {
    title: 'Atelier Tailoring',
    description:
      'Each garment is cut and finished by hand in our Moroccan atelier, where precision and patience are the only tools that matter.',
  },
  {
    title: 'Tonal Detailing',
    description:
      'We work in restraint. Plackets, necklines, and hems are finished with tonal stitching — detail that rewards a closer look.',
  },
  {
    title: 'Lasting Construction',
    description:
      'Seams are pressed from the inside, seams are reinforced, and every finishing cut is deliberate — designed to wear beautifully for years.',
  },
]

export function CraftsmanshipSection() {
  return (
    <section className="py-20 lg:py-28 bg-brown-900 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden col-span-1 mt-8">
                <Image
                  src="/images/products/marron/front-without-model.png"
                  alt="Craftsmanship detail — front"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden col-span-1">
                <Image
                  src="/images/products/marron/back-without-model.png"
                  alt="Craftsmanship detail — back"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            {/* Accent card */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold-500 text-brown-950 rounded-xl px-6 py-3 shadow-gold-lg whitespace-nowrap">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase">
                Handcrafted in Morocco
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="text-cream">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-400 mb-5">
              The Craft
            </p>
            <h2 className="font-display text-display-lg text-cream leading-tight mb-6">
              Where tradition meets
              <br />
              <em className="text-gold-300 not-italic">modern refinement.</em>
            </h2>
            <p className="text-brown-300 text-base leading-relaxed mb-10 max-w-md">
              Moroccan tailoring carries a quiet intelligence — garments shaped not by trend,
              but by centuries of understanding how fabric moves, breathes, and ages. Our pieces
              honor that lineage while speaking to a contemporary sensibility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="border-l-2 border-gold-700 pl-4">
                  <h3 className="font-display text-base text-gold-200 mb-1.5">{pillar.title}</h3>
                  <p className="text-sm text-brown-400 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>

            <Link
              href="/craftsmanship"
              className="inline-flex items-center gap-2 text-sm text-gold-300 hover:text-gold-100 transition-colors group font-medium tracking-wide"
            >
              Explore Our Process
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
