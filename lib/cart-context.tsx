'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Product } from '@/lib/marketplace-types'

interface CartItem {
  product: Product
  licenseId: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, licenseId: string) => void
  removeItem: (productId: string, licenseId: string) => void
  clearCart: () => void
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, licenseId: string) => {
    setItems((current) => {
      const exists = current.some((item) => item.product.id === product.id && item.licenseId === licenseId)
      if (exists) return current
      return [...current, { product, licenseId }]
    })
  }, [])

  const removeItem = useCallback((productId: string, licenseId: string) => {
    setItems((current) => current.filter((item) => !(item.product.id === productId && item.licenseId === licenseId)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, count: items.length }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
