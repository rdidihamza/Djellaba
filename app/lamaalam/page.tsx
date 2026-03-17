import type { Metadata } from 'next'
import { Studio } from '@/components/lamaalam/Studio'
import { StudioErrorBoundary } from '@/components/lamaalam/StudioErrorBoundary'
import Link from 'next/link'
import { ArrowRight, Scissors, Layers, Sparkles, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lamaalam — Design Your Djellaba | Atelier Numérique',
  description:
    'Compose your bespoke djellaba by placing terza strips, geometric medallions, and embroidery motifs inspired by centuries of Moroccan artisanal tradition. Design freely, order with confidence.',
  openGraph: {
    title: 'Lamaalam — Moroccan Djellaba Design Studio',
    description:
      'A digital atelier for composing bespoke djellabas with authentic Moroccan motifs. Drag, place, and order.',
    type: 'website',
  },
}

// ─────────────────────────────────────────────────────────────
// Hero section
// ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative pt-16 pb-14 px-6 lg:px-10 text-center overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-gradient-radial from-gold-100/25 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Eyebrow */}
      <p className="relative text-[11px] tracking-[0.3em] uppercase text-gold-600 mb-5 font-medium">
        Atelier Numérique
      </p>

      {/* Title */}
      <h1 className="relative font-display text-[4rem] lg:text-[5.5rem] text-brown-900 leading-none tracking-[-0.02em] mb-5">
        Lamaalam
      </h1>

      {/* Arabic subtitle */}
      <p className="relative font-display text-xl text-gold-600 italic mb-6 tracking-wide" dir="rtl">
        لمعلم — الحرفة المغربية
      </p>

      {/* Description */}
      <p className="relative max-w-xl mx-auto text-[15px] lg:text-[16px] text-brown-500 leading-relaxed font-sans mb-3">
        Compose your djellaba by placing terza strips, geometric medallions, and
        embroidery motifs — each one drawn from centuries of Moroccan artisanal tradition.
      </p>
      <p className="relative max-w-lg mx-auto text-[13px] text-brown-400 leading-relaxed font-sans">
        Design your vision with complete freedom. Our master craftsmen will bring every
        stitch to life using authentic Moroccan techniques.
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

// ─────────────────────────────────────────────────────────────
// Craftsmanship section
// ─────────────────────────────────────────────────────────────

function CraftsmanshipSection() {
  const features = [
    {
      icon: <Layers size={22} strokeWidth={1.5} />,
      number: '01',
      title: 'Choose your motifs',
      body: 'Browse terza strips, geometric medallions, neckline ornaments, and embroidery bands — all drawn from authentic Moroccan craft traditions.',
    },
    {
      icon: <Scissors size={22} strokeWidth={1.5} />,
      number: '02',
      title: 'Compose freely',
      body: 'Drag, scale, rotate and layer each element on the djellaba canvas. Adjust opacity, flip for symmetry, and lock elements in place.',
    },
    {
      icon: <Sparkles size={22} strokeWidth={1.5} />,
      number: '03',
      title: 'Export or order',
      body: 'Download a high-resolution PNG preview of your design, or submit it as a custom order request directly to our atelier.',
    },
    {
      icon: <Package size={22} strokeWidth={1.5} />,
      number: '04',
      title: 'Crafted by artisans',
      body: 'Our master craftsmen review your composition and handcraft every stitch using traditional Moroccan terza weaving and embroidery techniques.',
    },
  ]

  return (
    <section className="py-20 px-6 lg:px-10 bg-brown-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-600 mb-3">How it works</p>
          <h2 className="font-display text-display-md text-cream leading-tight">
            From vision to crafted garment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.number}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-brown-700/60 bg-brown-800/40 hover:border-gold-800/60 transition-colors"
            >
              {/* Number badge */}
              <div className="w-10 h-10 rounded-full border border-gold-800/50 flex items-center justify-center mb-4">
                <span className="font-display text-sm text-gold-600">{f.number}</span>
              </div>
              {/* Icon */}
              <div className="text-gold-600 mb-4">{f.icon}</div>
              <h3 className="font-display text-base text-cream mb-2 leading-snug">{f.title}</h3>
              <p className="text-[12px] text-brown-400 leading-relaxed font-sans">{f.body}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-gold-800" />
          <span className="text-gold-700 text-sm">✦</span>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-gold-800" />
        </div>

        {/* Quote */}
        <div className="mt-12 text-center">
          <blockquote className="font-display text-xl lg:text-2xl text-gold-300 italic leading-relaxed max-w-2xl mx-auto">
            &ldquo;Each stitch of terza is a dialogue between the craftsman and the cloth —
            a language passed from hand to hand across generations.&rdquo;
          </blockquote>
          <p className="text-[11px] text-brown-500 mt-4 tracking-[0.15em] uppercase">
            — Moroccan atelier tradition
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// CTA section
// ─────────────────────────────────────────────────────────────

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
      <section className="px-4 lg:px-10 pb-16 max-w-[1440px] mx-auto">
        <StudioErrorBoundary>
          <Studio />
        </StudioErrorBoundary>
      </section>

      <CraftsmanshipSection />
      <CtaSection />
    </div>
  )
}
