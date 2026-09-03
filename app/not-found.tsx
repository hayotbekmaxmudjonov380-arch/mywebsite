'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-primary/10">
          <Search size={40} className="text-primary" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[.25em] text-primary">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          Sahifa topilmadi
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Siz qidirgan sahifa mavjud emas, o&apos;chirilgan yoki ko&apos;chirilgan bo&apos;lishi mumkin.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary text-primary-foreground"
          >
            <Home size={14} />
            Bosh sahifaga qaytish
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            <ArrowLeft size={14} />
            Orqaga qaytish
          </button>
        </div>
      </div>
    </main>
  )
}
