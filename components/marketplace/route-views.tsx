'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Download, Lock, Settings, ShoppingBag, Star } from 'lucide-react'
import { getCategory, getProduct, getProductsByCategory, products, formatPrice } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import { categoryNames, licenseFeatures, statsTranslations } from '@/lib/translations'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ProfileCard } from '@/components/marketplace/profile-card'
import backBtnStyles from './back-button.module.css'
import catBgStyles from './category-bg.module.css'

export function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug)
  const { t, locale } = useLanguage()
  if (!product) return <Empty title={`${t('common.notFound')}`} />
  const lf = licenseFeatures[locale]
  return (
    <Shell>
      <Link href="/" className="mb-6 sm:mb-10 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} /> {t('common.backToCollection')}
      </Link>
      <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="aspect-[1.2] border border-white/10 p-5 sm:p-8 md:p-10" style={{ background: product.cover }}>
          <div className="flex h-full flex-col justify-between">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-white/60">{product.category}</span>
            <div>
              <p className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold text-white/15">N</p>
              <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-white/50">Production-ready digital system</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{product.badges.join(' · ')}</p>
          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl md:text-7xl font-medium tracking-[-.05em]">{product.name}</h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">{product.longDescription}</p>
          <div className="mt-5 sm:mt-7 flex items-center gap-2 text-xs sm:text-sm">
            <Star size={15} fill="currentColor" /> {product.rating} <span className="text-muted-foreground">{t('product.reviews', { count: product.reviews })}</span>
          </div>
          <div className="mt-7 sm:mt-10 flex flex-col gap-2.5 sm:gap-3">
            {product.licenses.map((item, index) => (
              <div key={item.id} className={`border p-3 sm:p-4 ${index === 0 ? 'border-primary/70' : 'border-white/10'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-medium text-sm sm:text-base">{lf?.[item.id === 'personal' ? 'personal' : 'commercial'] || item.name}</h2>
                    <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">{lf?.[item.id === 'personal' ? 'personalDesc' : 'commercialDesc'] || item.description}</p>
                  </div>
                  <span className="shrink-0 font-mono text-sm sm:text-base">{formatPrice(item.price)}</span>
                </div>
                <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-[10px] sm:text-xs text-muted-foreground">
                  {item.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-1">
                      <Check size={12} className="text-primary" />{feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <button className="mt-2 flex items-center justify-center gap-2 bg-primary px-5 py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[.15em] text-primary-foreground transition-transform hover:scale-[1.02]">
              <ShoppingBag size={14} /> {t('product.addToCart')}
            </button>
          </div>
        </div>
      </div>
    </Shell>
  )
}

export function CategoryView({ slug }: { slug: string }) {
  const category = getCategory(slug)
  const items = getProductsByCategory(slug)
  const { t, locale } = useLanguage()
  if (!category) return <Empty title={`${t('common.notFound')}`} />
  const catName = categoryNames[locale]?.[slug] || category.name
  return (
    <Shell>
      <div className="text-center">
        <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('category.categoryOf')} / {catName}</p>
        <h1 className="mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl font-medium tracking-[-.06em]">{catName}</h1>
        <p className="mt-4 sm:mt-6 mx-auto max-w-md text-xs sm:text-sm leading-5 sm:leading-6 text-muted-foreground">{category.description}</p>
      </div>
      <div className="mt-10 sm:mt-16 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.length ? items.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`} className="border border-white/10 p-4 sm:p-5 hover:border-primary/60">
            <div className="aspect-video" style={{ background: product.cover }} />
            <h2 className="mt-4 sm:mt-5 font-medium text-sm sm:text-base">{product.name}</h2>
            <p className="mt-1.5 sm:mt-2 text-xs text-muted-foreground">{product.description}</p>
            <p className="mt-4 sm:mt-5 font-mono text-xs sm:text-sm">{formatPrice(product.price)}</p>
          </Link>
        )) : <Empty title={t('category.empty')} />}
      </div>
    </Shell>
  )
}

