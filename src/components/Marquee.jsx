import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Marquee() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const loop = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: 18,
      ease: 'none',
    })
    return () => loop.kill()
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="flex whitespace-nowrap" style={{ width: '200%' }} ref={ref}>
        <div className="flex gap-8 px-6 py-3 text-slate-300">
          <span>Brand Strategy</span>
          <span>Interactive Websites</span>
          <span>Motion Design</span>
          <span>WebGL/GLSL</span>
          <span>3D Modeling</span>
          <span>Creative Development</span>
          <span>Identity Systems</span>
          <span>Digital Products</span>
        </div>
        <div className="flex gap-8 px-6 py-3 text-slate-300" aria-hidden>
          <span>Brand Strategy</span>
          <span>Interactive Websites</span>
          <span>Motion Design</span>
          <span>WebGL/GLSL</span>
          <span>3D Modeling</span>
          <span>Creative Development</span>
          <span>Identity Systems</span>
          <span>Digital Products</span>
        </div>
      </div>
    </div>
  )
}
