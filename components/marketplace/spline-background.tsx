'use client'

import { useState, useEffect } from 'react'

export function SplineBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <spline-viewer
        url="https://prod.spline.design/eukrn1QKORGsrEyB/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
