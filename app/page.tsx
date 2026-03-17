import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedCategories } from '@/components/home/FeaturedCategories'
import { SignatureCollection } from '@/components/home/SignatureCollection'
import { CraftsmanshipSection } from '@/components/home/CraftsmanshipSection'
import { BestSellers } from '@/components/home/BestSellers'
import { Experience3DSection } from '@/components/home/Experience3DSection'
import { BrandStory } from '@/components/home/BrandStory'
import { LookbookSection } from '@/components/home/LookbookSection'
import { TestimonialSection } from '@/components/home/TestimonialSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export const metadata: Metadata = {
  title: 'Djellaba — Premium Moroccan Heritage Wear',
  description:
    'Refined Moroccan garments crafted with heritage precision. Djellabas, Kaftans, Gandouras — elevated traditional wear for the modern wardrobe.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <SignatureCollection />
      <CraftsmanshipSection />
      <BestSellers />
      <Experience3DSection />
      <BrandStory />
      <LookbookSection />
      <TestimonialSection />
      <NewsletterSection />
    </>
  )
}
