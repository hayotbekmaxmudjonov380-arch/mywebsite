'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-context'

function CheckoutSuccessInner() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (sessionId) {
      setTimeout(() => setStatus('success'), 1500)
    } else {
      setStatus('error')
    }
  }, [sessionId])

  const bgClass = isDark ? 'bg-[#0d0d0d]' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-[#1d1d1f]'
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <main className={`min-h-screen flex items-center justify-center p-4 ${bgClass} ${textClass}`}>
      <div className="max-w-md w-full text-center">
        {status === 'loading' ? (
          <>
            <Loader2 size={48} className={`mx-auto mb-4 animate-spin ${isDark ? 'text-[#6d8dff]' : 'text-[#0071e3]'}`} />
            <p className={`text-sm ${subtextClass}`}>To&apos;lov tekshirilmoqda...</p>
          </>
        ) : status === 'success' ? (
          <>
            <div className={`mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full ${isDark ? 'bg-green-500/10' : 'bg-green-500/10'}`}>
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">To&apos;lov muvaffaqiyatli!</h1>
            <p className={`mt-4 text-sm leading-relaxed ${subtextClass}`}>
              Buyurtmangiz qabul qilindi. Tez orada mahsulotni yuklab olishingiz mumkin bo&apos;ladi.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/account"
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${isDark ? 'bg-[#6d8dff] text-white hover:bg-[#5a7af0]' : 'bg-[#0071e3] text-white hover:bg-[#0077ED]'}`}
              >
                Hisobimga o&apos;tish <ArrowRight size={14} />
              </Link>
              <Link
                href="/"
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border border-black/10'}`}
              >
                Bosh sahifaga qaytish
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-red-500">Xatolik yuz berdi</p>
            <Link href="/" className="mt-4 inline-flex text-sm text-primary">
              Bosh sahifaga qaytish
            </Link>
          </>
        )}
      </div>
    </main>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </main>
    }>
      <CheckoutSuccessInner />
    </Suspense>
  )
}
