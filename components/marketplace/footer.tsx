'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import styles from './footer.module.css'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Column 1 - Brand */}
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              <Image src="/logotip2.png" alt="ITSHOP" width={120} height={32} className={styles.footerLogoImage} />
            </Link>
            <p className={styles.footerTagline}>{t('footer_new.tagline')}</p>
            <div className={styles.socialLinks}>
              <a href="https://t.me/maxmudjonovhayotbek" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="https://www.instagram.com/maxmudjonov_hayotbek?igsi=dXUzbGNscmx0OTFl" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@itshop_uz" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.11V9a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.22a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.65z"/></svg>
              </a>
              <a href="https://youtube.com/@ITSHOP-m2l" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Column 2 - Products */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>{t('footer_new.products.title')}</h4>
            <ul className={styles.footerColumnLinks}>
              <li><Link href="/categories/mobile">{t('footer_new.products.mobile')}</Link></li>
              <li><Link href="/categories/web">{t('footer_new.products.web')}</Link></li>
              <li><Link href="/categories/telegram">{t('footer_new.products.telegram')}</Link></li>
              <li><Link href="/categories/desktop">{t('footer_new.products.desktop')}</Link></li>
              <li><Link href="/categories/ai">{t('footer_new.products.ai')}</Link></li>
            </ul>
          </div>
          
          {/* Column 3 - Company */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>{t('footer_new.company.title')}</h4>
            <ul className={styles.footerColumnLinks}>
              <li><Link href="/#">{t('footer_new.company.about')}</Link></li>
              <li><Link href="/#">{t('footer_new.company.partners')}</Link></li>
              <li><Link href="#contact">{t('footer_new.company.contact')}</Link></li>
              <li><Link href="/#">{t('footer_new.company.blog')}</Link></li>
              <li><Link href="/#">{t('footer_new.company.careers')}</Link></li>
            </ul>
          </div>
          
          {/* Column 4 - Support */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>{t('footer_new.support.title')}</h4>
            <ul className={styles.footerColumnLinks}>
              <li><Link href="/#">{t('footer_new.support.faq')}</Link></li>
              <li><Link href="/#">{t('footer_new.support.returns')}</Link></li>
              <li><Link href="/#">{t('footer_new.support.terms')}</Link></li>
              <li><Link href="/#">{t('footer_new.support.privacy')}</Link></li>
              <li><Link href="/#">{t('footer_new.support.license')}</Link></li>
            </ul>
          </div>
          
          {/* Column 5 - Newsletter */}
          <div className={styles.newsletter}>
            <h4 className={styles.footerColumnTitle}>{t('footer_new.newsletter.title')}</h4>
            <p className={styles.footerTagline}>{t('footer_new.newsletter.desc')}</p>
            <div className={styles.newsletterInput}>
              <input 
                type="email" 
                placeholder={t('footer_new.newsletter.placeholder')}
                aria-label="Email"
              />
              <button type="button" aria-label="Subscribe">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.bottomFooter}>
          <p className={styles.bottomFooterLeft}>{t('footer_new.copy')}</p>
          <p className={styles.bottomFooterRight}>{t('footer_new.slogan')}</p>
        </div>
      </div>
    </footer>
  )
}
