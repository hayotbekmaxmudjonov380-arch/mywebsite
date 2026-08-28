'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { categories } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import { categoryNames, categoryDescriptions } from '@/lib/translations'
import styles from './category-carousel.module.css'

export function CategoryCarousel() {
  const { locale } = useLanguage()
  const innerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [rotation, setRotation] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const currentRotation = useRef(0)
  const animationFrame = useRef<number | null>(null)

  const getRotation = useCallback(() => {
    if (!innerRef.current) return 0
    const style = window.getComputedStyle(innerRef.current)
    const matrix = new DOMMatrixReadOnly(style.transform)
    const values = Array.from(matrix.toString().matchAll(/matrix.*\((.+)\)/))
    if (values.length > 0) {
      const valuesArray = values[0][1].split(', ').map(parseFloat)
      const angle = Math.round(Math.atan2(valuesArray[1], valuesArray[0]) * (180 / Math.PI))
      return angle
    }
    return 0
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!innerRef.current) return
    isDragging.current = true
    startX.current = e.clientX
    currentRotation.current = getRotation()
    setIsPaused(true)
    innerRef.current.style.animationPlayState = 'paused'
    innerRef.current.setPointerCapture(e.pointerId)
  }, [getRotation])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !innerRef.current) return
    const deltaX = e.clientX - startX.current
    const newRotation = currentRotation.current + deltaX * 0.5
    setRotation(newRotation)
    innerRef.current.style.transform = `perspective(1000px) rotateX(-15deg) rotateY(${newRotation}deg)`
  }, [])

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current || !innerRef.current) return
    isDragging.current = false
    setIsPaused(false)
    innerRef.current.style.animationPlayState = 'running'
  }, [])

  return (
    <div className={styles.carouselWrapper}>
      <div
        ref={innerRef}
        className={styles.inner}
        style={{
          ['--quantity' as string]: categories.length,
          animationPlayState: isPaused ? 'paused' : 'running',
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
