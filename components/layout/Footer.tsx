import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'
import { footerLinks } from '@/data/navigation'

export function Footer() {
  return (
    <footer className="bg-brown-900 text-brown-200">
      {/* Main */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="inline-block font-display text-2xl font-light tracking-[0.2em] text-cream uppercase hover:text-gold-300 transition-colors"
            >
              Djellaba
            </Link>
            <p className="text-sm text-brown-400 leading-relaxed max-w-xs">
              Refined Moroccan garments for the modern wardrobe. Each piece carries the weight
              of heritage and the lightness of intention.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-brown-700 text-brown-400 hover:border-gold-500 hover:text-gold-400 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={15} strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-brown-700 text-brown-400 hover:border-gold-500 hover:text-gold-400 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={15} strokeWidth={1.5} />
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-brown-700 text-brown-400 hover:border-gold-500 hover:text-gold-400 transition-all duration-200"
                aria-label="TikTok"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.84 4.84 0 0 1-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brown-500 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brown-400 hover:text-cream transition-colors duration-200 link-luxury"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brown-500 mb-5">
              Brand
            </h4>
            <ul className="space-y-3">
              {footerLinks.brand.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brown-400 hover:text-cream transition-colors duration-200 link-luxury"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brown-500 mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brown-400 hover:text-cream transition-colors duration-200 link-luxury"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-brown-800">
        <div className="max-w-8xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brown-500 tracking-wide">
            © {new Date().getFullYear()} Djellaba. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-brown-500 hover:text-brown-300 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
