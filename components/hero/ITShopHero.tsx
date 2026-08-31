'use client'

import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-context'

const RobotScene = dynamic(
  () => import('./RobotScene').then((mod) => mod.RobotScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#6d8dff] border-t-transparent" />
      </div>
    ),
  }
)

export function ITShopHero() {
  const mouse = useMousePosition()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const scrollToProducts = () => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 65% 50%, rgba(109,141,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(109,141,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(109,141,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-8 px-5 pt-28 pb-16 md:flex-row md:px-10 md:pt-0">
        {/* Left — Text Content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#6d8dff]/20 bg-[#6d8dff]/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6d8dff] shadow-[0_0_6px_#6d8dff]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6d8dff]">
              {t('hero.badge')}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-balance font-semibold leading-[0.92] tracking-[-.05em] sm:leading-[.88] sm:tracking-[-.07em]" style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}>
            <span className="block text-white">{t('hero.title1')}</span>
            <span className="block text-[#6d8dff]">{t('hero.title2')}</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-md text-sm leading-6 text-gray-400 md:text-base md:leading-7">
            {t('hero.desc')}
          </p>

          {/* CTA */}
          <button
            onClick={scrollToProducts}
            className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#6d8dff] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(109,141,255,0.25)] transition-all duration-300 hover:bg-[#5a7af0] hover:shadow-[0_0_40px_rgba(109,141,255,0.35)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('hero.cta1')}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Trust indicators */}
          <div className="mt-10 flex items-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>2,400+ foydalanuvchi</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>4.8 reyting</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Xavfsiz to'lov</span>
            </div>
          </div>
        </div>

        {/* Right — 3D Robot */}
        <div className="flex flex-1 items-center justify-center" style={{ minHeight: '500px' }}>
          <RobotScene mouseX={mouse.x} mouseY={mouse.y} isMoving={mouse.isMoving} />
        </div>
      </div>
    </section>
  )
}
