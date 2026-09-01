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
      <rect width="36" height="9" fill="#0099B5"/>
      <rect y="9" width="36" height="1.5" fill="#CE1126"/>
      <rect y="10.5" width="36" height="15" fill="#fff"/>
      <rect y="25.5" width="36" height="1.5" fill="#CE1126"/>
      <rect y="27" width="36" height="9" fill="#0099B5"/>
      <g transform="translate(8,9)">
        <path d="M6,0 A4,4 0 1,1 6,8 A3,3 0 1,0 6,0" fill="#fff"/>
        <polygon points="11,1.5 11.6,3.2 13.5,3.2 12,4.3 12.5,6 11,5 9.5,6 10,4.3 8.5,3.2 10.4,3.2" fill="#fff"/>
        <polygon points="13,4 13.3,5 14.5,5 13.5,5.7 13.9,6.8 13,6.1 12.1,6.8 12.5,5.7 11.5,5 12.7,5" fill="#fff"/>
        <polygon points="9.5,4.5 9.8,5.5 10.8,5.5 10,6.1 10.3,7 9.5,6.4 8.7,7 9,6.1 8.2,5.5 9.2,5.5" fill="#fff"/>
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
