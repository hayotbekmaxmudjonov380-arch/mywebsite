'use client'

import styles from './profile-card.module.css'
import { useLanguage } from '@/lib/language-context'

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function ProfileCard() {
  const { t } = useLanguage()

  return (
    <div className={styles.card}>
      {/* Profile Picture */}
      <div className={styles.imgBox}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#6d8dff" d="M47.7,-57.2C59.9,-50.5,67.1,-34.8,71.1,-18.2C75.1,-1.6,75.9,15.8,68.6,30.1C61.4,44.3,46.2,55.2,30.6,62.3C14.9,69.3,-1.1,72.4,-17.1,69.3C-33.1,66.2,-49.1,56.9,-59.8,43.3C-70.5,29.7,-76,11.8,-74.2,-5.4C-72.4,-22.6,-63.4,-39.1,-50.3,-47.4C-37.2,-55.7,-20,-55.8,-1.8,-53.5C16.4,-51.2,35.5,-63.9,47.7,-57.2Z" transform="translate(100 100)" />
          <text x="50%" y="55%" textAnchor="middle" fill="#070a11" fontSize="48" fontWeight="bold" fontFamily="system-ui">N</text>
        </svg>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h2>ITSHOP User</h2>
        <p>{t('account.profileDesc')}</p>
      </div>

      {/* Social Links */}
      <div className={styles.socials}>
        <a href="https://instagram.com/maxmudjonov_hayotbek" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <InstagramIcon />
        </a>
        <a href="https://t.me/maxmudjonovhayotbek" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
          <TwitterIcon />
        </a>
      </div>

      {/* Contact Button */}
      <button className={styles.btn}>
        {t('account.contactMe')}
      </button>
    </div>
  )
}
