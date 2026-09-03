'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Download, Loader2, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-context'

function DownloadInner() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const orderId = searchParams.get('order')
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [downloadData, setDownloadData] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token || !orderId) {
      setStatus('error')
      setError('Noto\'g\'ri havola')
      return
    }

    // Verify token and get download URL
    fetch('/api/download/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, orderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setDownloadData(data)
          setStatus('ready')
        } else {
          setError(data.error || 'Xatolik')
          setStatus('error')
        }
      })
      .catch(() => {
        setError('Serverga ulanib bo\'lmadi')
        setStatus('error')
      })
  }, [token, orderId])

  const bgClass = isDark ? 'bg-[#0d0d0d]' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-[#1d1d1f]'
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <main className={`min-h-screen flex items-center justify-center p-4 ${bgClass} ${textClass}`}>
      <div className="max-w-md w-full text-center">
        {status === 'loading' ? (
          <>
            <Loader2 size={48} className={`mx-auto mb-4 animate-spin ${isDark ? 'text-[#6d8dff]' : 'text-[#0071e3]'}`} />
            <p className={`text-sm ${subtextClass}`}>Tekshirilmoqda...</p>
          </>
        ) : status === 'ready' && downloadData ? (
          <>
            <div className={`mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full ${isDark ? 'bg-[#6d8dff]/10' : 'bg-[#0071e3]/10'}`}>
              <Download size={40} className={isDark ? 'text-[#6d8dff]' : 'text-[#0071e3]'} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{downloadData.productName}</h1>
            <p className={`mt-2 text-sm ${subtextClass}`}>{downloadData.licenseName} License</p>
            <p className={`mt-4 text-xs ${subtextClass}`}>
              Havola {Math.floor(downloadData.expiresIn / 60)} daqiqa ichida tugaydi
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={downloadData.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${isDark ? 'bg-[#6d8dff] text-white hover:bg-[#5a7af0]' : 'bg-[#0071e3] text-white hover:bg-[#0077ED]'}`}
              >
                <Download size={16} />
                Yuklab olish
                <ExternalLink size={14} />
              </a>
              <Link
                href="/account"
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border border-black/10'}`}
              >
                <ArrowLeft size={14} />
                Hisobimga qaytish
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-red-500">{error || 'Xatolik yuz berdi'}</p>
            <Link href="/" className="mt-4 inline-flex text-sm text-primary">
              Bosh sahifaga qaytish
            </Link>
          </>
        )}
      </div>
    </main>
  )
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </main>
    }>
      <DownloadInner />
    </Suspense>
  )
}
