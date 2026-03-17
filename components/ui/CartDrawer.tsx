'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Button } from './Button'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore()
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
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
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream shadow-luxury-xl flex flex-col transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-brown-700" strokeWidth={1.5} />
            <span className="font-display text-lg text-brown-900">
              Your Cart
              {itemCount > 0 && (
                <span className="ml-2 text-sm text-brown-400 font-sans">({itemCount})</span>
              )}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-full text-brown-500 hover:text-brown-800 hover:bg-sand transition-all"
          >
            <X size={17} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center">
                <ShoppingBag size={24} className="text-brown-300" strokeWidth={1} />
              </div>
              <div>
                <p className="font-display text-xl text-brown-800 mb-1">Your cart is empty</p>
                <p className="text-sm text-brown-400">Discover our curated collections</p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={closeCart}
                className="mt-2"
              >
                Explore Collections
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-gold-100">
              {items.map((item, i) => (
                <li key={`${item.productId}-${item.colorSlug}-${item.size}-${i}`} className="px-6 py-5">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-1">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-base text-brown-900 hover:text-brown-600 truncate transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.colorSlug, item.size)}
                          className="text-brown-300 hover:text-brown-600 transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <p className="text-xs text-brown-400 mb-3">
                        {item.colorName} · Size {item.size}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-2 border border-gold-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.colorSlug, item.size, item.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center text-brown-500 hover:text-brown-900 hover:bg-sand transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm text-brown-800 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.colorSlug, item.size, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center text-brown-500 hover:text-brown-900 hover:bg-sand transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {item.compareAtPrice && (
                            <p className="text-xs text-brown-300 line-through">
                              {formatPrice(item.compareAtPrice * item.quantity)}
                            </p>
                          )}
                          <p className="text-sm font-medium text-brown-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold-100 px-6 py-6 space-y-4 bg-cream">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-brown-500">Subtotal</span>
              <span className="font-display text-xl text-brown-900">{formatPrice(subtotal)}</span>
            </div>

            <p className="text-xs text-brown-400 text-center">
              Shipping and taxes calculated at checkout
            </p>

            {/* CTA */}
            <Link href="/cart" onClick={closeCart} className="block">
              <Button variant="primary" size="lg" fullWidth className="gap-2">
                View Cart & Checkout
                <ArrowRight size={15} />
              </Button>
            </Link>

            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-brown-400 hover:text-brown-700 transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
