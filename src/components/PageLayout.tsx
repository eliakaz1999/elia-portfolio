import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Props {
  title: string
  children: React.ReactNode
  rightSlot?: React.ReactNode
}

export default function PageLayout({ title, children, rightSlot }: Props) {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 clamp(1rem, 4vw, 1.5rem) 5rem' }}>
        <nav style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.4rem 0', borderBottom: '1px solid var(--border)',
          marginBottom: '3rem', position: 'sticky', top: 0,
          background: 'var(--bg)', zIndex: 10,
        }}>
          <button onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ArrowLeft size={14} style={{ color: 'var(--muted)', transition: 'color 0.15s' }} />
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '1.8rem',
                fontWeight: 400,
                background: 'linear-gradient(90deg,#64CEFB,#8a65ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}>
              EK
            </span>
          </button>
          {rightSlot ?? <div style={{ width: 60 }} />}
        </nav>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          {children}
        </motion.div>
      </div>
    </div>
  )
}
