'use client'

import { useRef, useState, useCallback } from 'react'
import { categories } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import { categoryNames, categoryDescriptions } from '@/lib/translations'
import styles from './category-carousel.module.css'

export function CategoryCarousel() {
  const { locale } = useLanguage()
  const innerRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const dragRotation = useRef(0)
  const baseRotation = useRef(0)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!innerRef.current) return
    isDragging.current = true
    startX.current = e.clientX
    dragRotation.current = 0

    if (resumeTimer.current) clearTimeout(resumeTimer.current)

    const style = getComputedStyle(innerRef.current)
    const matrix = style.transform
    let angle = 0
    if (matrix && matrix !== 'none') {
      const values = matrix.match(/matrix.*\((.+)\)/)
      if (values) {
        const parts = values[1].split(', ').map(parseFloat)
        angle = Math.round(Math.atan2(parts[1], parts[0]) * (180 / Math.PI))
      }
    }
    baseRotation.current = angle
    innerRef.current.style.animation = 'none'
    innerRef.current.style.transform = `perspective(1000px) rotateX(-15deg) rotateY(${angle}deg)`
    setPaused(true)
    innerRef.current.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !innerRef.current) return
    const deltaX = e.clientX - startX.current
    dragRotation.current = deltaX * 0.4
    innerRef.current.style.transform =
      `perspective(1000px) rotateX(-15deg) rotateY(${baseRotation.current + dragRotation.current}deg)`
  }, [])

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current || !innerRef.current) return
    isDragging.current = false
    baseRotation.current += dragRotation.current
    dragRotation.current = 0

    resumeTimer.current = setTimeout(() => {
      if (!innerRef.current) return
      innerRef.current.style.animation = ''
      innerRef.current.style.animationDuration = '20s'
      innerRef.current.style.animationTimingFunction = 'linear'
      innerRef.current.style.animationIterationCount = 'infinite'
      innerRef.current.style.animationName = 'rotating'
      setPaused(false)
    }, 100)
  }, [])

  return (
    <div className={styles.carouselWrapper}>
      <div
        ref={innerRef}
        className={styles.inner}
        style={{ ['--quantity' as string]: categories.length }}
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
