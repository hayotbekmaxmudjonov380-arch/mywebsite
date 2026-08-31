'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Menu, Search, ShoppingBag, Star, X, Sun, Moon, LogIn, User } from 'lucide-react'
import { categories, featuredProducts, products, newProducts, bestsellers, formatPrice } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-context'
import { useAuth } from '@/lib/auth-context'
import { categoryNames, categoryDescriptions } from '@/lib/translations'
import { LanguageSwitcher } from '@/components/language-switcher'
import { LoginModal } from '@/components/auth/login-modal'
import { CategoryCarousel } from './category-carousel'
import { ContactSection } from './contact-section'
import { Footer } from './footer'
import btnStyles from './hand-drawn-button.module.css'
import logoStyles from './logo-glow.module.css'
import glowCardStyles from './glow-card.module.css'
import dlBtnStyles from './download-btn.module.css'
import navGlassStyles from './nav-glass.module.css'
import type { Product } from '@/lib/marketplace-types'

const HeroScene = dynamic(() => import('./hero-scene').then((mod) => mod.HeroScene), { ssr: false, loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(64,91,180,.3),transparent_52%)]" /> })

function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`${logoStyles.logoLink} ${className}`} aria-label="ITSHOP bosh sahifa">
      <Image src="/logotip2.png" alt="ITSHOP" width={140} height={40} className={`${logoStyles.logoImage} h-[34px] w-auto object-contain sm:h-[38px] md:h-[40px]`} priority />
    </Link>
  )
}

function Nav({ cart, onSearch, onLogin }: { cart: number; onSearch: () => void; onLogin: () => void }) {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { user, loading } = useAuth()
  const [open, setOpen] = useState(false)
  const isDark = theme === 'dark'
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={navGlassStyles.navPill}>
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="#categories" className={navGlassStyles.navLink}>{t('nav.categories')}</Link>
          <Link href="#programs" className={navGlassStyles.navLink}>{t('nav.programs')}</Link>
          <Link href="#contact" className={navGlassStyles.navLink}>{t('footer.contact')}</Link>
        </nav>
        <div className="flex items-center gap-0.5">
          <LanguageSwitcher />
          <button onClick={toggleTheme} className={navGlassStyles.navIconBtn} aria-label="Toggle theme">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={onSearch} className={navGlassStyles.navIconBtn} aria-label={t('nav.search')}>
            <Search size={16} />
          </button>
          <button className={navGlassStyles.navIconBtn} aria-label={t('nav.favorites')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
          <button className={`${navGlassStyles.navIconBtn} relative`} aria-label={t('nav.cart')}>
            <ShoppingBag size={16} />
            {cart > 0 && <span className="absolute right-0.5 top-0.5 grid size-3.5 place-items-center rounded-full bg-primary text-[7px] text-primary-foreground font-medium">{cart}</span>}
          </button>
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
        <nav className={`${navGlassStyles.mobileMenu} flex flex-col gap-2 text-xs uppercase tracking-[.14em] md:hidden`}>
          <Link onClick={() => setOpen(false)} href="#categories" className={navGlassStyles.navLink}>{t('nav.categories')}</Link>
          <Link onClick={() => setOpen(false)} href="#programs" className={navGlassStyles.navLink}>{t('nav.programs')}</Link>
          <Link onClick={() => setOpen(false)} href="#contact" className={navGlassStyles.navLink}>{t('footer.contact')}</Link>
          <button onClick={() => { setOpen(false); onLogin() }} className={navGlassStyles.loginBtn}>
            {user ? `${user.telegramFirstName}` : t('nav.login')}
          </button>
        </nav>
      )}
    </header>
  )
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const { t, locale } = useLanguage()
  const catName = categoryNames[locale]?.[product.categoryPlatform] || product.category
  return (
    <article className="group border border-black/10 bg-card/60 transition-colors hover:border-primary/60">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[1.35] overflow-hidden" style={{ background: product.cover }}>
          <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,.25) 50%, transparent 65%)', backgroundSize: '220% 100%' }} />
          <div className="absolute inset-x-0 bottom-0 flex justify-between p-3 sm:p-4 text-[9px] sm:text-[10px] uppercase tracking-[.16em] text-white/50">
            <span>{catName}</span>
            <span>{product.badges[0]}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 sm:gap-3 p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <h3 className="font-medium tracking-tight text-sm sm:text-base">{product.name}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground line-clamp-2">{product.description}</p>
            </div>
            <span className="shrink-0 font-mono text-xs sm:text-sm">{formatPrice(product.price)}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1 text-foreground">
              <Star size={12} fill="currentColor" /> {product.rating} <span className="text-muted-foreground">({product.reviews})</span>
            </span>
            <span className="group-hover:text-primary">{t('common.viewProduct')} <ArrowRight className="ml-1 inline transition-transform group-hover:translate-x-1" size={12} /></span>
          </div>
        </div>
      </Link>
      <div className="border-t border-black/10 p-2.5 sm:p-3">
        <button onClick={onAdd} className="flex w-full items-center justify-center gap-2 py-2 text-[9px] sm:text-[10px] uppercase tracking-[.16em] text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
          <ShoppingBag size={13} /> {t('common.addToCart')}
        </button>
      </div>
    </article>
  )
}

