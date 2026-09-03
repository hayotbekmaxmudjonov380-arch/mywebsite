'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Download, Lock, Settings, ShoppingBag, Star } from 'lucide-react'
import { getCategory, formatPrice } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { categoryNames, licenseFeatures, statsTranslations } from '@/lib/translations'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ProfileCard } from '@/components/marketplace/profile-card'
import { FavoriteButton } from '@/components/marketplace/favorite-button'
import { CheckoutButton } from '@/components/checkout/checkout-button'
import { useAuth } from '@/lib/auth-context'
import backBtnStyles from './back-button.module.css'
import catBgStyles from './category-bg.module.css'
import type { Product } from '@/lib/marketplace-types'

export function ProductView({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const { t, locale } = useLanguage()
  const { addItem } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Failed to fetch product:', err))
  }, [slug])

  if (!product) return <Empty title={`${t('common.notFound')}`} />
  const lf = licenseFeatures[locale]

  const handleAdd = (licenseId: string) => {
    addItem(product, licenseId)
    setAddedId(licenseId)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <Shell>
      <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="aspect-video max-h-[350px] border border-black/10 p-5 sm:p-8 md:p-10" style={{ background: product.cover }}>
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
          <h1 className="mt-3 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-medium tracking-[-.05em] text-black dark:text-white">{product.name}</h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-gray-600 dark:text-gray-400">{product.longDescription}</p>
          <div className="mt-5 sm:mt-7 flex items-center gap-2 text-xs sm:text-sm text-black dark:text-white">
            <Star size={15} fill="currentColor" /> {product.rating} <span className="text-gray-500">{t('product.reviews', { count: product.reviews })}</span>
          </div>
          <div className="mt-7 sm:mt-10 flex flex-col gap-4 sm:gap-5">
            {product.licenses.map((item) => (
              <div key={item.id} className="relative flex flex-col rounded-xl bg-[#212121] border border-white/20 p-5 sm:p-6 text-white shadow-lg">
                <div className="mb-5 border-b border-white/20 pb-4 text-center">
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-white/70">{lf?.[item.id === 'personal' ? 'personal' : 'commercial'] || item.name}</p>
                  <div className="mt-2 flex items-start justify-center gap-1 font-mono text-4xl sm:text-5xl leading-none">
                    <span className="mt-1 text-xl sm:text-2xl">$</span>
                    {Math.floor(item.price)}
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5 sm:gap-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15">
                        <Check size={12} />
                      </span>
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 sm:mt-6">
                  <CheckoutButton
                    productId={product.id}
                    licenseId={item.id}
                    price={item.price}
                  />
                </div>
                <button
                  onClick={() => handleAdd(item.id)}
                  className={`mt-3 w-full rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors ${
                    addedId === item.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {addedId === item.id ? '✓ QO\'SHILDI' : t('product.addToCart')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

export function CategoryView({ slug }: { slug: string }) {
  const [items, setItems] = useState<Product[]>([])
  const category = getCategory(slug)
  const { t, locale } = useLanguage()

  useEffect(() => {
    fetch(`/api/products?category=${slug}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Failed to fetch products:', err))
  }, [slug])

  if (!category) return <Empty title={`${t('common.notFound')}`} />
  const catName = categoryNames[locale]?.[slug] || category.name
  return (
    <Shell>
      <div className="text-center">
        <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('category.categoryOf')} / {catName}</p>
        <h1 className="mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl font-medium tracking-[-.06em] text-black dark:text-white">{catName}</h1>
        <p className="mt-4 sm:mt-6 mx-auto max-w-md text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600 dark:text-gray-400">{category.description}</p>
      </div>
      <div className="mt-10 sm:mt-16 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.length ? items.map((product) => (
          <div key={product.id} className="relative border border-black/10 dark:border-white/10 p-4 sm:p-5 hover:border-primary/60 bg-white dark:bg-white/5">
            <Link href={`/products/${product.slug}`} className="block">
              <div className="aspect-video" style={{ background: product.cover }} />
              <h2 className="mt-4 sm:mt-5 font-medium text-sm sm:text-base text-black dark:text-white">{product.name}</h2>
              <p className="mt-1.5 sm:mt-2 text-xs text-gray-500 dark:text-gray-400">{product.description}</p>
              <div className="mt-4 sm:mt-5 flex items-center justify-between">
                <p className="font-mono text-xs sm:text-sm text-black dark:text-white">{formatPrice(product.price)}</p>
                <FavoriteButton productId={product.id} size="small" />
              </div>
            </Link>
          </div>
        )) : <Empty title={t('category.empty')} />}
      </div>
    </Shell>
  )
}

