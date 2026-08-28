'use client'

import styles from './windows-icon.module.css'

export function WindowsIcon() {
  return (
    <div className={styles.winIcon}>
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <clipPath id="win-top-clip" clipPathUnits="objectBoundingBox">
          <path d="m 0,0 v 0.04496528 0.35210937 a 0.16917447,0.23564182 0 0 0 0.11164713,0.0599002 0.16917447,0.23564182 0 0 0 0.12351562,-0.0751997 h 9.3967e-4 A 0.32874868,0.28074741 0 0 1 0.507398,0.25882161 0.32874868,0.28074741 0 0 1 0.8074935,0.42504775 0.13619505,0.18305407 0 0 0 0.91526908,0.49652342 0.13619505,0.18305407 0 0 0 1,0.45674263 V 0.17021485 0 H 0.16957248 0.05458116 Z" />
        </clipPath>
        <filter id="win-red-filter">
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.05 0 0 0 0 0 0 2 0 0 0" type="matrix" in="SourceGraphic" />
        </filter>
        <filter id="win-green-filter">
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 2.5 0 0 0" type="matrix" in="SourceGraphic" />
        </filter>
        <filter id="win-blue-filter">
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.7 0 0 0 0 1 0 2 0 0 0" type="matrix" in="SourceGraphic" />
        </filter>
        <filter id="win-yellow-filter">
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 2.5 0 0 0" type="matrix" in="SourceGraphic" />
        </filter>
      </svg>
      <div className={styles.winIconBg} />
      <div className={styles.winIconTop} />
      <div className={styles.winColors}>
        <div className={styles.winRed} />
        <div className={styles.winGreen} />
        <div className={styles.winBlue} />
        <div className={styles.winYellow} />
      </div>
      <svg className={styles.winLogo} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 5.5L10.5 4.5V11.5H3V5.5Z"/>
        <path d="M10.5 4.5L21 3V11.5H10.5V4.5Z"/>
        <path d="M3 11.5H10.5V18.5L3 17.5V11.5Z"/>
        <path d="M10.5 11.5H21V20L10.5 18.5V11.5Z"/>
      </svg>
    </div>
  )
}
