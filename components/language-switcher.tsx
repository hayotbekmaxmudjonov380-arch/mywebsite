'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { locales, type Locale } from '@/lib/translations'
import { ChevronDown } from 'lucide-react'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = locales.find((l) => l.id === locale)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[.12em] text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Change language"
      >
        <span>{current?.flag}</span>
        <span className="hidden sm:inline">{current?.label}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-[70] border border-white/10 bg-background/95 backdrop-blur-xl min-w-[140px]">
          {locales.map((l) => (
            <button
              key={l.id}
              onClick={() => { setLocale(l.id); setOpen(false) }}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[.12em] transition-colors ${
                locale === l.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-white/[.05] hover:text-foreground'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
