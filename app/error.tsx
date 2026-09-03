'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { reportError } from '@/lib/error-reporting'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    reportError(error, {
      component: 'error-page',
      metadata: {
        digest: error.digest,
      },
    })
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-red-500/10">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Xatolik yuz berdi
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Sahifani yuklashda kutilmagan xatolik yuz berdi. Iltimos, qaytadan urinib ko&apos;ring.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary text-primary-foreground"
          >
            <RefreshCw size={14} />
            Qaytadan urinish
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            <Home size={14} />
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </main>
  )
}
