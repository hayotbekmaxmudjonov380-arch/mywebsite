'use client'

import { useEffect, useRef } from 'react'

const SPLINE_URL = 'https://prod.spline.design/eukrn1QKORGsrEyB/scene.splinecode'
const RUNTIME_URL = 'https://unpkg.com/@splinetool/runtime@2.0.12/build/runtime.standalone.js'

export function SplineBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let app: any = null

    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
        const s = document.createElement('script')
        s.src = src
        s.onload = () => resolve()
        s.onerror = reject
        document.head.appendChild(s)
      })

    const init = async () => {
      await loadScript(RUNTIME_URL)
      if (disposed || !window.SplineRuntime) return

      const { Application } = window.SplineRuntime
      app = new Application(canvas, { renderer: 'webgl' })
      await app.load(SPLINE_URL)
      app.setBackgroundColor('transparent')
    }

    init().catch(() => {})

    return () => {
      disposed = true
      if (app) {
        try { app.dispose() } catch {}
      }
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(245,245,247,0.7) 50%, rgba(255,255,255,0.5) 100%)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
        }}
      />
    </div>
  )
}