export function AccountView() {
  const { t } = useLanguage()
  return (
    <Shell>
      <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('account.eyebrow')}</p>
      <h1 className="mt-3 sm:mt-4 text-4xl sm:text-6xl font-medium tracking-[-.06em]">{t('account.title')}</h1>
      <div className="mt-10 sm:mt-14 flex flex-col lg:flex-row gap-6 sm:gap-10 items-start">
        {/* Profile Card */}
        <div className="w-full lg:w-auto flex justify-center">
          <ProfileCard />
        </div>
        {/* Downloads & Settings */}
        <div className="flex-1 grid gap-3 sm:gap-4">
          <div className="border border-white/10 p-5 sm:p-6">
            <h2 className="font-medium text-sm sm:text-base">{t('account.downloads')}</h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">{t('account.signIn')}</p>
            <button className="mt-5 sm:mt-7 bg-primary px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[.15em] text-primary-foreground">{t('account.signInBtn')}</button>
          </div>
          <div className="border border-white/10 p-5 sm:p-6">
            <Settings className="text-primary" size={20} />
            <h2 className="mt-5 sm:mt-6 font-medium text-sm sm:text-base">{t('account.profile')}</h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">{t('account.profileDesc')}</p>
          </div>
        </div>
      </div>
    </Shell>
  )
}

export function AdminView() {
  const { t, locale } = useLanguage()
  const st = statsTranslations[locale]
  return (
    <Shell>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('admin.eyebrow')}</p>
          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl font-medium tracking-[-.06em]">{t('admin.title')}</h1>
        </div>
        <button className="border border-white/15 px-4 py-2.5 sm:py-3 text-xs self-start sm:self-auto">{t('admin.newProduct')}</button>
      </div>
      <div className="mt-10 sm:mt-14 overflow-x-auto border border-white/10">
        <div className="grid min-w-[500px] sm:min-w-[620px] grid-cols-4 border-b border-white/10 px-3 sm:px-5 py-3 sm:py-4 text-[9px] sm:text-[10px] uppercase tracking-[.16em] text-muted-foreground">
          <span>{t('admin.product')}</span>
          <span>{t('admin.status')}</span>
          <span>{t('admin.sales')}</span>
          <span>{t('admin.revenue')}</span>
        </div>
        {products.map((product) => (
          <div key={product.id} className="grid min-w-[500px] sm:min-w-[620px] grid-cols-4 items-center border-b border-white/10 px-3 sm:px-5 py-4 sm:py-5 text-xs sm:text-sm last:border-0">
            <span>{product.name}</span>
            <span className="text-primary">{t('admin.published')}</span>
            <span>{product.reviews + 18}</span>
            <span>{formatPrice(product.price * (product.reviews + 18))}</span>
          </div>
        ))}
      </div>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen px-4 sm:px-5 pb-16 sm:pb-20 pt-16 sm:pt-20 md:px-10 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 0,
          filter: 'blur(20px)',
          opacity: 0.7,
          background: `
            linear-gradient(30deg, rgba(109,141,255,0.15) 12%, transparent 13%, transparent 87%, rgba(109,141,255,0.15) 88%),
            linear-gradient(150deg, rgba(109,141,255,0.15) 12%, transparent 13%, transparent 87%, rgba(109,141,255,0.15) 88%),
            linear-gradient(30deg, rgba(109,141,255,0.15) 12%, transparent 13%, transparent 87%, rgba(109,141,255,0.15) 88%),
            linear-gradient(150deg, rgba(109,141,255,0.15) 12%, transparent 13%, transparent 87%, rgba(109,141,255,0.15) 88%),
            linear-gradient(60deg, rgba(109,141,255,0.25) 25%, transparent 26%, transparent 75%, rgba(109,141,255,0.25) 76%),
            linear-gradient(60deg, rgba(109,141,255,0.25) 25%, transparent 26%, transparent 75%, rgba(109,141,255,0.25) 76%)
          `,
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
          backgroundSize: '80px 140px',
          backgroundColor: 'var(--background)',
        }}
      />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-black/10 pb-4 sm:pb-5">
        <Link href="/#programs" className={backBtnStyles.backBtn}>
          <ArrowLeft size={14} /> {t('common.backToTemplates')}
          <span className={backBtnStyles.border} />
        </Link>
      </header>
      <div className="relative z-10 mx-auto max-w-7xl pt-6 sm:pt-8">{children}</div>
    </main>
  )
}

function Empty({ title }: { title: string }) {
  const { t } = useLanguage()
  return (
    <Shell>
      <h1 className="text-2xl sm:text-4xl font-medium">{title}</h1>
      <Link href="/" className="mt-4 sm:mt-6 inline-flex text-xs sm:text-sm text-primary">{t('common.returnHome')} <ArrowRight size={14} className="ml-2" /></Link>
    </Shell>
  )
}
