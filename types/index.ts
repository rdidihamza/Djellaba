// ─── Product Types ─────────────────────────────────────────────────────────

export type ProductAngle = 'front' | 'back' | 'left' | 'right' | 'detail'
export type ProductVariantType = 'with-model' | 'without-model'
export type ProductGender = 'men' | 'women' | 'unisex'
export type ProductCategory = 'djellabas' | 'kaftans' | 'gandouras' | 'jabador' | 'accessories'
export type ProductCollection =
  | 'new-arrivals'
  | 'best-sellers'
  | 'limited-edition'
  | 'men'
  | 'women'
  | 'essentials'

export interface ProductImage {
  src: string
  alt: string
  angle: ProductAngle
  variant: ProductVariantType
  width?: number
  height?: number
}

export interface ProductColor {
  name: string
  nameAr?: string
  nameFr?: string
  hex: string
  slug: string
  images: ProductImage[]
  model3dSrc?: string
  posterImage?: string
  stock: number
}

export interface ProductSize {
  label: string
  chest?: number
  shoulder?: number
  length?: number
  available: boolean
}

export interface CraftsmanshipDetail {
  feature: string
  description: string
}

export interface ProductVariant {
  id: string
  colorSlug: string
  size: string
  sku: string
  price: number
  compareAtPrice?: number
  stock: number
}

export interface Product {
  id: string
  slug: string
  name: string
  subtitle?: string
  category: ProductCategory
  collection: ProductCollection[]
  gender: ProductGender
  price: number
  compareAtPrice?: number
  currency: string
  colors: ProductColor[]
  sizes: ProductSize[]
  shortDescription: string
  fullDescription: string
  highlights: string[]
  craftsmanshipDetails: CraftsmanshipDetail[]
  materials: string[]
  careInstructions: string[]
  fit: string
  seoTitle: string
  seoDescription: string
  tags: string[]
  variants: ProductVariant[]
  relatedProducts: string[]
  hasModel3D: boolean
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isBestSeller?: boolean
  isLimitedEdition?: boolean
}

// ─── Cart Types ─────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string
  slug: string
  name: string
  colorSlug: string
  colorName: string
  colorHex: string
  size: string
  price: number
  compareAtPrice?: number
  quantity: number
  image: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  itemCount: number
}

// ─── Wishlist Types ──────────────────────────────────────────────────────────

export interface WishlistItem {
  productId: string
  slug: string
  name: string
  colorSlug: string
  colorName: string
  colorHex: string
  price: number
  image: string
  addedAt: string
}

// ─── Navigation Types ────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
}

export interface NavColumn {
  title: string
  links: NavLink[]
}

export interface MegaMenuSection {
  id: string
  label: string
  href: string
  columns: NavColumn[]
  featuredImage?: {
    src: string
    alt: string
    href: string
    caption?: string
  }
}

// ─── Collection Types ────────────────────────────────────────────────────────

export interface Collection {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount?: number
}

export interface CollectionFilter {
  id: string
  label: string
  type: 'checkbox' | 'radio' | 'range'
  options?: { value: string; label: string; count?: number }[]
  min?: number
  max?: number
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling'
