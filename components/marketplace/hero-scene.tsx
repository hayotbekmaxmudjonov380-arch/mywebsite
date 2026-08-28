'use client'

import styles from './laptop-animation.module.css'

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center sm:items-center sm:justify-end">
      <div className={styles.laptopScene}>
        <div className={styles.laptop}>
          <div className={styles.screen}>
            <div className={styles.header} />
            <div className={styles.text}>ITSHOP</div>
          </div>
          <div className={styles.keyboard} />
        </div>
      </div>
    </div>
  )
}
