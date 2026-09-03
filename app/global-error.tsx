'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error:', error)
    }

    // In production, you would send this to an error reporting service
    // Example: Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white p-4">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-red-500/10">
              <AlertTriangle size={40} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Xatolik yuz berdi
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Kutilmagan xatolik yuz berdi. Iltimos, qaytadan urinib ko&apos;ring yoki bosh sahifaga qayting.
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-gray-500">
                Error ID: {error.digest}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] bg-[#6d8dff] text-white hover:bg-[#5a7af0]"
              >
                <RefreshCw size={14} />
                Qaytadan urinish
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              >
                <Home size={14} />
                Bosh sahifaga qaytish
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
