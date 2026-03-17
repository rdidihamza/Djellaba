'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, X, ShoppingBag } from 'lucide-react'
import { useWishlistStore, useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-10">
          <h1 className="font-display text-display-lg text-brown-900">Wishlist</h1>
          <p className="text-brown-500 text-sm mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center">
              <Heart size={24} className="text-brown-300" strokeWidth={1} />
            </div>
            <div>
              <p className="font-display text-2xl text-brown-800 mb-1">Your wishlist is empty</p>
              <p className="text-sm text-brown-400">Save pieces you love and find them here.</p>
            </div>
            <Link
              href="/collections"
              className="px-7 py-3 bg-brown-800 text-cream text-sm font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-brown-700 transition-colors mt-2"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.colorSlug}`} className="group relative">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-sand mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <button
                    onClick={() => removeItem(item.productId, item.colorSlug)}
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-cream/80 backdrop-blur-sm text-brown-400 hover:text-brown-800 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>
                <Link href={`/products/${item.slug}?color=${item.colorSlug}`}>
                  <h3 className="font-display text-base text-brown-900 hover:text-brown-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-brown-400 mt-0.5">{item.colorName}</p>
                  <p className="text-sm font-medium text-brown-900 mt-1">
                    {formatPrice(item.price)}
                  </p>
                </Link>
                <button
                  onClick={() => addItem({
                    productId: item.productId,
                    slug: item.slug,
                    name: item.name,
                    colorSlug: item.colorSlug,
                    colorName: item.colorName,
                    colorHex: item.colorHex,
                    size: 'M',
                    price: item.price,
                    quantity: 1,
                    image: item.image,
                  })}
                  className="mt-3 w-full py-2.5 border border-gold-200 rounded-lg text-xs font-medium text-brown-700 hover:bg-sand hover:border-brown-400 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={13} strokeWidth={1.5} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
