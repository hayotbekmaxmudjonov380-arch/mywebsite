'use client'

import styles from './laptop-animation.module.css'

export function HeroScene() {
  return (
    <div className={styles.laptopScene}>
      <div className={styles.laptop}>
        <div className={styles.screen}>
          <div className={styles.header} />
          <video
            className={styles.screenVideo}
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div className={styles.keyboard} />
      </div>
    </div>
  )
}
