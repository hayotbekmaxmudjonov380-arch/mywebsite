'use client'

import { useEffect, useRef } from 'react'

export function LiquidMetal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let blobX = mouseX
    let blobY = mouseY

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    let raf: number
    const animate = () => {
      blobX += (mouseX - blobX) * 0.03
      blobY += (mouseY - blobY) * 0.03
      container.style.setProperty('--mx', `${blobX}px`)
      container.style.setProperty('--my', `${blobY}px`)
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ '--mx': '50vw', '--my': '50vh' } as React.CSSProperties}>
      {/* SVG Filters for liquid morphing */}
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <defs>
          <filter id="liquid-morph">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="2" result="noise">
              <animate attributeName="seed" values="1;5;1" dur="8s" repeatCount="indefinite" />
            </feTurbulence>
            <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="10" result="noise2">
              <animate attributeName="seed" values="10;30;10" dur="12s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feDisplacementMap in="displaced" in2="noise2" scale="20" xChannelSelector="G" yChannelSelector="B" result="final" />
            <feGaussianBlur in="final" stdDeviation="0.5" />
          </filter>
          <filter id="liquid-reflect">
            <feSpecularLighting in="displaced" surfaceScale="3" specularConstant="1.2" specularExponent="25" result="specular">
              <fePointLight x="200" y="100" z="200">
                <animate attributeName="x" values="100;400;100" dur="6s" repeatCount="indefinite" />
                <animate attributeName="y" values="50;250;50" dur="8s" repeatCount="indefinite" />
              </fePointLight>
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceGraphic" operator="in" result="litShape" />
            <feComposite in="SourceGraphic" in2="litShape" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
          </filter>
        </defs>
      </svg>

      {/* Main liquid blob */}
      <div
        className="absolute"
        style={{
          width: 280,
          height: 280,
          left: 'var(--mx)',
          top: 'var(--my)',
          transform: 'translate(-50%, -50%)',
          borderRadius: '40% 60% 55% 45% / 55% 40% 60% 45%',
          background: `
            radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.95) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(200,210,225,0.8) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(160,175,200,0.9) 0%, rgba(80,90,110,0.95) 60%, rgba(30,35,50,1) 100%)
          `,
          filter: 'url(#liquid-morph) url(#liquid-reflect)',
          transition: 'border-radius 2s ease-in-out',
          animation: 'liquidShape 8s ease-in-out infinite, liquidShine 4s ease-in-out infinite',
        }}
      />

      {/* Secondary blob (smaller) */}
      <div
        className="absolute"
        style={{
          width: 120,
          height: 120,
          left: 'var(--mx)',
          top: 'var(--my)',
          transform: 'translate(40%, -30%)',
          borderRadius: '55% 45% 40% 60% / 45% 55% 45% 55%',
          background: `
            radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.9) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(170,185,210,0.85) 0%, rgba(60,70,90,0.95) 70%, rgba(25,30,45,1) 100%)
          `,
          filter: 'url(#liquid-morph)',
          animation: 'liquidShape2 10s ease-in-out infinite, liquidShine 5s ease-in-out infinite 1s',
        }}
      />

      {/* Tiny droplet */}
      <div
        className="absolute"
        style={{
          width: 40,
          height: 40,
          left: 'var(--mx)',
          top: 'var(--my)',
          transform: 'translate(-80%, 20%)',
          borderRadius: '50%',
          background: `
            radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.95) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(180,195,220,0.9) 0%, rgba(70,80,100,1) 70%)
          `,
          filter: 'url(#liquid-morph)',
          animation: 'dropletFloat 6s ease-in-out infinite 0.5s',
        }}
      />

      {/* Another tiny droplet */}
      <div
        className="absolute"
        style={{
          width: 25,
          height: 25,
          left: 'var(--mx)',
          top: 'var(--my)',
          transform: 'translate(60%, 50%)',
          borderRadius: '50%',
          background: `
            radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.9) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(190,200,225,0.85) 0%, rgba(80,90,110,1) 70%)
          `,
          filter: 'url(#liquid-morph)',
          animation: 'dropletFloat 7s ease-in-out infinite 2s',
        }}
      />

      <style jsx>{`
        @keyframes liquidShape {
          0%, 100% { border-radius: 40% 60% 55% 45% / 55% 40% 60% 45%; }
          25% { border-radius: 55% 45% 40% 60% / 40% 55% 45% 60%; }
          50% { border-radius: 45% 55% 60% 40% / 60% 45% 55% 40%; }
          75% { border-radius: 60% 40% 45% 55% / 45% 60% 40% 55%; }
        }
        @keyframes liquidShape2 {
          0%, 100% { border-radius: 55% 45% 40% 60% / 45% 55% 45% 55%; }
          33% { border-radius: 40% 60% 55% 45% / 55% 40% 60% 45%; }
          66% { border-radius: 50% 50% 45% 55% / 50% 50% 55% 45%; }
        }
        @keyframes liquidShine {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes dropletFloat {
          0%, 100% { transform: translate(-80%, 20%) scale(1); opacity: 0.8; }
          33% { transform: translate(-70%, 10%) scale(1.15); opacity: 1; }
          66% { transform: translate(-90%, 30%) scale(0.9); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
