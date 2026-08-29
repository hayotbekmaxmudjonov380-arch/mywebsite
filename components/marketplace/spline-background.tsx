'use client'

import { useState, useEffect, useRef } from 'react'

export function SplineBackground() {
  const [mounted, setMounted] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = wrapperRef.current?.querySelector('spline-viewer')
    if (!el) return

    const removeBranding = () => {
      const shadow = (el as any).shadowRoot
      if (!shadow) return
      const logo = shadow.querySelector('[part="spline-logo"]')
      if (logo) logo.style.display = 'none'
      const badge = shadow.querySelector('.branding, [class*="brand"], [class*="logo"], [class*="watermark"]')
      if (badge) badge.style.display = 'none'
    }

    removeBranding()
    const observer = new MutationObserver(removeBranding)
    observer.observe(el, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [mounted])

  if (!mounted) return null

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <spline-viewer
        url="https://prod.spline.design/eukrn1QKORGsrEyB/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