export function AccountView() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetch('/api/orders', {
        headers: { 'x-session-id': document.cookie.match(/itshopping_session=([^;]+)/)?.[1] || '' },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [user])

  return (
    <Shell>
      <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('account.eyebrow')}</p>
      <h1 className="mt-3 sm:mt-4 text-4xl sm:text-6xl font-medium tracking-[-.06em] text-black dark:text-white">{t('account.title')}</h1>
      <div className="mt-10 sm:mt-14 flex flex-col lg:flex-row gap-6 sm:gap-10 items-start">
        <div className="w-full lg:w-auto flex justify-center">
          <ProfileCard />
        </div>
        <div className="flex-1 grid gap-3 sm:gap-4">
          <div className="border border-black/10 dark:border-white/10 p-5 sm:p-6 bg-white dark:bg-white/5">
            <h2 className="font-medium text-sm sm:text-base text-black dark:text-white">{t('account.downloads')}</h2>
            {loading ? (
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">Yuklanmoqda...</p>
            ) : orders.length > 0 ? (
              <div className="mt-4 space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-black/10 dark:border-white/10 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">{order.product?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{order.license?.name} — ${order.amount}</p>
                    </div>
                    {order.status === 'completed' && order.downloadToken ? (
                      <a
                        href={`/download?token=${order.downloadToken}&order=${order.id}`}
                        className="text-xs text-primary hover:underline"
                      >
                        Yuklab olish
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">{order.status === 'pending' ? 'Kutilmoqda' : 'Tugallangan'}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('account.signIn')}</p>
            )}
          </div>
          <div className="border border-black/10 dark:border-white/10 p-5 sm:p-6 bg-white dark:bg-white/5">
            <Settings className="text-primary" size={20} />
            <h2 className="mt-5 sm:mt-6 font-medium text-sm sm:text-base text-black dark:text-white">{t('account.profile')}</h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('account.profileDesc')}</p>
          </div>
        </div>
      </div>
    </Shell>
  )
}

export function AdminView() {
  const [stats, setStats] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'users'>('overview')
  const { t, locale } = useLanguage()
  const { user } = useAuth()

  useEffect(() => {
    const sessionId = document.cookie.match(/itshopping_session=([^;]+)/)?.[1]
    if (sessionId) {
      fetch('/api/admin/stats', {
        headers: { 'x-session-id': sessionId },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) setStats(data.stats)
        })
        .catch((err) => console.error('Failed to fetch admin stats:', err))
    }
  }, [])

  if (!stats) {
    return (
      <Shell>
        <p className="text-center text-gray-500">Yuklanmoqda...</p>
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.25em] text-primary">{t('admin.eyebrow')}</p>
          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl font-medium tracking-[-.06em] text-black dark:text-white">{t('admin.title')}</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-black/10 dark:border-white/10 p-4 sm:p-5 bg-white dark:bg-white/5">
          <p className="text-xs text-gray-500 dark:text-gray-400">Mahsulotlar</p>
          <p className="mt-2 text-2xl font-semibold text-black dark:text-white">{stats.totalProducts}</p>
        </div>
        <div className="border border-black/10 dark:border-white/10 p-4 sm:p-5 bg-white dark:bg-white/5">
          <p className="text-xs text-gray-500 dark:text-gray-400">Buyurtmalar</p>
          <p className="mt-2 text-2xl font-semibold text-black dark:text-white">{stats.totalOrders}</p>
        </div>
        <div className="border border-black/10 dark:border-white/10 p-4 sm:p-5 bg-white dark:bg-white/5">
          <p className="text-xs text-gray-500 dark:text-gray-400">Foydalanuvchilar</p>
          <p className="mt-2 text-2xl font-semibold text-black dark:text-white">{stats.totalUsers}</p>
        </div>
        <div className="border border-black/10 dark:border-white/10 p-4 sm:p-5 bg-white dark:bg-white/5">
          <p className="text-xs text-gray-500 dark:text-gray-400">Umumiy daromad</p>
          <p className="mt-2 text-2xl font-semibold text-black dark:text-white">${stats.totalRevenue}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-black/10 dark:border-white/10">
        {(['overview', 'products', 'orders', 'users'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
          >
            {tab === 'overview' ? 'Umumiy' : tab === 'products' ? 'Mahsulotlar' : tab === 'orders' ? 'Buyurtmalar' : 'Foydalanuvchilar'}
          </button>
        ))}
      </div>

      {/* Recent Orders */}
      {activeTab === 'overview' && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-black dark:text-white">So'nggi buyurtmalar</h2>
          <div className="mt-4 overflow-x-auto border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between border-b border-black/10 dark:border-white/10 px-4 py-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">{order.product}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">@{order.user}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-black dark:text-white">${order.amount}</p>
                    <p className={`text-xs ${order.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {order.status === 'completed' ? 'Tugallangan' : 'Kutilmoqda'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500 dark:text-gray-400">Hali buyurtmalar yo'q</p>
            )}
          </div>
        </div>
      )}
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
          filter: 'blur(1px)',
          background: `
            linear-gradient(30deg, rgba(109,141,255,0.12) 12%, transparent 13%, transparent 87%, rgba(109,141,255,0.12) 88%),
            linear-gradient(150deg, rgba(109,141,255,0.12) 12%, transparent 13%, transparent 87%, rgba(109,141,255,0.12) 88%),
            linear-gradient(30deg, rgba(109,141,255,0.12) 12%, transparent 13%, transparent 87%, rgba(109,141,255,0.12) 88%),
            linear-gradient(150deg, rgba(109,141,255,0.12) 12%, transparent 13%, transparent 87%, rgba(109,141,255,0.12) 88%),
            linear-gradient(60deg, rgba(109,141,255,0.18) 25%, transparent 26%, transparent 75%, rgba(109,141,255,0.18) 76%),
            linear-gradient(60deg, rgba(109,141,255,0.18) 25%, transparent 26%, transparent 75%, rgba(109,141,255,0.18) 76%)
          `,
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
          backgroundSize: '80px 140px',
          backgroundColor: 'var(--background)',
        }}
      />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 sm:pb-5 text-black dark:text-white">
        <Link href="/#programs" className={backBtnStyles.backBtn}>
          <ArrowLeft size={14} /> {t('common.backToTemplates')}
          <span className={backBtnStyles.border} />
        </Link>
      </header>
      <div className="relative z-10 mx-auto max-w-7xl pt-6 sm:pt-8 text-black dark:text-white">{children}</div>
    </main>
  )
}

function Empty({ title }: { title: string }) {
  const { t } = useLanguage()
  return (
    <Shell>
      <h1 className="text-2xl sm:text-4xl font-medium text-black dark:text-white">{title}</h1>
      <Link href="/" className="mt-4 sm:mt-6 inline-flex text-xs sm:text-sm text-primary">{t('common.returnHome')} <ArrowRight size={14} className="ml-2" /></Link>
    </Shell>
  )
}
