'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProductAngleSwitcher } from '@/components/product/ProductAngleSwitcher'
import { Product3DViewer } from '@/components/product/Product3DViewer'
import { ProductInfoPanel } from '@/components/product/ProductInfoPanel'
import { ProductCard } from '@/components/product/ProductCard'
import { products } from '@/data/products'
import type { Product } from '@/types'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gold-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="font-display text-base text-brown-900">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-brown-400 flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-brown-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="pb-5 text-sm text-brown-600 leading-relaxed animate-fade-in">
          {children}
        </div>
      )}
    </div>
  )
}

interface ProductPageClientProps {
  product: Product
  initialColorSlug: string
}

export function ProductPageClient({ product, initialColorSlug }: ProductPageClientProps) {
  const [activeColorSlug, setActiveColorSlug] = useState(initialColorSlug)
  const [mediaMode, setMediaMode] = useState<'images' | '3d'>('images')

  const activeColor = product.colors.find((c) => c.slug === activeColorSlug) || product.colors[0]
  const relatedProducts = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  )

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-4">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/collections/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      {/* Main Grid */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 pb-16">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 lg:gap-16">
          {/* Left — Media */}
          <div>
            {/* Media Mode Toggle (only if 3D available) */}
            {product.hasModel3D && activeColor.model3dSrc && (
              <div className="flex items-center bg-sand rounded-xl p-1 mb-5 self-start w-fit">
                {(['images', '3d'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setMediaMode(mode)}
                    className={cn(
                      'px-5 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-all duration-200',
                      mediaMode === mode
                        ? 'bg-brown-800 text-cream shadow-luxury'
                        : 'text-brown-500 hover:text-brown-800'
                    )}
                  >
                    {mode === 'images' ? 'Gallery' : '3D View'}
                  </button>
                ))}
              </div>
            )}

            {/* Media Display */}
            {mediaMode === '3d' && product.hasModel3D && activeColor.model3dSrc ? (
              <Product3DViewer
                src={activeColor.model3dSrc}
                posterSrc={activeColor.posterImage}
                productName={product.name}
              />
            ) : (
              <ProductAngleSwitcher
                images={activeColor.images}
                productName={product.name}
              />
            )}
          </div>

          {/* Right — Info */}
          <div className="lg:sticky lg:top-[88px] lg:self-start">
            <ProductInfoPanel
              product={product}
              activeColorSlug={activeColorSlug}
              onColorChange={setActiveColorSlug}
            />
          </div>
        </div>

        {/* Product Details Accordions */}
        <div className="mt-16 max-w-2xl">
          <AccordionItem title="Details & Craftsmanship" defaultOpen>
            <div className="space-y-3">
              {product.craftsmanshipDetails.map((detail) => (
                <div key={detail.feature} className="flex gap-3">
                  <span className="font-medium text-brown-800 min-w-[90px] flex-shrink-0">
                    {detail.feature}
                  </span>
                  <span>{detail.description}</span>
                </div>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem title="Highlights">
            <ul className="space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">✦</span>
                  {h}
                </li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem title="Fabric & Materials">
            <ul className="space-y-2">
              {product.materials.map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">—</span>
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 italic text-brown-400 text-xs">
              Fit: {product.fit}
            </p>
          </AccordionItem>

          <AccordionItem title="Care Instructions">
            <ul className="space-y-2">
              {product.careInstructions.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">—</span>
                  {c}
                </li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem title="Shipping & Returns">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-brown-800 mb-1">Shipping</h4>
                <p>Free shipping on orders over 500 MAD. Standard delivery 3–5 business days within Morocco. International shipping available.</p>
              </div>
              <div>
                <h4 className="font-medium text-brown-800 mb-1">Returns</h4>
                <p>Easy 14-day returns on unworn items in original condition. Contact us to initiate a return.</p>
              </div>
            </div>
          </AccordionItem>
        </div>

        {/* Full Description */}
        <div className="mt-12 max-w-2xl py-10 border-t border-gold-100">
          <h2 className="font-display text-2xl text-brown-900 mb-4">About This Piece</h2>
          <p className="text-brown-600 leading-relaxed text-base">{product.fullDescription}</p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gold-100">
            <h2 className="font-display text-display-sm text-brown-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bar */}
      <MobilePurchaseBar product={product} activeColorSlug={activeColorSlug} />
    </div>
  )
}

// ─── Sticky Mobile CTA ───────────────────────────────────────────────────────

import { useCartStore } from '@/lib/store'

function MobilePurchaseBar({
  product,
  activeColorSlug,
}: {
  product: Product
  activeColorSlug: string
}) {
  const { addItem } = useCartStore()
  const activeColor = product.colors.find((c) => c.slug === activeColorSlug) || product.colors[0]
  const primaryImage = activeColor.images.find((img) => img.angle === 'front') || activeColor.images[0]
  const defaultSize = product.sizes.find((s) => s.available)

  const handleAdd = () => {
    if (!defaultSize) return
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colorSlug: activeColor.slug,
      colorName: activeColor.name,
      colorHex: activeColor.hex,
      size: defaultSize.label,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity: 1,
      image: primaryImage.src,
    })
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-cream border-t border-gold-100 shadow-luxury-lg px-4 py-3 safe-bottom">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-xs font-medium text-brown-900 truncate">{product.name}</p>
          <p className="text-base font-display text-brown-800">
            {product.price.toLocaleString('fr-MA')} MAD
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-brown-800 text-cream text-xs font-medium tracking-[0.1em] uppercase rounded-xl hover:bg-brown-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
