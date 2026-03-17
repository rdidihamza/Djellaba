'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/lib/store'
import { useWishlistStore } from '@/lib/store'
import { MegaMenu } from './MegaMenu'
import { MobileNav } from './MobileNav'
import { megaMenu } from '@/data/navigation'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cartItems = useCartStore((s) => s.items)
  const openCart = useCartStore((s) => s.openCart)
  const wishlistItems = useWishlistStore((s) => s.items)

  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMegaEnter = (id: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setActiveMega(id)
  }

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-luxury border-b border-gold-100'
            : 'bg-cream/90 backdrop-blur-sm'
        )}
        style={{ height: 72 }}
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-10 h-full flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 font-display text-2xl font-light tracking-[0.15em] text-brown-800 hover:text-brown-600 transition-colors duration-200 uppercase"
            aria-label="Djellaba — Home"
          >
            Djellaba
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0" aria-label="Main navigation">
            {megaMenu.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => handleMegaEnter(item.id)}
                onMouseLeave={handleMegaLeave}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-5 py-2 text-[13px] font-medium tracking-[0.1em] uppercase transition-colors duration-200',
                    activeMega === item.id
                      ? 'text-brown-800'
                      : 'text-brown-600 hover:text-brown-800'
                  )}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-brown-600 hover:text-brown-800 hover:bg-sand transition-all duration-200"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-brown-600 hover:text-brown-800 hover:bg-sand transition-all duration-200"
              aria-label={`Wishlist (${wishlistItems.length} items)`}
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-gold-500 rounded-full text-[9px] font-semibold text-white flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-brown-600 hover:text-brown-800 hover:bg-sand transition-all duration-200"
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brown-800 rounded-full text-[9px] font-semibold text-white flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-brown-600 hover:text-brown-800 hover:bg-sand transition-all duration-200 ml-1"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-gold-100 bg-cream px-6 lg:px-10 py-3 flex items-center gap-3">
            <Search size={16} className="text-brown-400 flex-shrink-0" />
            <input
              type="search"
              placeholder="Search djellabas, kaftans, collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent text-sm text-brown-800 placeholder-brown-300 outline-none font-sans"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchOpen(false)
                if (e.key === 'Enter' && searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                }
              }}
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-brown-400 hover:text-brown-800 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </header>

      {/* Mega Menu Dropdown */}
      {activeMega && (
        <div
          onMouseEnter={() => handleMegaEnter(activeMega)}
          onMouseLeave={handleMegaLeave}
          className="fixed top-[72px] left-0 right-0 z-40"
        >
          <MegaMenu section={megaMenu.find((m) => m.id === activeMega)!} />
        </div>
      )}

      {/* Mobile Nav */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
