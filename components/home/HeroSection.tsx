'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'

const slides = [
  {
    video: '/videos/hero-1.mp4',
    headline: 'Worn with',
    headlineAccent: 'Intention.',
    sub: 'Djellabas refined for the modern wardrobe — heritage tailoring, elevated.',
    cta: { label: 'Shop Collection', href: '/collections/men' },
    ctaSecondary: { label: 'Explore New Arrivals', href: '/collections/new-arrivals' },
  },
  {
    video: '/videos/hero-2.mp4',
    headline: 'Moroccan Heritage,',
    headlineAccent: 'Modern Luxury.',
    sub: 'Each garment carries the quiet precision of Moroccan craftsmanship.',
    cta: { label: 'Discover the Craft', href: '/craftsmanship' },
    ctaSecondary: { label: 'View Lookbook', href: '/lookbook' },
  },
]

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [playing, setPlaying] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slide = slides[activeSlide]

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handlePlayPause = () => {
    const video = videoRefs.current[activeSlide]
    if (!video) return
    if (playing) {
      video.pause()
    } else {
      video.play()
    }
    setPlaying(!playing)
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-brown-900">
      {/* Video Backgrounds */}
      {slides.map((s, i) => (
        <video
          key={i}
          ref={(el) => { videoRefs.current[i] = el }}
          src={s.video}
          autoPlay
          muted
          loop
          playsInline
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000',
            i === activeSlide ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-950/30 via-brown-950/20 to-brown-950/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-16 max-w-8xl mx-auto w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p
            key={`eyebrow-${activeSlide}`}
            className="text-gold-300/90 text-[11px] font-medium tracking-[0.3em] uppercase mb-5 animate-fade-up"
          >
            Heritage Collection
          </p>

          {/* Headline */}
          <h1
            key={`h1-${activeSlide}`}
            className="font-display text-5xl lg:text-7xl text-cream leading-[1.05] mb-4 animate-fade-up"
          >
            {slide.headline}
            <br />
            <em className="text-gold-300 not-italic">{slide.headlineAccent}</em>
          </h1>

          {/* Sub */}
          <p
            key={`sub-${activeSlide}`}
            className="text-cream/75 text-base lg:text-lg mb-8 max-w-md leading-relaxed animate-fade-up"
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            key={`cta-${activeSlide}`}
            className="flex flex-wrap gap-3 animate-fade-up"
          >
            <Link
              href={slide.cta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-cream text-brown-900 text-sm font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-gold-100 transition-all duration-200 shadow-luxury"
            >
              {slide.cta.label}
              <ArrowRight size={14} />
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-cream border border-cream/40 text-sm font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-cream/10 transition-all duration-200"
            >
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Slide indicators + Play/Pause */}
        <div className="absolute bottom-8 right-6 lg:right-16 flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-cream/30 text-cream/60 hover:text-cream hover:border-cream/60 transition-all duration-200"
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === activeSlide
                    ? 'w-8 h-1.5 bg-gold-400'
                    : 'w-1.5 h-1.5 bg-cream/30 hover:bg-cream/60'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
