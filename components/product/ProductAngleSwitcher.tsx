'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ProductImage, ProductAngle, ProductVariantType } from '@/types'

interface ProductAngleSwitcherProps {
  images: ProductImage[]
  productName: string
  className?: string
}

const angleLabels: Record<ProductAngle, string> = {
  front: 'Front',
  back: 'Back',
  left: 'Left',
  right: 'Right',
  detail: 'Detail',
}

export function ProductAngleSwitcher({
  images,
  productName,
  className,
}: ProductAngleSwitcherProps) {
  const [activeAngle, setActiveAngle] = useState<ProductAngle>('front')
  const [activeVariant, setActiveVariant] = useState<ProductVariantType>('with-model')
  const [zoomed, setZoomed] = useState(false)

  const angles = Array.from(new Set(images.map((img) => img.angle))) as ProductAngle[]
  const variants = Array.from(new Set(images.map((img) => img.variant))) as ProductVariantType[]
  const hasVariants = variants.length > 1

  const activeImage =
    images.find((img) => img.angle === activeAngle && img.variant === activeVariant) ||
    images.find((img) => img.angle === activeAngle) ||
    images[0]

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Variant Toggle (with-model / without-model) */}
      {hasVariants && (
        <div className="flex items-center bg-sand rounded-lg p-1 self-start">
          {variants.map((v) => (
            <button
              key={v}
              onClick={() => setActiveVariant(v)}
              className={cn(
                'px-4 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all duration-200',
                activeVariant === v
                  ? 'bg-brown-800 text-cream shadow-luxury'
                  : 'text-brown-500 hover:text-brown-800'
              )}
            >
              {v === 'with-model' ? 'On Model' : 'Flat'}
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-parchment cursor-zoom-in"
        onClick={() => setZoomed(true)}
      >
        {activeImage && (
          <Image
            src={activeImage.src}
            alt={activeImage.alt || `${productName} — ${angleLabels[activeAngle]} view`}
            fill
            priority
            className="object-cover object-top transition-all duration-500 ease-luxury product-gallery-image"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        )}
        <div className="absolute bottom-3 right-3 bg-brown-900/60 text-cream/80 text-[10px] px-2 py-1 rounded tracking-wide backdrop-blur-sm">
          {angleLabels[activeAngle]}
        </div>
      </div>

      {/* Angle Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {angles.map((angle) => {
          const thumb =
            images.find((img) => img.angle === angle && img.variant === activeVariant) ||
            images.find((img) => img.angle === angle)
          if (!thumb) return null
          return (
            <button
              key={angle}
              onClick={() => setActiveAngle(angle)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200',
                activeAngle === angle
                  ? 'border-gold-500 shadow-gold'
                  : 'border-transparent hover:border-gold-200'
              )}
              aria-label={`View ${angleLabels[angle]}`}
            >
              <Image
                src={thumb.src}
                alt={`${productName} ${angleLabels[angle]}`}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </button>
          )
        })}
      </div>

      {/* Fullscreen lightbox */}
      {zoomed && activeImage && (
        <div
          className="fixed inset-0 z-50 bg-brown-950/90 flex items-center justify-center p-8"
          onClick={() => setZoomed(false)}
        >
          <div className="relative w-full max-w-xl aspect-[3/4]">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute top-6 right-6 text-cream/70 hover:text-cream transition-colors text-sm tracking-widest uppercase"
            onClick={() => setZoomed(false)}
          >
            Close ✕
          </button>
        </div>
      )}
    </div>
  )
}
