'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-brown-800 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5" aria-hidden>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-400 mb-5">
          VIP Access
        </p>
        <h2 className="font-display text-display-lg text-cream mb-4">
          Be first to wear it.
        </h2>
        <p className="text-brown-300 text-base leading-relaxed mb-10">
          Join our private list for early access to new collections, exclusive drops,
          and rare limited editions — before they reach anyone else.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-3.5 bg-brown-700/50 text-cream placeholder-brown-400 border border-brown-600 rounded-lg text-sm focus:outline-none focus:border-gold-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 text-brown-950 text-sm font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-brown-800 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Join <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-fade-up">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center">
              <Check size={22} className="text-gold-400" />
            </div>
            <p className="text-cream font-display text-xl">You're on the list.</p>
            <p className="text-brown-400 text-sm">
              Expect something worth opening.
            </p>
          </div>
        )}

        <p className="mt-4 text-xs text-brown-500">
          No spam. Unsubscribe at any time.
        </p>

        {/* Perks */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-10 border-t border-brown-700">
          {[
            { label: 'Early Access', sub: 'New drops first' },
            { label: 'Exclusive Edits', sub: 'Members-only pieces' },
            { label: 'Private Sales', sub: 'Priority pricing' },
          ].map((perk) => (
            <div key={perk.label} className="text-center">
              <p className="text-sm font-medium text-gold-300">{perk.label}</p>
              <p className="text-xs text-brown-400 mt-0.5">{perk.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
