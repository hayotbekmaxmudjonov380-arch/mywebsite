'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { formatPrice } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import styles from './favorites-dropdown.module.css'
import type { Product } from '@/lib/marketplace-types'

function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('itshopping-favorites') || '[]')
  } catch {
    return []
  }
}

function saveFavorites(favs: string[]) {
  localStorage.setItem('itshopping-favorites', JSON.stringify(favs))
}

export function FavoritesDropdown() {
  const [open, setOpen] = useState(false)
  const [favIds, setFavIds] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    setFavIds(getFavorites())
    setMounted(true)
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err))
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const remove = (id: string) => {
    const next = favIds.filter(f => f !== id)
    saveFavorites(next)
    setFavIds(next)
  }

  const favProducts = products.filter(p => favIds.includes(p.id))

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={styles.trigger}
        aria-label="Favorites"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={favProducts.length > 0 ? 'rgb(255,50,50)' : 'none'} stroke={favProducts.length > 0 ? 'rgb(255,50,50)' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        {mounted && favProducts.length > 0 && (
          <span className={styles.badge}>{favProducts.length}</span>
        )}
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.title}>{t('nav.favorites')} ({favProducts.length})</div>
          {favProducts.length === 0 ? (
            <div className={styles.empty}>Hali yoqtirilgan dastur yo&apos;q</div>
          ) : (
            favProducts.map(product => (
              <div key={product.id} className={styles.item}>
                <Link href={`/products/${product.slug}`} onClick={() => setOpen(false)} className={styles.itemThumb} style={{ background: product.cover }} />
                <Link href={`/products/${product.slug}`} onClick={() => setOpen(false)} className={styles.itemInfo}>
                  <div className={styles.itemName}>{product.name}</div>
                  <div className={styles.itemPrice}>{formatPrice(product.price)}</div>
                </Link>
                <button onClick={() => remove(product.id)} className={styles.removeBtn} aria-label="Remove">
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
