import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'

export default function Hero3D() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([headlineRef.current, subRef.current, ctaRef.current], {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.12,
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-[80vh] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-end p-8 pointer-events-none">
        <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-6 max-w-lg pointer-events-auto">
          <h2 ref={headlineRef} className="text-3xl md:text-5xl font-bold text-white tracking-tight">Futuristic Creative Studio</h2>
          <p ref={subRef} className="mt-3 text-base md:text-lg text-slate-300">We craft cinematic brands, immersive websites and interactive visuals that feel alive.</p>
          <div ref={ctaRef} className="mt-5 flex items-center gap-3">
            <a href="#work" className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors">See Work</a>
            <a href="#contact" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">Start a Project</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
    </section>
  )
}
