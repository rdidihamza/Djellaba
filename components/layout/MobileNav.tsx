'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  {
    label: 'Collections',
    href: '/collections',
    sub: [
      { label: 'Djellabas', href: '/collections/djellabas' },
      { label: 'Kaftans', href: '/collections/kaftans' },
      { label: 'Gandouras', href: '/collections/gandouras' },
      { label: 'Jabador', href: '/collections/jabador' },
    ],
  },
  { label: 'Men', href: '/collections/men' },
  { label: 'Women', href: '/collections/women' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Craftsmanship', href: '/craftsmanship' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
]

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-brown-950/40 cart-overlay transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-80 bg-cream shadow-luxury-xl transition-transform duration-300 ease-out flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-gold-100">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-xl font-light tracking-[0.15em] text-brown-800 uppercase"
          >
            Djellaba
          </Link>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-brown-500 hover:text-brown-800 hover:bg-sand transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-3 rounded-lg text-brown-700 hover:text-brown-900 hover:bg-sand transition-all duration-200 group"
                >
                  <span className="font-sans text-sm font-medium tracking-wide">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-brown-400 group-hover:text-brown-600 transition-colors"
                  />
                </Link>
                {item.sub && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.sub.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={onClose}
                          className="block px-3 py-2 text-xs text-brown-500 hover:text-brown-800 tracking-wide transition-colors duration-200"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="px-6 py-6 border-t border-gold-100 space-y-3">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="block text-center py-3 border border-gold-200 rounded-lg text-sm text-brown-700 hover:bg-sand transition-all duration-200 tracking-wide"
          >
            Wishlist
          </Link>
          <div className="flex gap-4 text-[11px] text-brown-400 justify-center">
            <Link href="/faq" onClick={onClose} className="hover:text-brown-700 transition-colors">FAQ</Link>
            <Link href="/contact" onClick={onClose} className="hover:text-brown-700 transition-colors">Contact</Link>
            <Link href="/policies/shipping" onClick={onClose} className="hover:text-brown-700 transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </>
  )
}
