'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { locales, type Locale } from '@/lib/translations'
import { ChevronDown } from 'lucide-react'

const FLAGS: Record<Locale, React.ReactNode> = {
  en: (
    <svg viewBox="0 0 36 36" className="w-4 h-3 rounded-sm">
      <rect width="36" height="36" fill="#012169"/>
      <path d="M0,0 L36,36 M36,0 L0,36" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L36,36 M36,0 L0,36" stroke="#C8102E" strokeWidth="2"/>
      <path d="M18,0 V36 M0,18 H36" stroke="#fff" strokeWidth="10"/>
      <path d="M18,0 V36 M0,18 H36" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  ),
  uz: (
    <svg viewBox="0 0 36 36" className="w-4 h-3 rounded-sm">
      <rect width="36" height="12" fill="#0099B5"/>
      <rect y="12" width="36" height="12" fill="#fff"/>
      <rect y="24" width="36" height="12" fill="#CE1126"/>
      <circle cx="8" cy="18" r="5" fill="#0099B5"/>
      <circle cx="9" cy="18" r="4" fill="#fff"/>
      <circle cx="9.5" cy="18" r="3" fill="#CE1126"/>
      <g transform="translate(15,12)">
        <polygon points="0,-3 0.7,-1 2.8,-1 1,0.2 1.7,2.2 0,1 -1.7,2.2 -1,0.2 -2.8,-1 -0.7,-1" fill="#CE1126"/>
      </g>
    </svg>
  ),
  ru: (
    <svg viewBox="0 0 36 36" className="w-4 h-3 rounded-sm">
      <rect width="36" height="12" fill="#fff"/>
      <rect y="12" width="36" height="12" fill="#0039A6"/>
      <rect y="24" width="36" height="12" fill="#D52B1E"/>
    </svg>
  ),
}

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
        {FLAGS[locale]}
        <span className="hidden sm:inline">{current?.label}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-[70] border border-white/10 bg-background/95 backdrop-blur-xl min-w-[160px]">
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
              {FLAGS[l.id]}
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
