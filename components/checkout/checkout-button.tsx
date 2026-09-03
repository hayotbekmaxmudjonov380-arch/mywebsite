'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-context'

interface CheckoutButtonProps {
  productId: string
  licenseId: string
  price: number
}

export function CheckoutButton({ productId, licenseId, price }: CheckoutButtonProps) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleCheckout = async () => {
    if (!user) {
      // Redirect to login
      router.push('/?login=true')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          licenseId,
          sessionId: document.cookie.match(/itshopping_session=([^;]+)/)?.[1],
        }),
      })

      const data = await res.json()

      if (data.ok && data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Xatolik yuz berdi')
        setLoading(false)
      }
    } catch {
      setError('Serverga ulanib bo\'lmadi')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : isDark
            ? 'bg-white text-black hover:bg-white/90'
            : 'bg-[#0071e3] text-white hover:bg-[#0077ED]'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            Jarayonda...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <CreditCard size={14} />
            Sotib olish — ${price}
          </span>
        )}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-500 text-center">{error}</p>
      )}
    </div>
  )
}
