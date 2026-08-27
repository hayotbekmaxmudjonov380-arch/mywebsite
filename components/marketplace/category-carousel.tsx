'use client'

import { categories } from '@/lib/catalog'
import { useLanguage } from '@/lib/language-context'
import { categoryNames, categoryDescriptions } from '@/lib/translations'
import styles from './category-carousel.module.css'

export function CategoryCarousel() {
  const { locale } = useLanguage()

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.inner} style={{ ['--quantity' as string]: categories.length }}>
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
