'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { categories } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import { categoryNames, categoryDescriptions } from '@/lib/translations'
import styles from './category-carousel.module.css'

export function CategoryCarousel() {
  const { locale } = useLanguage()
  const innerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const dragOffset = useRef(0)
  const pauseOffset = useRef(0)
  const [animStyle, setAnimStyle] = useState<React.CSSProperties>({})
  const [isPaused, setIsPaused] = useState(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    startX.current = e.clientX
    dragOffset.current = 0
    setIsPaused(true)
    innerRef.current?.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !innerRef.current) return
    const delta = e.clientX - startX.current
    dragOffset.current = delta * 0.3
    innerRef.current.style.transform =
      `perspective(1000px) rotateX(-15deg) rotateY(${pauseOffset.current + dragOffset.current}deg)`
  }, [])

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    pauseOffset.current += dragOffset.current
    dragOffset.current = 0
    setTimeout(() => setIsPaused(false), 50)
  }, [])

  useEffect(() => {
    if (!isPaused && innerRef.current) {
      setAnimStyle({
        animation: `rotating 20s linear infinite`,
      })
    }
  }, [isPaused])

  return (
    <div className={styles.carouselWrapper}>
      <div
        ref={innerRef}
        className={styles.inner}
        style={{
          ['--quantity' as string]: categories.length,
          ...(isPaused
            ? { animation: 'none' }
            : animStyle),
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {categories.map((cat, index) => {
          const name = categoryNames[locale]?.[cat.id] || cat.name
          const desc = categoryDescriptions[locale]?.[cat.id] || cat.description
          return (
            <div
              key={cat.id}
              className={styles.card}
              style={{
                ['--index' as string]: index,
                ['--color-card' as string]: cat.color.replace('#', '').match(/.{2}/g)?.map(h => parseInt(h, 16)).join(', ') || '109,141,255',
                transform: `rotateY(calc((360deg / ${categories.length}) * ${index})) translateZ(calc((var(--w) + var(--h)) + 0px))`,
              }}
            >
              <span className={styles.cardIcon}>{cat.icon}</span>
              <span className={styles.cardTitle}>{name}</span>
              <span className={styles.cardDesc}>{desc}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
