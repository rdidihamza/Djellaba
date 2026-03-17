'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import { useWishlistStore, useCartStore } from '@/lib/store'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [activeColor, setActiveColor] = useState(0)
  const [hovered, setHovered] = useState(false)
  const { toggle, isInWishlist } = useWishlistStore()
  const { addItem } = useCartStore()

  const color = product.colors[activeColor]
  const primaryImage = color.images.find(
    (img) => img.angle === 'front' && img.variant === 'with-model'
  ) || color.images[0]
  const hoverImage = color.images.find(
    (img) => img.angle === 'back' && img.variant === 'with-model'
  ) || color.images[1] || primaryImage

  const inWishlist = isInWishlist(product.id, color.slug)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colorSlug: color.slug,
      colorName: color.name,
      colorHex: color.hex,
      price: product.price,
      image: primaryImage.src,
      addedAt: new Date().toISOString(),
    })
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    const defaultSize = product.sizes.find((s) => s.available)
    if (!defaultSize) return
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colorSlug: color.slug,
      colorName: color.name,
      colorHex: color.hex,
      size: defaultSize.label,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity: 1,
      image: primaryImage.src,
    })
  }

  return (
    <div
      className={cn('group relative flex flex-col', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}?color=${color.slug}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-sand">
          {/* Primary Image */}
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className={cn(
              'object-cover object-top transition-opacity duration-500',
              hovered ? 'opacity-0' : 'opacity-100'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover Image */}
          <Image
            src={hoverImage.src}
            alt={hoverImage.alt}
            fill
            className={cn(
              'object-cover object-top transition-opacity duration-500',
              hovered ? 'opacity-100' : 'opacity-0'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-brown-800 text-cream text-[10px] font-medium tracking-[0.1em] uppercase rounded">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2.5 py-1 bg-gold-500 text-brown-950 text-[10px] font-medium tracking-[0.1em] uppercase rounded">
                Best Seller
              </span>
            )}
            {product.compareAtPrice && (
              <span className="px-2.5 py-1 bg-brown-600 text-cream text-[10px] font-medium tracking-[0.1em] uppercase rounded">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={cn(
              'absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-cream/80 backdrop-blur-sm transition-all duration-200',
              inWishlist
                ? 'text-brown-800'
                : 'text-brown-400 opacity-0 group-hover:opacity-100'
            )}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={15}
              strokeWidth={1.5}
              className={cn(inWishlist && 'fill-current')}
            />
          </button>

          {/* Quick Add */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 p-3 transition-transform duration-300 ease-out',
              hovered ? 'translate-y-0' : 'translate-y-full'
            )}
          >
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 bg-brown-900/90 backdrop-blur-sm text-cream text-xs font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-brown-900 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={13} strokeWidth={1.5} />
              Quick Add
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 space-y-2">
        {/* Color swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5">
            {product.colors.map((c, i) => (
              <button
                key={c.slug}
                onClick={() => setActiveColor(i)}
                className={cn(
                  'w-4 h-4 rounded-full border-2 transition-all duration-150',
                  i === activeColor
                    ? 'border-brown-700 scale-110'
                    : 'border-transparent hover:border-brown-300'
                )}
                style={{ backgroundColor: c.hex }}
                aria-label={`Select ${c.name}`}
                title={c.name}
              />
            ))}
          </div>
        )}

        <Link href={`/products/${product.slug}?color=${color.slug}`}>
          <h3 className="font-display text-base text-brown-900 hover:text-brown-600 transition-colors leading-tight">
            {product.name}
          </h3>
          {product.subtitle && (
            <p className="text-xs text-brown-400 mt-0.5">{product.subtitle}</p>
          )}
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="font-sans text-sm font-medium text-brown-900">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-brown-400 line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
