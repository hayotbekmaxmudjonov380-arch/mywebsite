'use client'

import Image from 'next/image'

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-end sm:items-center">
      <Image
        src="/rasm2.png"
        alt="ITSHOP digital ecosystem"
        width={1200}
        height={1200}
        quality={100}
        className="relative h-[55vh] max-h-[400px] w-auto object-contain object-right-bottom select-none sm:h-[80vh] sm:max-h-[600px] md:h-[85vh] md:max-h-[680px]"
        style={{
          maskImage: 'linear-gradient(to left, black 60%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 95%)',
          marginRight: '-5%',
        }}
        priority
      />
    </div>
  )
}
