import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Djellaba',
  description:
    'The story behind Djellaba — Moroccan heritage, modern luxury, and the craft that connects them.',
}

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="relative bg-brown-900 py-28 px-6 lg:px-10 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center text-cream relative z-10">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-400 mb-5">
            Our Story
          </p>
          <h1 className="font-display text-display-xl text-cream mb-6">
            Moroccan roots.
            <br />
            <em className="text-gold-300 not-italic">Timeless intention.</em>
          </h1>
          <p className="text-brown-300 text-lg leading-relaxed">
            Djellaba is a modern expression of Moroccan craft — built for those who wear tradition
            with quiet confidence.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-20 space-y-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-display-sm text-brown-900 mb-5">
              Why we started
            </h2>
            <div className="space-y-4 text-brown-600 leading-relaxed">
              <p>
                Moroccan garments carry a precision that most fashion doesn&apos;t — an understanding
                of drape, proportion, and fabric that comes from centuries of refinement. We started
                Djellaba because that craftsmanship deserved a proper home.
              </p>
              <p>
                Our pieces are made for the wearer who wants to dress traditionally without
                compromise — who understands that true luxury is in the construction, not the logo.
              </p>
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
              src="/images/products/marron/front-with-model.png"
              alt="Djellaba Marron — About the brand"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="text-center py-10 border-y border-gold-100">
          <p className="font-display text-3xl lg:text-4xl text-brown-900 italic">
            &ldquo;Designed with the patience that good craft demands.&rdquo;
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: 'Heritage', text: 'Every silhouette traces a lineage. We design with respect for form, not for fashion cycles.' },
            { label: 'Craft', text: 'Our atelier partners have been working in traditional Moroccan tailoring for generations.' },
            { label: 'Restraint', text: 'We believe the best detail is the one you notice only on the second look.' },
          ].map((item) => (
            <div key={item.label} className="border-l-2 border-gold-300 pl-5">
              <h3 className="font-display text-lg text-brown-900 mb-2">{item.label}</h3>
              <p className="text-sm text-brown-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/craftsmanship"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brown-800 text-cream text-sm font-medium tracking-[0.1em] uppercase rounded-xl hover:bg-brown-700 transition-colors shadow-luxury group"
          >
            Explore Our Craft
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
