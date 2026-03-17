'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Check } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-14 text-center">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold-600 mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-display-lg text-brown-900">Contact Us</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Info */}
          <div className="space-y-8">
            <p className="text-brown-600 leading-relaxed">
              We respond to all enquiries within 24 hours. For order questions, please
              have your order number ready.
            </p>
            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'hello@djellaba.ma' },
                { icon: Phone, label: 'Phone', value: '+212 600 000 000' },
                { icon: MapPin, label: 'Atelier', value: 'Marrakech, Morocco' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sand flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-brown-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-brown-400 tracking-wide">{item.label}</p>
                    <p className="text-sm text-brown-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="space-y-5"
            >
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { id: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-xs font-medium text-brown-700 mb-1.5 tracking-wide">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-4 py-3 bg-sand border border-gold-200 rounded-lg text-sm text-brown-800 placeholder-brown-300 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-brown-700 mb-1.5 tracking-wide">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-sand border border-gold-200 rounded-lg text-sm text-brown-800 placeholder-brown-300 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-brown-800 text-cream text-sm font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-brown-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center">
                <Check size={24} className="text-gold-600" />
              </div>
              <p className="font-display text-2xl text-brown-900">Message sent.</p>
              <p className="text-sm text-brown-500">We&apos;ll be in touch within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
