import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4'
const NAV = ['About', 'Projects', 'Skills', 'Awards', 'CV', 'Contact']

function scrollTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // Ensure video plays on mount and stays playing — iOS needs explicit interaction
    // but muted autoplay is allowed; force it here
    v.muted = true
    v.playsInline = true
    const play = () => {
      v.play().catch(() => {
        // iOS Safari may still block; retry once on first user interaction
        const resume = () => { v.play().catch(() => {}); document.removeEventListener('touchstart', resume) }
        document.addEventListener('touchstart', resume, { once: true })
      })
    }
    play()

    // Resume if tab becomes visible again (background tab pauses video)
    const onVisible = () => { if (document.visibilityState === 'visible') play() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100svh', overflow: 'hidden', background: '#000', display: 'flex', flexDirection: 'column' }}>
      {/* Fallback gradient shown until video loads */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at 30% 55%, #0d1f2d 0%, #060d13 55%, #000 100%)' }} />

      <video
        ref={videoRef}
        style={{ position: 'absolute', inset: 0, zIndex: 1, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.45) brightness(0.55)', pointerEvents: 'none' }}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      />

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.85) 100%)' }} />
      {/* Transparent blocker to prevent native video play button on tap */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'transparent', pointerEvents: 'none' }} />

      {/* NAV */}
      <motion.nav
        style={{ position: 'relative', zIndex: 10, display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.25rem', maxWidth: '1280px', margin: '0 auto', boxSizing: 'border-box' }}
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>

        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: '2.4rem', letterSpacing: '-0.02em', lineHeight: 1, background: 'linear-gradient(90deg,#64CEFB,#8a65ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'block' }}>
            EK
          </span>
        </button>

        {/* Desktop pill nav */}
        <div style={{ display: 'none' }} className="desk-nav">
          {NAV.map(link => (
            <button key={link}
              onClick={() => link === 'CV' ? navigate('/cv') : scrollTo(link)}
              style={{ borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'none' }}>
              {link}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 4, display: 'flex', alignItems: 'center' }}
          onClick={() => setMenuOpen(o => !o)}
          className="ham-btn">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{ position: 'absolute', top: 72, left: 0, right: 0, zIndex: 20, background: 'rgba(0,0,0,0.96)', padding: '0.5rem 1.25rem 1rem', backdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            {NAV.map(link => (
              <button key={link}
                onClick={() => { link === 'CV' ? navigate('/cv') : scrollTo(link); setMenuOpen(false) }}
                style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.75)', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}>
                {link} <ArrowUpRight size={14} style={{ opacity: 0.4 }} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero copy — flex-end so it sits at the bottom */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', maxWidth: 1280, width: '100%', margin: '0 auto', padding: '1rem 1.25rem 2.5rem', boxSizing: 'border-box' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}>

          {/* Name — scales down on small screens */}
          <motion.h2
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.1, color: '#fff', marginBottom: '0.4rem' }}
            className="hero-name"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.6 }}>
            Elia Kazantzi
          </motion.h2>

          {/* Role */}
          <motion.p
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(100,206,251,0.8)', marginBottom: '1.25rem' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
            Software Engineer
          </motion.p>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '1.25rem' }} className="hero-h1">
            <motion.span style={{ display: 'block', color: '#fff' }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.65 }}>
              Scientist turned
            </motion.span>
            <motion.span style={{ display: 'block' }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44, duration: 0.65 }}>
              <span className="shine-text">engineer.</span>
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.6)', maxWidth: 380, lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}>
            Biochemistry and Biotechnology graduate turned software engineer, building backend systems and AI-powered tools.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
