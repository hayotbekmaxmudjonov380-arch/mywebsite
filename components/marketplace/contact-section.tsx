'use client'

import { useLanguage } from '@/lib/language-context'
import styles from './contact-section.module.css'

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.bgDecoration} />
      
      <div className={styles.contactContainer}>
        {/* Left Content */}
        <div className={styles.contactContent}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t('contact_new.eyebrow')}
          </p>
          
          <h2 className={styles.heading}>
            {t('contact_new.title1')}
            <br />
            {t('contact_new.title2')}
            <span className={styles.headingBlue}>{t('contact_new.title3')}</span>
          </h2>
          
          <p className={styles.description}>
            {t('contact_new.desc')}
          </p>
          
          <div className={styles.socialBar}>
            <div className={styles.socialBarInner}>
              <a href="https://t.me/maxmudjonovhayotbek" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <span className={styles.socialShadow} />
                <span className={styles.socialShadow} />
                <span className={styles.socialShadow} />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                <span className={styles.socialTooltip}>Telegram</span>
              </a>
              <a href="https://www.instagram.com/maxmudjonov_hayotbek?igsi=dXUzbGNscmx0OTFl" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <span className={styles.socialShadow} />
                <span className={styles.socialShadow} />
                <span className={styles.socialShadow} />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className={styles.socialTooltip}>Instagram</span>
              </a>
              <a href="tel:+998997689685" className={styles.socialBtn}>
                <span className={styles.socialShadow} />
                <span className={styles.socialShadow} />
                <span className={styles.socialShadow} />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span className={styles.socialTooltip}>Telefon</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Map Card */}
        <div className={styles.mapCard}>
          <div className={styles.mapCardHeader}>
            <p className={styles.mapCardTitle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ITSHOP OFFICE
            </p>
            <p className={styles.mapCardLocation}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {t('contact_new.location')}
            </p>
          </div>
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d744.2711922919523!2d60.62130486861233!3d41.558432967695765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfc9842c81fc9d%3A0x9e434d2b8a616ce9!2sIT%20Park!5e1!3m2!1sru!2s!4v1787748834782!5m2!1sru!2s"
            className={styles.mapCardIframe}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          
          <a 
            href="https://www.google.com/maps/place/IT+Park/@41.5584329,60.6213048,17z/data=!3m1!4b1!4m6!3m5!1s0x41dfc9842c81fc9d:0x9e434d2b8a616ce9!8m2!3d41.5584329!4d60.6213048!16zL20vMDFjeDRy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapDirectionBtn}
          >
            {t('contact_new.direction')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>
      </div>
      
      <div className={styles.separator} />
    </section>
  )
}
