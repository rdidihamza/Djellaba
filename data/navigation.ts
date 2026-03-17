import type { MegaMenuSection } from '@/types'

export const megaMenu: MegaMenuSection[] = [
  {
    id: 'collections',
    label: 'Collections',
    href: '/collections',
    columns: [
      {
        title: 'By Category',
        links: [
          { label: 'Djellabas', href: '/collections/djellabas' },
          { label: 'Kaftans', href: '/collections/kaftans' },
          { label: 'Gandouras', href: '/collections/gandouras' },
          { label: 'Jabador', href: '/collections/jabador' },
          { label: 'Accessories', href: '/collections/accessories' },
        ],
      },
      {
        title: 'By Gender',
        links: [
          { label: 'Men', href: '/collections/men' },
          { label: 'Women', href: '/collections/women' },
        ],
      },
      {
        title: 'Featured',
        links: [
          { label: 'New Arrivals', href: '/collections/new-arrivals' },
          { label: 'Best Sellers', href: '/collections/best-sellers' },
          { label: 'Limited Edition', href: '/collections/limited-edition' },
        ],
      },
    ],
    featuredImage: {
      src: '/images/products/marron/front-with-model.png',
      alt: 'Djellaba Marron Classique',
      href: '/products/djellaba-marron-classique',
      caption: 'Djellaba Marron Classique',
    },
  },
  {
    id: 'men',
    label: 'Men',
    href: '/collections/men',
    columns: [
      {
        title: 'Garments',
        links: [
          { label: 'Djellabas', href: '/collections/djellabas' },
          { label: 'Gandouras', href: '/collections/gandouras' },
          { label: 'Jabador', href: '/collections/jabador' },
        ],
      },
      {
        title: 'Shop By',
        links: [
          { label: 'New Arrivals', href: '/collections/new-arrivals' },
          { label: 'Best Sellers', href: '/collections/best-sellers' },
          { label: 'Limited Edition', href: '/collections/limited-edition' },
        ],
      },
    ],
    featuredImage: {
      src: '/images/products/marron/front-with-model.png',
      alt: 'Men\'s Collection',
      href: '/collections/men',
      caption: 'Men\'s Heritage Edit',
    },
  },
  {
    id: 'women',
    label: 'Women',
    href: '/collections/women',
    columns: [
      {
        title: 'Garments',
        links: [
          { label: 'Kaftans', href: '/collections/kaftans' },
          { label: 'Djellabas', href: '/collections/djellabas' },
          { label: 'Accessories', href: '/collections/accessories' },
        ],
      },
      {
        title: 'Shop By',
        links: [
          { label: 'New Arrivals', href: '/collections/new-arrivals' },
          { label: 'Best Sellers', href: '/collections/best-sellers' },
        ],
      },
    ],
  },
  {
    id: 'craftsmanship',
    label: 'Craftsmanship',
    href: '/craftsmanship',
    columns: [
      {
        title: 'Our Story',
        links: [
          { label: 'The Atelier', href: '/craftsmanship' },
          { label: 'Moroccan Heritage', href: '/about' },
          { label: 'Lookbook', href: '/lookbook' },
        ],
      },
    ],
  },
  {
    id: 'lamaalam',
    label: 'Lamaalam',
    href: '/lamaalam',
    columns: [
      {
        title: 'Design Studio',
        links: [
          { label: 'Design Your Djellaba', href: '/lamaalam' },
          { label: 'Custom Orders', href: '/contact' },
          { label: 'Craftsmanship', href: '/craftsmanship' },
        ],
      },
    ],
  },
]

export const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'Best Sellers', href: '/collections/best-sellers' },
    { label: 'Djellabas', href: '/collections/djellabas' },
    { label: 'Kaftans', href: '/collections/kaftans' },
    { label: 'Limited Edition', href: '/collections/limited-edition' },
  ],
  brand: [
    { label: 'Our Story', href: '/about' },
    { label: 'Craftsmanship', href: '/craftsmanship' },
    { label: 'Lookbook', href: '/lookbook' },
    { label: 'Lamaalam Studio', href: '/lamaalam' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Shipping & Returns', href: '/policies/shipping' },
    { label: 'Care Instructions', href: '/policies/care' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Terms of Service', href: '/policies/terms' },
    { label: 'Cookie Policy', href: '/policies/cookies' },
  ],
}
