'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, WishlistItem } from '@/types'

// ─── Cart Store ──────────────────────────────────────────────────────────────

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, colorSlug: string, size: string) => void
  updateQuantity: (productId: string, colorSlug: string, size: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  get subtotal(): number
  get itemCount(): number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.colorSlug === item.colorSlug &&
              i.size === item.size
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId &&
                i.colorSlug === item.colorSlug &&
                i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            }
          }
          return { items: [...state.items, item], isOpen: true }
        })
      },

      removeItem: (productId, colorSlug, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.colorSlug === colorSlug &&
                i.size === size
              )
          ),
        }))
      },

      updateQuantity: (productId, colorSlug, size, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, colorSlug, size)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.colorSlug === colorSlug && i.size === size
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
    }),
    { name: 'djellaba-cart' }
  )
)

// ─── Wishlist Store ───────────────────────────────────────────────────────────

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string, colorSlug: string) => void
  isInWishlist: (productId: string, colorSlug: string) => boolean
  toggle: (item: WishlistItem) => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        if (!get().isInWishlist(item.productId, item.colorSlug)) {
          set((state) => ({ items: [...state.items, item] }))
        }
      },

      removeItem: (productId, colorSlug) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.colorSlug === colorSlug)
          ),
        }))
      },

      isInWishlist: (productId, colorSlug) =>
        get().items.some((i) => i.productId === productId && i.colorSlug === colorSlug),

      toggle: (item) => {
        if (get().isInWishlist(item.productId, item.colorSlug)) {
          get().removeItem(item.productId, item.colorSlug)
        } else {
          get().addItem(item)
        }
      },
    }),
    { name: 'djellaba-wishlist' }
  )
)
