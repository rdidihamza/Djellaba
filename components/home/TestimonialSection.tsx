import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Youssef A.',
    location: 'Casablanca',
    rating: 5,
    text: 'The quality is exceptional — the fabric drapes beautifully and the finishing is cleaner than anything I\'ve found at that price. I wore it to a wedding and received more compliments than the groom.',
    product: 'Djellaba Marron Classique',
  },
  {
    name: 'Mehdi B.',
    location: 'Marrakech',
    rating: 5,
    text: 'I was skeptical about ordering traditional wear online, but the fit guide was precise and the piece arrived perfectly pressed. It looks and feels far more expensive than it is.',
    product: 'Djellaba Marron Classique',
  },
  {
    name: 'Karim L.',
    location: 'Paris',
    rating: 5,
    text: 'Finally a brand that takes Moroccan menswear seriously. The silhouette is modern without losing its roots. I ordered two colors the same week.',
    product: 'Djellaba Marron Classique — Cream',
  },
  {
    name: 'Tariq M.',
    location: 'London',
    rating: 5,
    text: 'The detail work on the placket is something I\'d expect from a piece costing triple the price. Impeccable from the first wear.',
    product: 'Djellaba Marron Classique',
  },
]

export function TestimonialSection() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-brown-50 overflow-hidden">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-display-lg text-brown-900">
            Worn & trusted
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
              ))}
            </div>
            <span className="text-sm text-brown-500">4.9 average · 47 reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-cream rounded-2xl p-6 border border-gold-100 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-gold-500 fill-gold-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-brown-700 text-sm leading-relaxed mb-5 italic font-display text-base">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-gold-100 pt-4">
                <p className="text-sm font-medium text-brown-900">{t.name}</p>
                <p className="text-xs text-brown-400">{t.location}</p>
                <p className="text-xs text-gold-600 mt-1 italic">{t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
