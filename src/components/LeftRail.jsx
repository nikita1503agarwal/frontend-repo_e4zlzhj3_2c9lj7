import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Menu, Star, Send, Sparkles } from 'lucide-react'

export default function LeftRail() {
  const railRef = useRef(null)

  useEffect(() => {
    const el = railRef.current
    const ctx = gsap.context(() => {
      gsap.from(el, { x: -60, opacity: 0, duration: 1.1, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  return (
    <aside ref={railRef} className="sticky top-6 self-start w-full md:w-[340px] space-y-6">
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 grid place-items-center text-indigo-300">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">Nebula Studio</p>
            <p className="text-xs text-slate-400">Creative Agency</p>
          </div>
        </div>
        <button className="text-slate-300 hover:text-white transition-colors">
          <Menu />
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur space-y-3">
        <h3 className="text-slate-200 font-semibold">Highlights</h3>
        <ul className="text-slate-400 text-sm space-y-2">
          <li className="flex items-center gap-2"><Star size={16} className="text-yellow-400"/> Award-winning motion design</li>
          <li className="flex items-center gap-2"><Star size={16} className="text-yellow-400"/> WebGL + GLSL specialists</li>
          <li className="flex items-center gap-2"><Star size={16} className="text-yellow-400"/> Full-stack product builds</li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20 border border-white/10 rounded-2xl p-5">
        <p className="text-slate-300 text-sm">Have a wild idea? We’ll turn it into an immersive experience.</p>
        <a href="#contact" className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
          <Send size={16}/> Start a Project
        </a>
      </div>
    </aside>
  )
}
