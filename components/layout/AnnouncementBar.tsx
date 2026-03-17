'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'


const messages = [
  {
    text: 'Complimentary shipping on all orders over 500 MAD',
    cta: { label: 'Shop Now', href: '/collections' },
  },
  {
    text: 'New arrivals — Gandoura Noir Brodé & Jabador Vert Royal',
    cta: { label: 'Discover', href: '/collections/new-arrivals' },
  },
  {
    text: 'Every piece handcrafted in Morocco — made to endure',
    cta: { label: 'Our Craft', href: '/craftsmanship' },
  },
  {
    text: 'Join the private list — early access to exclusive drops',
    cta: { label: 'Join', href: '/#newsletter' },
  },
]

const BAR_HEIGHT = 38 // px — keep in sync with CSS height

interface AnnouncementBarProps {
  onVisibilityChange: (visible: boolean, height: number) => void
}

export function AnnouncementBar({ onVisibilityChange }: AnnouncementBarProps) {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  // Always visible — notify parent of fixed height on mount
  useEffect(() => {
    onVisibilityChange(true, BAR_HEIGHT)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = useCallback((index: number) => {
    setFading(true)
    setTimeout(() => {
      setActive((index + messages.length) % messages.length)
      setFading(false)
    }, 200)
  }, [])

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const id = setInterval(() => goTo(active + 1), 5000)
    return () => clearInterval(id)
  }, [active, goTo])

  const msg = messages[active]

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 lg:px-8"
      style={{ height: BAR_HEIGHT, background: 'linear-gradient(90deg, #1C0F08 0%, #2C1810 40%, #3D2314 60%, #1C0F08 100%)' }}
      role="region"
      aria-label="Announcement"
    >
      {/* Left ornament / prev button */}
      <div className="flex items-center gap-3 flex-shrink-0 w-[80px]">
        <button
          onClick={() => goTo(active - 1)}
          className="hidden sm:flex w-6 h-6 items-center justify-center text-gold-600 hover:text-gold-300 transition-colors duration-150"
          aria-label="Previous message"
        >
          <ChevronLeft size={13} strokeWidth={2} />
        </button>
        {/* Moroccan star ornament */}
        <span className="hidden md:block text-gold-700 text-[10px] select-none tracking-widest">✦</span>
      </div>

      {/* Message */}
      <div className="flex-1 flex items-center justify-center gap-3 min-w-0 overflow-hidden">
        <p
          className={cn(
            'font-sans text-[11px] lg:text-[12px] tracking-[0.18em] text-gold-200 uppercase text-center leading-none whitespace-nowrap transition-opacity duration-200',
            fading ? 'opacity-0' : 'opacity-100'
          )}
        >
          {msg.text}
        </p>
        {msg.cta && (
          <Link
            href={msg.cta.href}
            className={cn(
              'hidden sm:inline-flex items-center gap-1 flex-shrink-0 text-[10px] tracking-[0.2em] uppercase text-gold-400 border-b border-gold-700 hover:text-gold-200 hover:border-gold-400 transition-all duration-200 pb-px leading-none',
              fading ? 'opacity-0' : 'opacity-100'
            )}
          >
            {msg.cta.label}
          </Link>
        )}
      </div>

      {/* Right: indicators + close */}
      <div className="flex items-center gap-3 flex-shrink-0 w-[80px] justify-end">
        {/* Dot indicators */}
        <div className="hidden sm:flex items-center gap-1">
          {messages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'rounded-full transition-all duration-300',
                i === active
                  ? 'w-3.5 h-1 bg-gold-500'
                  : 'w-1 h-1 bg-gold-800 hover:bg-gold-600'
              )}
              aria-label={`Go to message ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(active + 1)}
          className="sm:hidden flex w-6 h-6 items-center justify-center text-gold-600 hover:text-gold-300 transition-colors"
          aria-label="Next message"
        >
          <ChevronRight size={13} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