function ProductSection({ title, eyebrow, items, onAdd }: { title: string; eyebrow: string; items: Product[]; onAdd: (product: Product) => void }) {
  const { t } = useLanguage()
  return (
    <section className="flex flex-col gap-5 sm:gap-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 sm:mb-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{eyebrow}</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight">{title}</h2>
        </div>
        <Link href="#explore" className="hidden items-center gap-2 text-[10px] uppercase tracking-[.16em] text-muted-foreground hover:text-foreground sm:flex">
          {t('common.viewAll')} <ArrowRight size={13} />
        </Link>
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={() => onAdd(product)} />
        ))}
      </div>
    </section>
  )
}

export default function MarketplaceHome() {
  const { t, locale } = useLanguage()
  const { theme } = useTheme()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('all')
  const [cart, setCart] = useState<Product[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const isDark = theme === 'dark'

  const enterExplore = () => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filtered = useMemo(() =>
    products.filter((product) =>
      (active === 'all' || product.categoryPlatform === active) &&
      `${product.name} ${product.description} ${product.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
    ), [active, query])

  const addToCart = (product: Product) =>
    setCart((current) => current.some((item) => item.id === product.id) ? current : [...current, product])

  return (
    <main className={`min-h-screen overflow-x-hidden ${isDark ? 'text-white' : ''}`}>
      <Nav cart={cart.length} onSearch={() => setSearchOpen(true)} onLogin={() => setLoginOpen(true)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      {/* Hero */}
      <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] px-4 pt-24 pb-8 sm:px-5 sm:pb-14 sm:pt-32 lg:px-10 lg:pb-16 lg:pt-36">
        <div className="relative z-10 mx-auto flex flex-col lg:flex-row items-center max-w-7xl gap-6 lg:gap-4">
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <p className="mb-4 sm:mb-7 flex items-center justify-center lg:justify-start gap-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[.26em] text-primary">
              <span className="size-1.5 bg-primary" /> {t('hero.badge')}
            </p>
            <h1 className="text-balance text-[clamp(1.8rem,6vw,7.2rem)] font-semibold leading-[.92] tracking-[-.05em] sm:leading-[.88] sm:tracking-[-.07em] break-words">
              {t('hero.title1')}<br /><span className="text-primary">{t('hero.title2')}</span>
            </h1>
            <p className="mt-4 sm:mt-8 max-w-md text-xs sm:text-sm md:text-base leading-5 sm:leading-6 text-muted-foreground mx-auto lg:mx-0">
              {t('hero.desc')}
            </p>
            <div className="mt-5 sm:mt-8 flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3">
              <div className={btnStyles.buttonWrap}>
                <button type="button" onClick={enterExplore} className={btnStyles.buttonLight}>
                  <svg className={btnStyles.highlight} viewBox="0 0 144.75738 77.18431" preserveAspectRatio="none">
                    <g transform="translate(-171.52826,-126.11624)">
                      <g fill="none" strokeWidth={17} strokeLinecap="round" strokeMiterlimit={10}>
                        <path d="M180.02826,169.45123c0,0 12.65228,-25.55115 24.2441,-25.66863c6.39271,-0.06479 -5.89143,46.12943 4.90937,50.63857c10.22345,4.2681 24.14292,-52.38336 37.86455,-59.80493c3.31715,-1.79413 -5.35094,45.88889 -0.78872,58.34589c5.19371,14.18125 33.36934,-58.38221 36.43049,-56.91633c4.67078,2.23667 -0.06338,44.42744 5.22574,47.53647c6.04041,3.55065 19.87185,-20.77286 19.87185,-20.77286" />
                      </g>
                    </g>
                  </svg>
                  {t('hero.cta1')} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full md:w-auto flex justify-center">
            <HeroScene />
          </div>
        </div>
      </section>

      {/* Benefit Strip */}
      <section className="border-y border-black/[.06] bg-black/[.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {[
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>, title: t('benefit.reliable.title'), desc: t('benefit.reliable.desc') },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: t('benefit.fast.title'), desc: t('benefit.fast.desc') },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>, title: t('benefit.support.title'), desc: t('benefit.support.desc') },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title: t('benefit.secure.title'), desc: t('benefit.secure.desc') },
          ].map((b, i) => (
            <div key={i} className={`flex items-start gap-3.5 p-5 sm:p-6 ${i < 3 ? 'sm:border-r border-black/[.06]' : ''} ${i < 2 ? 'border-b sm:border-b-0' : ''} lg:border-r last:border-r-0`}>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">{b.icon}</div>
              <div>
                <p className="text-sm font-medium text-foreground">{b.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bizning xizmatlar */}
      <section id="categories" className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 px-4 sm:px-5 py-10 sm:py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-2 sm:gap-3 text-center items-center">
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('cat.eyebrow')}</p>
          <h2 className="max-w-xl text-base sm:text-2xl md:text-4xl font-medium tracking-tight leading-snug">{t('cat.title')}</h2>
        </div>
        <CategoryCarousel />
      </section>

      {/* Bizning shablonlar */}
      <section id="programs" className="mx-auto max-w-7xl px-4 sm:px-5 py-16 sm:py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-2 sm:gap-3 mb-8 sm:mb-10 text-center items-center">
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('programs.eyebrow')}</p>
          <h2 className="max-w-xl text-xl sm:text-2xl md:text-4xl font-medium tracking-tight">{t('programs.title')}</h2>
          <p className="max-w-md text-xs sm:text-sm leading-5 sm:leading-6 text-muted-foreground">{t('programs.desc')}</p>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: t('programs.app1.name'), desc: t('programs.app1.desc'), platform: 'Windows', slug: 'desktop', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5.5L10.5 4.5V11.5H3V5.5Z"/><path d="M10.5 4.5L21 3V11.5H10.5V4.5Z"/><path d="M3 11.5H10.5V18.5L3 17.5V11.5Z"/><path d="M10.5 11.5H21V20L10.5 18.5V11.5Z"/></svg>, color: 'from-blue-500/20 to-blue-600/5' },
            { name: t('programs.app2.name'), desc: t('programs.app2.desc'), platform: 'iOS & Android', slug: 'mobile', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, color: 'from-green-500/20 to-green-600/5' },
            { name: t('programs.app3.name'), desc: t('programs.app3.desc'), platform: 'Web', slug: 'web', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, color: 'from-cyan-500/20 to-cyan-600/5' },
            { name: t('programs.app4.name'), desc: t('programs.app4.desc'), platform: 'Dokumentlar', slug: 'institute', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, color: 'from-orange-500/20 to-orange-600/5' },
          ].map((app, i) => (
            <Link key={i} href={`/categories/${app.slug}`} className={`${glowCardStyles.glowCardOuter} group block`}>
              <div className={glowCardStyles.glowCard}>
                <div className={glowCardStyles.glowRay} />
                <div className={`${glowCardStyles.glowLine} ${glowCardStyles.glowLineTop}`} />
                <div className={`${glowCardStyles.glowLine} ${glowCardStyles.glowLineBottom}`} />
                <div className={`${glowCardStyles.glowLine} ${glowCardStyles.glowLineLeft}`} />
                <div className={`${glowCardStyles.glowLine} ${glowCardStyles.glowLineRight}`} />
                <div className={`${glowCardStyles.glowIcon} flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${app.color} text-primary`}>
                    {app.icon}
                  </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`${glowCardStyles.glowTitle} text-base sm:text-lg font-medium tracking-tight`}>{app.name}</h3>
                    <span className={`${glowCardStyles.glowBadge} text-[9px] sm:text-[10px] uppercase tracking-[.14em] text-primary bg-primary/10 px-2 py-0.5 rounded-full`}>{app.platform}</span>
                  </div>
                  <p className={`${glowCardStyles.glowDesc} text-xs sm:text-sm leading-5 text-muted-foreground`}>{app.desc}</p>
                </div>
                <span className={`${glowCardStyles.glowBtn} ${dlBtnStyles.dlBtn}`}>
                  <span className={dlBtnStyles.dlBtnCircle} />
                  <span className={dlBtnStyles.dlBtnLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full opacity-100" viewBox="0 0 487 487">
                      <path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" />
                    </svg>
                  </span>
                  <span className={dlBtnStyles.dlBtnRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="object-cover w-full h-full" viewBox="0 0 487 487">
                      <path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" />
                    </svg>
                  </span>
                  <span className={dlBtnStyles.dlBtnOverlay} />
                  <span className={dlBtnStyles.dlBtnContent}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    {t('programs.download')}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

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
            <div className="mt-6 sm:mt-8 grid gap-2 sm:gap-3">
              {products.filter((product) => `${product.name} ${product.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4).map((product) => (
                <Link onClick={() => setSearchOpen(false)} href={`/products/${product.slug}`} key={product.id}
                  className="flex items-center justify-between border-b border-black/10 py-3 sm:py-4 hover:text-primary">
                  <span className="text-sm sm:text-base">{product.name}</span>
                  <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">{product.category}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cart Button */}
      {cart.length > 0 && (
        <button onClick={() => setCart([])}
          className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2.5 sm:gap-3 border border-primary bg-primary px-3 sm:px-4 py-2.5 sm:py-3 text-[9px] sm:text-[10px] uppercase tracking-[.12em] text-primary-foreground shadow-2xl">
          <ShoppingBag size={14} /> {cart.length} {t('common.cartClear')}
        </button>
      )}

      {/* Meteor container for dark mode */}
      {isDark && (
        <div id="meteor-container" aria-hidden="true">
          <div className="meteor meteor-1" />
          <div className="meteor meteor-2" />
          <div className="meteor meteor-3" />
        </div>
      )}

      {/* SVG Filters for Hand-Drawn Button Effect */}
      <svg height={0} width={0} aria-hidden="true">
        <filter id="handDrawnNoise">
          <feTurbulence result="noise" numOctaves={8} baseFrequency="0.1" type="fractalNoise" />
          <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={2} in2="noise" in="SourceGraphic" />
        </filter>
        <filter id="handDrawnNoise2">
          <feTurbulence result="noise" numOctaves={8} baseFrequency="0.1" seed={1010} type="fractalNoise" />
          <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={2} in2="noise" in="SourceGraphic" />
        </filter>
        <filter id="handDrawnNoiset">
          <feTurbulence result="noise" numOctaves={8} baseFrequency="0.1" type="fractalNoise" />
          <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={4} in2="noise" in="SourceGraphic" />
        </filter>
        <filter id="handDrawnNoiset2">
          <feTurbulence result="noise" numOctaves={8} baseFrequency="0.1" seed={1010} type="fractalNoise" />
          <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={4} in2="noise" in="SourceGraphic" />
        </filter>
      </svg>
    </main>
  )
}
