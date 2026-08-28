'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
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
  const lastTime = useRef(0)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const ANIM_DURATION = 20000

  useEffect(() => {
    lastTime.current = Date.now()
    const tick = () => {
      if (!isDragging.current && !paused) {
        const elapsed = (Date.now() - lastTime.current) % ANIM_DURATION
        baseRotation.current = (elapsed / ANIM_DURATION) * 360
      }
      animationFrame.current = requestAnimationFrame(tick)
    }
    const animationFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrame)
  }, [paused])

  const applyTransform = useCallback((rotation: number) => {
    if (!innerRef.current) return
    innerRef.current.style.transform =
      `perspective(1000px) rotateX(-15deg) rotateY(${rotation}deg)`
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!innerRef.current) return
    isDragging.current = true
    startX.current = e.clientX
    dragRotation.current = 0
    lastTime.current = Date.now()
    innerRef.current.setPointerCapture(e.pointerId)

    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)

    innerRef.current.style.animation = 'none'
    applyTransform(baseRotation.current)
  }, [applyTransform])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !innerRef.current) return
    const deltaX = e.clientX - startX.current
    dragRotation.current = deltaX * 0.4
    applyTransform(baseRotation.current + dragRotation.current)
  }, [applyTransform])

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current || !innerRef.current) return
    isDragging.current = false

    baseRotation.current = baseRotation.current + dragRotation.current
    dragRotation.current = 0

    resumeTimeout.current = setTimeout(() => {
      if (!innerRef.current) return
      const elapsed = baseRotation.current
      innerRef.current.style.animation = ''
      innerRef.current.style.animationDuration = `${ANIM_DURATION}ms`
      innerRef.current.style.animationTimingFunction = 'linear'
      innerRef.current.style.animationIterationCount = 'infinite'
      innerRef.current.style.animationName = 'none'
      void innerRef.current.offsetHeight
      innerRef.current.style.animationName = 'rotating'
      lastTime.current = Date.now() - (elapsed / 360) * ANIM_DURATION
    }, 300)
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
