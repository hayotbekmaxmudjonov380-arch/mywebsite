'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Search, X, LogIn, User, Menu } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-context'
import { useAuth } from '@/lib/auth-context'
import { LoginModal } from '@/components/auth/login-modal'
import { BloomSwitch } from './bloom-switch'
import { FavoritesDropdown } from './favorites-dropdown'
import { LanguageSwitcher } from '@/components/language-switcher'
import logoStyles from './logo-glow.module.css'
import navGlassStyles from './nav-glass.module.css'

const ElementalMarks = dynamic(() => import('./elemental-marks').then((mod) => mod.ElementalMarks), { ssr: false, loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(64,91,180,.3),transparent_52%)]" /> })

function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`${logoStyles.logoLink} ${className}`} aria-label="ITSHOP bosh sahifa">
      <Image src="/logotip2.png" alt="ITSHOP" width={140} height={40} className={`${logoStyles.logoImage} h-[34px] w-auto object-contain sm:h-[38px] md:h-[40px]`} priority />
    </Link>
  )
}

function Nav({ onSearch, onLogin }: { onSearch: () => void; onLogin: () => void }) {
  const { t } = useLanguage()
  const { user, loading } = useAuth()
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={navGlassStyles.navPill}>
        <Logo />
        <div className="flex items-center gap-0.5">
          <LanguageSwitcher />
          <BloomSwitch />
          <button onClick={onSearch} className={navGlassStyles.navIconBtn} aria-label={t('nav.search')}>
            <Search size={16} />
          </button>
          <FavoritesDropdown />
          {!loading && (
            user ? (
              <button onClick={onLogin} className={`${navGlassStyles.loginBtn} hidden sm:inline-flex`}>
                <User size={12} />
                {user.telegramFirstName}
              </button>
            ) : (
              <button onClick={onLogin} className={`${navGlassStyles.loginBtn} hidden sm:inline-flex`}>
                <LogIn size={12} />
                {t('nav.login')}
              </button>
            )
          )}
          <button onClick={() => setOpen(!open)} className={`${navGlassStyles.navIconBtn} md:hidden`} aria-label="Toggle menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className={`${navGlassStyles.mobileMenu} text-xs uppercase tracking-[.14em] md:hidden`}>
          <button onClick={() => { setOpen(false); onLogin() }} className={navGlassStyles.loginBtn}>
            {user ? `${user.telegramFirstName}` : t('nav.login')}
          </button>
        </nav>
      )}
    </header>
  )
}

export default function MarketplaceHome() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const isDark = theme === 'dark'

  return (
    <main className={`min-h-screen overflow-x-hidden ${isDark ? 'text-white' : ''}`}>
      <Nav onSearch={() => setSearchOpen(true)} onLogin={() => setLoginOpen(true)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* Fullscreen Elemental Marks Background */}
      <div className="fixed inset-0 z-0">
        <ElementalMarks />
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 p-4 sm:p-5 md:p-10 backdrop-blur-xl">
          <button onClick={() => setSearchOpen(false)} className="absolute right-4 top-4 sm:right-5 sm:top-5 grid size-9 sm:size-10 place-items-center border border-black/10" aria-label="Close search">
            <X size={18} />
          </button>
          <div className="mx-auto mt-20 sm:mt-24 max-w-3xl">
            <p className="mb-4 sm:mb-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('common.searchTitle')}</p>
            <div className="flex items-center gap-3 sm:gap-4 border-b border-white/20 pb-3 sm:pb-4">
              <Search className="text-muted-foreground shrink-0" size={18} />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('common.searchPlaceholder')}
                className="w-full bg-transparent text-lg sm:text-xl md:text-3xl outline-none placeholder:text-muted-foreground/60" />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
