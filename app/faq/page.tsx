import type { Metadata } from 'next'
import { FAQClient } from './FAQClient'

export const metadata: Metadata = {
  title: 'FAQ | Djellaba',
  description: 'Frequently asked questions about orders, sizing, shipping, and care.',
}

const faqs = [
  {
    category: 'Sizing & Fit',
    questions: [
      {
        q: 'How should I choose my size?',
        a: 'Our djellabas feature a relaxed, full-length fit. We recommend selecting your usual clothing size. Refer to the size guide on each product page for specific measurements.',
      },
      {
        q: 'Can I return or exchange if the size doesn\'t fit?',
        a: 'Yes. We offer free returns within 14 days for unworn items in their original condition. Simply contact us to arrange the return.',
      },
    ],
  },
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'Where do you ship?',
        a: 'We ship throughout Morocco and internationally. Standard delivery within Morocco takes 3–5 business days.',
      },
      {
        q: 'Is shipping free?',
        a: 'Free shipping on all orders over 500 MAD within Morocco. International shipping rates apply for deliveries outside Morocco.',
      },
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, you\'ll receive a tracking link by email. You can follow your package directly from the carrier\'s website.',
      },
    ],
  },
  {
    category: 'Product & Care',
    questions: [
      {
        q: 'What fabrics are used?',
        a: 'We use premium Moroccan wool-blend fabrics, breathable cotton linings, and carefully sourced materials from local mills. Each product page lists the specific materials.',
      },
      {
        q: 'How do I care for my djellaba?',
        a: 'Gentle cold machine wash or dry clean recommended. Steam lightly to remove creases. Avoid high heat drying — air dry flat. Store neatly on a wide hanger.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'You may return any unworn, unaltered item in its original packaging within 14 days of delivery.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Contact us via the Contact page with your order number and reason for return. We\'ll respond within 24 hours with instructions.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-12 text-center">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-3">
            Support
          </p>
          <h1 className="font-display text-display-lg text-brown-900">
            Frequently Asked Questions
          </h1>
        </div>
        <FAQClient faqs={faqs} />
      </div>
    </div>
  )
}
