'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQ {
  category: string
  questions: { q: string; a: string }[]
}

export function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  return (
    <div className="space-y-10">
      {faqs.map((section) => (
        <div key={section.category}>
          <h2 className="font-display text-xl text-brown-900 mb-4 pb-3 border-b border-gold-100">
            {section.category}
          </h2>
          <div className="space-y-2">
            {section.questions.map((item, i) => {
              const key = `${section.category}-${i}`
              const isOpen = openIndex === key
              return (
                <div key={key} className="rounded-xl border border-gold-100 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : key)}
                    className="flex items-center justify-between w-full px-5 py-4 text-left bg-cream hover:bg-sand transition-colors"
                  >
                    <span className="text-sm font-medium text-brown-800">{item.q}</span>
                    {isOpen ? (
                      <ChevronUp size={15} className="text-brown-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={15} className="text-brown-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-brown-600 leading-relaxed animate-fade-in bg-sand/50">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
