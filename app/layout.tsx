import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/layout/SiteShell'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/ui/CartDrawer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Djellaba — Premium Moroccan Heritage Wear',
    template: '%s | Djellaba',
  },
  description:
    'Refined Moroccan garments crafted with heritage precision. Djellabas, Kaftans, Gandouras — elevated traditional wear for the modern wardrobe.',
  keywords: ['djellaba', 'moroccan fashion', 'kaftan', 'gandoura', 'jabador', 'luxury menswear'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Djellaba',
    title: 'Djellaba — Premium Moroccan Heritage Wear',
    description:
      'Refined Moroccan garments crafted with heritage precision. Elevated traditional wear for the modern wardrobe.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Djellaba — Premium Moroccan Heritage Wear',
    description: 'Refined Moroccan garments crafted with heritage precision.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream antialiased">
        <CartDrawer />
        <SiteShell>
          <main>{children}</main>
        </SiteShell>
        <Footer />
      </body>
    </html>
  )
}
