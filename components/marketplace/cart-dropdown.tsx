'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/catalog'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'
import styles from './favorites-dropdown.module.css'

export function CartDropdown() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { items, removeItem, count } = useCart()
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={styles.trigger}
        aria-label="Cart"
      >
        <ShoppingBag size={16} />
        {mounted && count > 0 && (
          <span className={styles.badge}>{count}</span>
        )}
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.title}>{t('common.cart')} ({count})</div>
          {count === 0 ? (
            <div className={styles.empty}>Savat bo&apos;sh</div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.licenseId}`} className={styles.item}>
                <Link
                  href={`/products/${item.product.slug}`}
                  onClick={() => setOpen(false)}
                  className={styles.itemThumb}
                  style={{ background: item.product.cover }}
                />
                <Link
                  href={`/products/${item.product.slug}`}
                  onClick={() => setOpen(false)}
                  className={styles.itemInfo}
                >
                  <div className={styles.itemName}>{item.product.name}</div>
                  <div className={styles.itemPrice}>{formatPrice(item.product.price)}</div>
                </Link>
                <button
                  onClick={() => removeItem(item.product.id, item.licenseId)}
                  className={styles.removeBtn}
                  aria-label="Remove"
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
          {count > 0 && (
            <div style={{ padding: '8px', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, padding: '4px 8px' }}>
                <span>Jami:</span>
                <span style={{ fontFamily: 'monospace' }}>
                  {formatPrice(items.reduce((sum, item) => sum + item.product.price, 0))}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
