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

    const hideBranding = () => {
      const el = wrapperRef.current?.querySelector('spline-viewer')
      if (!el) return
      const shadow = (el as any).shadowRoot
      if (!shadow) return

      shadow.querySelectorAll('*').forEach((node: HTMLElement) => {
        const rect = node.getBoundingClientRect?.()
        if (!rect) return
        const w = rect.width
        const h = rect.height
        if (w < 200 && h < 60 && (w > 50 || h > 10)) {
          const style = window.getComputedStyle(node)
          const pos = style.position
          if (pos === 'absolute' || pos === 'fixed') {
            node.style.setProperty('display', 'none', 'important')
          }
        }
      })
    }

    hideBranding()
    const t1 = setTimeout(hideBranding, 500)
    const t2 = setTimeout(hideBranding, 2000)
    const t3 = setTimeout(hideBranding, 4000)
    const observer = new MutationObserver(hideBranding)
    observer.observe(wrapperRef.current || document.body, { childList: true, subtree: true })
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); observer.disconnect() }
  }, [mounted])

  if (!mounted) return null

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <spline-viewer
        url="https://prod.spline.design/eukrn1QKORGsrEyB/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-background pointer-events-none" style={{ zIndex: 10 }} />
      <div className="absolute bottom-0 right-0 h-8 pointer-events-none bg-background" style={{ zIndex: 10, width: 200 }} />
    </div>
  )
}
