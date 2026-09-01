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
        </div>
        
        {/* Map Card */}
        <div className={styles.mapCard}>
          <div className={styles.mapCardHeader}>
            <p className={styles.mapCardTitle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ITSHOPPING OFFICE
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
