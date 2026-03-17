'use client'

import { useState } from 'react'
import { Minus, Plus, Heart, ShoppingBag, Star, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice, formatDiscount } from '@/lib/utils'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types'

interface ProductInfoPanelProps {
  product: Product
  activeColorSlug: string
  onColorChange: (slug: string) => void
}

export function ProductInfoPanel({
  product,
  activeColorSlug,
  onColorChange,
}: ProductInfoPanelProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const { addItem } = useCartStore()
  const { toggle, isInWishlist } = useWishlistStore()

  const activeColor = product.colors.find((c) => c.slug === activeColorSlug) || product.colors[0]
  const primaryImage =
    activeColor.images.find((img) => img.angle === 'front' && img.variant === 'with-model') ||
    activeColor.images[0]

  const inWishlist = isInWishlist(product.id, activeColor.slug)
  const discount = product.compareAtPrice
    ? formatDiscount(product.compareAtPrice, product.price)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colorSlug: activeColor.slug,
      colorName: activeColor.name,
      colorHex: activeColor.hex,
      size: selectedSize,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity,
      image: primaryImage.src,
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  const handleWishlist = () => {
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colorSlug: activeColor.slug,
      colorName: activeColor.name,
      colorHex: activeColor.hex,
      price: product.price,
      image: primaryImage.src,
      addedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="space-y-7">
      {/* Breadcrumb-style category */}
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-brown-400">
        {product.collection[0]?.replace('-', ' ')} · {product.category}
      </p>

      {/* Name & Subtitle */}
      <div>
        <h1 className="font-display text-display-md text-brown-900 leading-tight">
          {product.name}
        </h1>
        {product.subtitle && (
          <p className="mt-1 text-sm text-brown-400 italic font-display">{product.subtitle}</p>
        )}
      </div>

      {/* Rating */}
      {product.rating && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={cn(
                  i < Math.floor(product.rating!)
                    ? 'text-gold-500 fill-gold-500'
                    : 'text-brown-300'
                )}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-xs text-brown-400">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl text-brown-900">
          {formatPrice(product.price, product.currency)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="text-base text-brown-400 line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
            <span className="px-2 py-0.5 bg-gold-100 text-gold-700 text-xs font-medium rounded">
              −{discount}%
            </span>
          </>
        )}
      </div>

      {/* Short Description */}
      <p className="text-sm text-brown-600 leading-relaxed">{product.shortDescription}</p>

      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-brown-700">
            Color
          </p>
          <span className="text-sm text-brown-500">{activeColor.name}</span>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.slug}
              onClick={() => onColorChange(color.slug)}
              className={cn(
                'relative w-8 h-8 rounded-full border-2 transition-all duration-200',
                color.slug === activeColorSlug
                  ? 'border-brown-800 ring-2 ring-offset-2 ring-brown-800/30'
                  : 'border-transparent hover:border-brown-300'
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-brown-700">
            Size
          </p>
          <button
            onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
            className="text-xs text-brown-400 hover:text-brown-700 transition-colors flex items-center gap-1"
          >
            <Info size={12} />
            Size Guide
          </button>
        </div>

        <div className={cn('flex flex-wrap gap-2', sizeError && 'animate-[shake_0.3s_ease]')}>
          {product.sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => {
                if (size.available) setSelectedSize(size.label)
              }}
              disabled={!size.available}
              className={cn(
                'min-w-[44px] h-10 px-3 rounded-lg border text-sm font-medium transition-all duration-200',
                size.available
                  ? selectedSize === size.label
                    ? 'border-brown-800 bg-brown-800 text-cream'
                    : 'border-gold-200 text-brown-700 hover:border-brown-500 hover:text-brown-900'
                  : 'border-brown-100 text-brown-300 cursor-not-allowed relative overflow-hidden'
              )}
            >
              {size.label}
              {!size.available && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute w-full h-px bg-brown-200 rotate-45" />
                </span>
              )}
            </button>
          ))}
        </div>

        {sizeError && (
          <p className="mt-2 text-xs text-red-500">Please select a size</p>
        )}

        {/* Size Guide Panel */}
        {sizeGuideOpen && (
          <div className="mt-4 p-4 rounded-xl bg-sand border border-gold-200 text-sm">
            <p className="font-medium text-brown-800 mb-3 font-display text-base">Size Guide</p>
            <table className="w-full text-xs text-brown-600">
              <thead>
                <tr className="border-b border-gold-200">
                  <th className="text-left pb-2 font-medium">Size</th>
                  <th className="text-left pb-2 font-medium">Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {product.sizes.map((s) => (
                  <tr key={s.label} className="border-b border-gold-100 last:border-0">
                    <td className="py-1.5">{s.label}</td>
                    <td className="py-1.5">{s.length ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-brown-400 italic">
              This djellaba features a relaxed, full-length fit. We recommend selecting your usual size.
            </p>
          </div>
        )}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-brown-700">Qty</p>
        <div className="flex items-center border border-gold-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-brown-500 hover:text-brown-900 hover:bg-sand transition-all"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm text-brown-900 font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-brown-500 hover:text-brown-900 hover:bg-sand transition-all"
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="text-xs text-brown-400">
          {activeColor.stock} remaining
        </span>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          className={cn(
            'flex-1 transition-all',
            addedFeedback && 'bg-green-700 hover:bg-green-700'
          )}
        >
          <ShoppingBag size={16} strokeWidth={1.5} />
          {addedFeedback ? 'Added to Cart' : 'Add to Cart'}
        </Button>
        <button
          onClick={handleWishlist}
          className={cn(
            'flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-200',
            inWishlist
              ? 'border-brown-800 bg-brown-800 text-cream'
              : 'border-gold-200 text-brown-500 hover:border-brown-500 hover:text-brown-800'
          )}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={17} strokeWidth={1.5} className={cn(inWishlist && 'fill-current')} />
        </button>
      </div>

      {/* Trust indicators */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        {[
          { icon: '🚚', label: 'Free Shipping', sub: 'Over 500 MAD' },
          { icon: '↩', label: 'Easy Returns', sub: '14 days' },
          { icon: '✦', label: 'Handcrafted', sub: 'Moroccan atelier' },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-lg mb-1">{item.icon}</div>
            <p className="text-[10px] font-medium text-brown-700">{item.label}</p>
            <p className="text-[10px] text-brown-400">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
