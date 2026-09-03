'use client'

import { useState } from 'react'
import { Send, Mail, MessageSquare, User } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Xabar yuborishda xatolik')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Biz bilan bog'laning</h1>
          <p className="text-zinc-400 text-lg">
            Savollaringiz bormi? Xabar yozing, biz sizga javob beramiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Aloqa ma'lumotlari</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-zinc-400" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-zinc-400">support@itshopping.uz</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={24} className="text-zinc-400" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Telegram</h3>
                  <p className="text-zinc-400">@itshopping_support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User size={24} className="text-zinc-400" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Ish vaqti</h3>
                  <p className="text-zinc-400">Dushanba - Juma: 9:00 - 18:00</p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="mt-8 p-6 bg-zinc-900 rounded-xl">
              <h3 className="font-medium mb-2">Ko'p beriladigan savollar</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Javobingizni tezroq topishingiz mumkin
              </p>
              <a
                href="/faq"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                FAQ sahifasiga o'tish →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 text-green-400">
                  Xabaringiz muvaffaqiyatli yuborildi. Tez orada sizga javob beramiz!
                </div>
              )}

              {error && (
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ismingiz *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                  placeholder="Ismingizni kiriting"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Mavzu *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-600"
                >
                  <option value="">Mavzuni tanlang</option>
                  <option value="support">Texnik yordam</option>
                  <option value="payment">To'lov masalalari</option>
                  <option value="download">Yuklab olish muammolari</option>
                  <option value="other">Boshqa</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Xabar *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 resize-none"
                  placeholder="Xabaringizni yozing..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Xabar yuborish
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
