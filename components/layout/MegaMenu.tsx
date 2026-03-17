import Link from 'next/link'
import Image from 'next/image'
import type { MegaMenuSection } from '@/types'

interface MegaMenuProps {
  section: MegaMenuSection
}

export function MegaMenu({ section }: MegaMenuProps) {
  return (
    <div className="bg-cream border-b border-gold-100 shadow-luxury-lg animate-fade-in">
      <div className="max-w-8xl mx-auto px-10 py-10">
        <div className="flex gap-16">
          {/* Columns */}
          <div className="flex gap-14 flex-1">
            {section.columns.map((col, i) => (
              <div key={i} className="min-w-[140px]">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brown-400 mb-5">
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-brown-700 hover:text-brown-900 link-luxury transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Image */}
          {section.featuredImage && (
            <Link
              href={section.featuredImage.href}
              className="group flex-shrink-0 w-56 overflow-hidden rounded-xl"
            >
              <div className="relative h-72 w-full overflow-hidden rounded-xl bg-sand">
                <Image
                  src={section.featuredImage.src}
                  alt={section.featuredImage.alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="224px"
                />
                {section.featuredImage.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-900/60 to-transparent p-4">
                    <p className="text-white/90 text-xs font-medium tracking-wide">
                      {section.featuredImage.caption}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
