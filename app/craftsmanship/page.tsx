import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Craftsmanship | Djellaba',
  description:
    'The art of Moroccan tailoring — fabric, construction, and finishing that endures.',
}

export default function CraftsmanshipPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="relative bg-brown-900 py-24 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center text-cream">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-400 mb-5">
            The Process
          </p>
          <h1 className="font-display text-display-xl text-cream mb-6">
            Craftsmanship
          </h1>
          <p className="text-brown-300 text-lg leading-relaxed">
            Every garment is a collaboration between tradition and intention.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
        <div className="space-y-20">
          {[
            {
              step: '01',
              title: 'Fabric Selection',
              body: 'We source only from Moroccan mills with a proven record of quality — wool blends, breathable linens, and structured weaves that hold their shape across years of wear. Each fabric is chosen for its drape, its hand, and its longevity.',
              image: '/images/products/marron/front-without-model.png',
              flip: false,
            },
            {
              step: '02',
              title: 'Pattern & Cut',
              body: 'Our patterns are developed by artisans with decades of experience in traditional Moroccan silhouettes. The cut is the foundation — a generous, fluid form that moves with the body without clinging to it.',
              image: '/images/products/cream/front-without-model.png',
              flip: true,
            },
            {
              step: '03',
              title: 'Hand Finishing',
              body: 'Every placket, neckline, and hem is finished by hand. The stitching is tonal, precise, and deliberate. We don\'t add embellishment for its own sake — every detail has a structural or aesthetic purpose.',
              image: '/images/products/marron/back-without-model.png',
              flip: false,
            },
            {
              step: '04',
              title: 'Quality Control',
              body: 'Each piece is inspected by hand before it leaves the atelier — seams checked, pressing verified, and overall form assessed against our standard. Only pieces that meet the full criteria are shipped.',
              image: '/images/products/cream/back-without-model.png',
              flip: true,
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`grid md:grid-cols-2 gap-12 items-center ${item.flip ? 'md:[direction:rtl]' : ''}`}
            >
              <div className={item.flip ? 'md:[direction:ltr]' : ''}>
                <p className="font-display text-6xl text-gold-200 font-light mb-4">{item.step}</p>
                <h2 className="font-display text-display-sm text-brown-900 mb-4">{item.title}</h2>
                <p className="text-brown-600 leading-relaxed text-base">{item.body}</p>
              </div>
              <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden ${item.flip ? 'md:[direction:ltr]' : ''}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
