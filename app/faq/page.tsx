'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchFAQs()
  }, [category])

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      
      const response = await fetch(`/api/faq?${params}`)
      const data = await response.json()
      setFaqs(data || [])
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const categories = [
    { value: null, label: 'Hammasi' },
    { value: 'general', label: 'Umumiy' },
    { value: 'payment', label: "To'lov" },
    { value: 'download', label: 'Yuklab olish' },
    { value: 'account', label: 'Akkaunt' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tez-tez beriladigan savollar</h1>
          <p className="text-zinc-400 text-lg">
            Ko'p beriladigan savollarga javoblar
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value || 'all'}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                category === cat.value
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-zinc-900 rounded-xl p-6 animate-pulse">
                <div className="h-5 bg-zinc-800 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">Hozircha savollar yo'q</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-zinc-900 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800 transition-colors"
                >
                  <span className="font-medium text-lg pr-4">{faq.question}</span>
                  {expandedId === faq.id ? (
                    <ChevronUp size={20} className="text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                {expandedId === faq.id && (
                  <div className="px-6 pb-6 text-zinc-400">
                    <p className="whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 mb-4">
            Savolingizga javob topa olmadingizmi?
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
          >
            Biz bilan bog'laning
          </a>
        </div>
      </div>
    </div>
  )
}
