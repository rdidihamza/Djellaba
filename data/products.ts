import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'djellaba-marron-classique',
    slug: 'djellaba-marron-classique',
    name: 'Djellaba Marron Classique',
    subtitle: 'Traditional Moroccan Heritage',
    category: 'djellabas',
    collection: ['men', 'best-sellers'],
    gender: 'men',
    price: 2200,
    compareAtPrice: 2800,
    currency: 'MAD',
    shortDescription:
      'A refined Moroccan djellaba in a warm brown tone, combining traditional elegance with a modern luxury finish.',
    fullDescription:
      'The Djellaba Marron Classique reflects Moroccan heritage through a clean, full-length silhouette, elegant front detailing, and a rich brown tone that feels timeless and sophisticated. Designed for elevated traditional wear, it balances comfort, fluidity, and premium presentation for both special occasions and refined everyday styling.',
    highlights: [
      'Traditional Moroccan silhouette',
      'Elegant front detailing',
      'Side pockets',
      'Relaxed full-length fit',
      'Premium minimal finish',
    ],
    craftsmanshipDetails: [
      {
        feature: 'Neckline',
        description: 'Structured traditional neckline with refined inner lining',
      },
      {
        feature: 'Front Detail',
        description: 'Elegant hand-finished placket with subtle tonal stitching',
      },
      {
        feature: 'Sleeves',
        description: 'Wide, fluid sleeves for ease of movement and traditional drape',
      },
      {
        feature: 'Silhouette',
        description: 'Full-length straight cut with a generous, relaxed stance',
      },
      {
        feature: 'Pockets',
        description: 'Discreet side pockets with clean interior construction',
      },
      {
        feature: 'Hem',
        description: 'Refined bottom hem with a subtle front slit opening',
      },
      {
        feature: 'Finishing',
        description: 'All seams are hand-finished and internally pressed for lasting form',
      },
    ],
    materials: [
      'Outer: Premium Moroccan wool-blend fabric',
      'Lining: Breathable cotton inner lining',
      'Trim: Tonal thread embellishment',
    ],
    careInstructions: [
      'Gentle cold machine wash or dry clean recommended',
      'Steam lightly to remove creases',
      'Avoid high heat drying — air dry flat',
      'Store neatly on a wide hanger to preserve shape',
      'Do not bleach or tumble dry',
    ],
    fit: 'Relaxed fit. Full length. Easy movement. Layering-friendly.',
    seoTitle: 'Djellaba Marron Classique — Premium Moroccan Menswear | Djellaba',
    seoDescription:
      'A full-length Moroccan djellaba in warm brown, crafted with traditional tailoring and modern luxury finishing. Shop the signature collection.',
    tags: ['djellaba', 'moroccan', 'menswear', 'traditional', 'brown', 'heritage', 'luxury'],
    sizes: [
      { label: 'S', length: 145, available: true },
      { label: 'M', length: 150, available: true },
      { label: 'L', length: 155, available: true },
      { label: 'XL', length: 158, available: true },
      { label: 'XXL', length: 162, available: false },
    ],
    colors: [
      {
        name: 'Brown',
        nameAr: 'بني',
        nameFr: 'Marron',
        hex: '#6B3E26',
        slug: 'marron',
        stock: 12,
        images: [
          {
            src: '/images/products/marron/front-with-model.png',
            alt: 'Djellaba Marron Classique — front view with model',
            angle: 'front',
            variant: 'with-model',
          },
          {
            src: '/images/products/marron/front-without-model.png',
            alt: 'Djellaba Marron Classique — front view',
            angle: 'front',
            variant: 'without-model',
          },
          {
            src: '/images/products/marron/back-with-model.png',
            alt: 'Djellaba Marron Classique — back view with model',
            angle: 'back',
            variant: 'with-model',
          },
          {
            src: '/images/products/marron/back-without-model.png',
            alt: 'Djellaba Marron Classique — back view',
            angle: 'back',
            variant: 'without-model',
          },
          {
            src: '/images/products/marron/left-with-model.png',
            alt: 'Djellaba Marron Classique — left view with model',
            angle: 'left',
            variant: 'with-model',
          },
          {
            src: '/images/products/marron/left-without-model.png',
            alt: 'Djellaba Marron Classique — left view',
            angle: 'left',
            variant: 'without-model',
          },
          {
            src: '/images/products/marron/right-with-model.png',
            alt: 'Djellaba Marron Classique — right view with model',
            angle: 'right',
            variant: 'with-model',
          },
          {
            src: '/images/products/marron/right-without-model.png',
            alt: 'Djellaba Marron Classique — right view',
            angle: 'right',
            variant: 'without-model',
          },
        ],
      },
      {
        name: 'Cream',
        nameAr: 'كريمي',
        nameFr: 'Crème',
        hex: '#F5EDD8',
        slug: 'cream',
        stock: 8,
        images: [
          {
            src: '/images/products/cream/front-with-model.png',
            alt: 'Djellaba Crème Classique — front view with model',
            angle: 'front',
            variant: 'with-model',
          },
          {
            src: '/images/products/cream/front-without-model.png',
            alt: 'Djellaba Crème Classique — front view',
            angle: 'front',
            variant: 'without-model',
          },
          {
            src: '/images/products/cream/back-with-model.png',
            alt: 'Djellaba Crème Classique — back view with model',
            angle: 'back',
            variant: 'with-model',
          },
          {
            src: '/images/products/cream/back-without-model.png',
            alt: 'Djellaba Crème Classique — back view',
            angle: 'back',
            variant: 'without-model',
          },
          {
            src: '/images/products/cream/left-with-model.png',
            alt: 'Djellaba Crème Classique — left view with model',
            angle: 'left',
            variant: 'with-model',
          },
          {
            src: '/images/products/cream/left-without-model.png',
            alt: 'Djellaba Crème Classique — left view',
            angle: 'left',
            variant: 'without-model',
          },
          {
            src: '/images/products/cream/right-with-model.png',
            alt: 'Djellaba Crème Classique — right view with model',
            angle: 'right',
            variant: 'with-model',
          },
          {
            src: '/images/products/cream/right-without-model.png',
            alt: 'Djellaba Crème Classique — right view',
            angle: 'right',
            variant: 'without-model',
          },
        ],
      },
    ],
    variants: [
      { id: 'v1', colorSlug: 'marron', size: 'S', sku: 'DJL-MRN-S', price: 2200, stock: 3 },
      { id: 'v2', colorSlug: 'marron', size: 'M', sku: 'DJL-MRN-M', price: 2200, stock: 4 },
      { id: 'v3', colorSlug: 'marron', size: 'L', sku: 'DJL-MRN-L', price: 2200, stock: 3 },
      { id: 'v4', colorSlug: 'marron', size: 'XL', sku: 'DJL-MRN-XL', price: 2200, stock: 2 },
      { id: 'v5', colorSlug: 'cream', size: 'S', sku: 'DJL-CRM-S', price: 2200, stock: 2 },
      { id: 'v6', colorSlug: 'cream', size: 'M', sku: 'DJL-CRM-M', price: 2200, stock: 3 },
      { id: 'v7', colorSlug: 'cream', size: 'L', sku: 'DJL-CRM-L', price: 2200, stock: 2 },
      { id: 'v8', colorSlug: 'cream', size: 'XL', sku: 'DJL-CRM-XL', price: 2200, stock: 1 },
    ],
    relatedProducts: [],
    hasModel3D: false,
    rating: 4.9,
    reviewCount: 47,
    isNew: false,
    isBestSeller: true,
    isLimitedEdition: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection.includes(collection as any))
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller)
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew)
}
