import type { Metadata } from 'next'
import { Studio } from '@/components/lamaalam/Studio'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lamaalam — Design Your Djellaba',
  description:
    'Compose your djellaba with terza and decorative elements inspired by traditional Moroccan craftsmanship. A bespoke digital atelier.',
}

// ─────────────────────────────────────────────────────────────
// Static sections
// ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative pt-16 pb-14 px-6 lg:px-10 text-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-gold-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Eyebrow */}
      <p className="relative text-[11px] tracking-[0.3em] uppercase text-gold-600 mb-4 font-medium">
        Atelier Numérique
      </p>

      {/* Title */}
      <h1 className="relative font-display text-display-xl lg:text-[5rem] text-brown-900 leading-none tracking-[-0.02em] mb-5">
        Lamaalam
      </h1>

      {/* Arabic subtitle */}
      <p className="relative font-display text-xl text-gold-600 italic mb-6 tracking-wide" dir="rtl">
        لمعلم — الحرفة المغربية
      </p>

      {/* Description */}
      <p className="relative max-w-xl mx-auto text-[15px] lg:text-base text-brown-500 leading-relaxed font-sans mb-3">
        This studio lets you compose your djellaba by placing terza and decorative elements
        inspired by centuries of Moroccan craftsmanship.
      </p>
      <p className="relative max-w-lg mx-auto text-[13px] text-brown-400 leading-relaxed font-sans">
        Each motif — from the khatam star to the hand-woven sfifa braid — reflects an unbroken
        tradition of artisanal mastery. Design your vision. We will bring it to life.
      </p>

      {/* Divider ornament */}
      <div className="relative flex items-center justify-center gap-4 mt-10">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold-300" />
        <span className="text-gold-500 text-xs">✦</span>
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold-300" />
      </div>
    </section>
  )
}

function CraftsmanshipSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose your motifs',
      body: 'Browse our library of terza strips, geometric medallions, neckline ornaments, and embroidery bands — all drawn from authentic Moroccan craft traditions.',
    },
    {
      number: '02',
      title: 'Compose freely',
      body: 'Drag, scale, rotate and layer each element on the djellaba canvas. Adjust opacity, flip for symmetry, and find the perfect composition.',
    },
    {
      number: '03',
      title: 'Request the design',
      body: 'Once satisfied, submit your design as a custom order. Our artisans will review your composition and bring it to life using traditional techniques.',
    },
  ]

  return (
    <section className="py-20 px-6 lg:px-10 bg-brown-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-600 mb-3">How it works</p>
          <h2 className="font-display text-display-md text-cream leading-tight">
            From vision to crafted garment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s) => (
            <div key={s.number} className="text-center">
              <span className="font-display text-4xl text-gold-700 block mb-4">{s.number}</span>
              <h3 className="font-display text-xl text-cream mb-3">{s.title}</h3>
              <p className="text-[13px] text-brown-300 leading-relaxed font-sans">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mt-14">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-gold-800" />
          <span className="text-gold-700 text-sm">✦</span>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-gold-800" />
        </div>

        {/* Craftsmanship note */}
        <div className="mt-12 text-center">
          <blockquote className="font-display text-xl lg:text-2xl text-gold-300 italic leading-relaxed max-w-2xl mx-auto">
            "Each stitch of terza is a dialogue between the craftsman and the cloth — a language
            passed from hand to hand across generations."
          </blockquote>
          <p className="text-[11px] text-brown-500 mt-4 tracking-[0.15em] uppercase">
            — Moroccan atelier tradition
          </p>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-16 px-6 lg:px-10 bg-cream text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-[11px] tracking-[0.25em] uppercase text-gold-600 mb-3">Bespoke Orders</p>
        <h2 className="font-display text-display-md text-brown-900 mb-5 leading-tight">
          Ready for a fully custom piece?
        </h2>
        <p className="text-[14px] text-brown-500 leading-relaxed mb-8">
          Our master artisans work directly from your Lamaalam design.
          Every element is hand-applied using traditional Moroccan embroidery and weaving techniques.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brown-800 hover:bg-brown-900 text-cream text-[13px] tracking-[0.1em] uppercase font-medium transition-all duration-200 shadow-luxury-lg"
          >
            Contact the Atelier <ArrowRight size={14} />
          </Link>
          <Link
            href="/craftsmanship"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gold-300 text-brown-700 hover:border-gold-500 hover:text-brown-900 text-[13px] tracking-[0.1em] uppercase font-medium transition-all duration-200"
          >
            Our Craft
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function LamaalamPage() {
  return (
    <div className="bg-cream min-h-screen">
      <HeroSection />

      {/* Studio section */}
      <section className="px-6 lg:px-10 pb-16 max-w-[1400px] mx-auto">
        <Studio />
      </section>

      <CraftsmanshipSection />
      <CtaSection />
    </div>
  )
}
