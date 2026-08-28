'use client'

import { useEffect, useRef } from 'react'

export function LiquidMetal() {
  const blobRef = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blob = blobRef.current
    const blob2 = blob2Ref.current
    if (!blob || !blob2) return

    let mouseX = 0
    let mouseY = 0
    let blobX = 0
    let blobY = 0
    let blob2X = 0
    let blob2Y = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      blobX += (mouseX - blobX) * 0.08
      blobY += (mouseY - blobY) * 0.08
      blob2X += (mouseX - blob2X) * 0.04
      blob2Y += (mouseY - blob2Y) * 0.04

      blob.style.transform = `translate(${blobX - 150}px, ${blobY - 150}px)`
      blob2.style.transform = `translate(${blob2X - 200}px, ${blob2Y - 200}px)`

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={blobRef}
        className="absolute"
        style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,200,210,0.4) 0%, rgba(180,180,195,0.2) 40%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,190,205,0.25) 0%, rgba(170,170,185,0.1) 50%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
