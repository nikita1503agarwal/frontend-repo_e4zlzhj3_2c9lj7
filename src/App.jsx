import React from 'react'
import Hero3D from './components/Hero3D'
import LeftRail from './components/LeftRail'
import DisplaceGallery from './components/DisplaceGallery'
import Marquee from './components/Marquee'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b10] via-[#0b0d16] to-black text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:grid md:grid-cols-[340px,1fr] md:gap-8">
          {/* Left rail with key info */}
          <div className="md:pr-4 order-1 md:order-none">
            <LeftRail />
          </div>

          {/* Main content */}
          <div className="space-y-8 order-2 md:order-none">
            <Hero3D />
            <Marquee />

            {/* Case study section with GLSL displacement image */}
            <section id="work" className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
                <h3 className="text-2xl font-semibold tracking-tight">Immersive Launch Campaign</h3>
                <p className="text-slate-300 mt-2">A cinematic website blending WebGL shaders, camera parallax and micro-interactions for a seamless product reveal.</p>
                <ul className="mt-4 text-slate-400 text-sm list-disc list-inside space-y-1">
                  <li>Custom GLSL displacement and noise</li>
                  <li>GSAP timelines + smooth UX</li>
                  <li>3D scene integration</li>
                </ul>
              </div>
              <DisplaceGallery />
            </section>

            {/* Contact */}
            <section id="contact" className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h3 className="text-2xl font-semibold tracking-tight">Let’s build something unreal</h3>
              <p className="text-slate-300 mt-2">Tell us about your vision. We’ll architect, design and develop the experience end-to-end.</p>
              <form className="mt-4 grid md:grid-cols-2 gap-4">
                <input className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-slate-400 outline-none focus:border-indigo-400" placeholder="Your name" />
                <input className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-slate-400 outline-none focus:border-indigo-400" placeholder="Email" />
                <textarea rows="4" className="md:col-span-2 w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-slate-400 outline-none focus:border-indigo-400" placeholder="What are you building?" />
                <button className="md:col-span-2 justify-self-start px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors">Send Inquiry</button>
              </form>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-slate-400 text-sm">
          © {new Date().getFullYear()} Nebula Studio. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default App
