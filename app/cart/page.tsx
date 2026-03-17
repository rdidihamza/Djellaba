'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-12">
        <h1 className="font-display text-display-md text-brown-900 mb-10">
          Your Cart
          {itemCount > 0 && (
            <span className="ml-3 text-lg text-brown-400 font-sans">({itemCount})</span>
          )}
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <ShoppingBag size={40} className="text-brown-300" strokeWidth={1} />
            <p className="font-display text-2xl text-brown-800">Your cart is empty</p>
            <Link
              href="/collections"
              className="px-7 py-3 bg-brown-800 text-cream text-sm font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-brown-700 transition-colors mt-2"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Items */}
            <div>
              <div className="space-y-0 divide-y divide-gold-100">
                {items.map((item, i) => (
                  <div key={i} className="py-6 flex gap-5">
                    <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-sand flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            className="font-display text-base text-brown-900 hover:text-brown-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-brown-400 mt-0.5">
                            {item.colorName} · Size {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.colorSlug, item.size)}
                          className="text-brown-300 hover:text-brown-600 transition-colors"
                        >
                          <X size={15} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gold-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.productId, item.colorSlug, item.size, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-brown-500 hover:bg-sand transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm text-brown-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.colorSlug, item.size, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-brown-500 hover:bg-sand transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          {item.compareAtPrice && (
                            <p className="text-xs text-brown-300 line-through">
                              {formatPrice(item.compareAtPrice * item.quantity)}
                            </p>
                          )}
                          <p className="font-medium text-brown-900 text-sm">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-parchment rounded-2xl p-6 border border-gold-100 space-y-5 sticky top-24">
                <h2 className="font-display text-xl text-brown-900">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-brown-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-brown-600">
                    <span>Shipping</span>
                    <span className="text-green-700">{subtotal >= 500 ? 'Free' : formatPrice(50)}</span>
                  </div>
                  <div className="border-t border-gold-200 pt-3 flex justify-between">
                    <span className="font-medium text-brown-900">Total</span>
                    <span className="font-display text-xl text-brown-900">
                      {formatPrice(subtotal + (subtotal >= 500 ? 0 : 50))}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2.5 border border-gold-200 rounded-lg">
                    <Tag size={13} className="text-brown-400" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 text-xs bg-transparent text-brown-700 placeholder-brown-300 outline-none"
                    />
                  </div>
                  <button className="px-3 py-2.5 border border-gold-200 rounded-lg text-xs text-brown-600 hover:bg-sand transition-colors">
                    Apply
                  </button>
                </div>

                <Button variant="primary" size="lg" fullWidth className="gap-2">
                  Proceed to Checkout
                  <ArrowRight size={15} />
                </Button>

                <div className="text-center text-xs text-brown-400 space-y-1">
                  <p>Secure checkout · SSL encrypted</p>
                  <p>Free returns within 14 days</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
