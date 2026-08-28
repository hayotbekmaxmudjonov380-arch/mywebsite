'use client'

import { useRef, useState, useCallback } from 'react'
import { categories } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import { categoryNames, categoryDescriptions } from '@/lib/translations'
import styles from './category-carousel.module.css'

export function CategoryCarousel() {
  const { locale } = useLanguage()
  const innerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const pausedAngle = useRef(0)
  const [manualTransform, setManualTransform] = useState<string | null>(null)

  const freezeAtCurrentAngle = useCallback(() => {
    if (!innerRef.current || manualTransform !== null) return
    const computed = getComputedStyle(innerRef.current).transform
    let angle = 0
    if (computed && computed !== 'none') {
      const m = computed.match(/matrix\(([^)]+)\)/)
      if (m) {
        const p = m[1].split(',').map(Number)
        angle = Math.atan2(p[1], p[0]) * (180 / Math.PI)
      }
    }
    pausedAngle.current = angle
    setManualTransform(`perspective(1000px) rotateX(-15deg) rotateY(${angle}deg)`)
  }, [manualTransform])

  const unfreeze = useCallback(() => {
    if (!isDragging.current) {
      pausedAngle.current = 0
      setManualTransform(null)
    }
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    startX.current = e.clientX
    freezeAtCurrentAngle()
    innerRef.current?.setPointerCapture(e.pointerId)
  }, [freezeAtCurrentAngle])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || manualTransform === null) return
    const delta = e.clientX - startX.current
    setManualTransform(`perspective(1000px) rotateX(-15deg) rotateY(${pausedAngle.current + delta * 0.3}deg)`)
  }, [manualTransform])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
    pausedAngle.current = 0
    setManualTransform(null)
  }, [])

  return (
    <div
      className={styles.carouselWrapper}
      onTouchStart={freezeAtCurrentAngle}
      onTouchEnd={unfreeze}
    >
      <div
        ref={innerRef}
        className={styles.inner}
        style={{
          ['--quantity' as string]: categories.length,
          ...(manualTransform !== null
            ? { animation: 'none', transform: manualTransform }
            : {}),
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
