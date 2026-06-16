import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import PageLayout from '../components/PageLayout'

function ScrollToTop() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return null
}

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' },
})

const LANGUAGES = [
  { flag: '🇬🇷', name: 'Greek', level: 'Native' },
  { flag: '🇬🇧', name: 'English', level: 'Fluent' },
  { flag: '🇫🇷', name: 'French', level: 'B2' },
]

const DETAILS = [
  { label: 'Originally from', value: 'Athens, Greece' },
  { label: 'Based in', value: 'London, UK' },
  { label: 'Current company', value: 'IBM' },
  { label: 'Client', value: 'HMRC, Customs Declaration Service' },
  { label: 'Education', value: "MSc Imperial College London · BSc King's College London" },
  { label: 'Open to', value: 'Solutions Engineer, Forward Deployed Engineer, AI Engineer' },
  { label: 'Contact', value: 'kazantzi.elia@gmail.com' },
]

const CARDS = [
  {
    id: 'work',
    icon: '💻',
    label: 'The work',
    color: 'var(--blue)',
    colorDim: 'var(--blue-dim)',
    colorBorder: 'var(--blue-border)',
    preview: "Four years at IBM, building software on one of the UK's largest government platforms.",
    paragraphs: [
      "For the last four years, I've been building software at IBM, mainly on HMRC's Customs Declaration Service, one of the UK's largest government platforms.",
      "Most of my work has been in Java and Spring Boot, building distributed systems that process millions of customs transactions every day. I've worked across inventory, exports, compliance, and declarations, giving me a broad understanding of how complex platforms are designed, delivered, and maintained.",
      "What I enjoy most is turning complex requirements into practical solutions and working with teams to take ideas from concept through to production.",
    ],
  },
  {
    id: 'background',
    icon: '🧬',
    label: 'The background',
    color: 'var(--purple)',
    colorDim: 'var(--purple-dim)',
    colorBorder: 'var(--purple-border)',
    preview: "Biochemistry at KCL, Biotechnology at Imperial, then a pivot into software engineering.",
    paragraphs: [
      "My path into software engineering wasn't a traditional one.",
      "I studied Biochemistry at King's College London before completing an MSc in Biotechnology at Imperial College London. During my Master's, I started writing Python for data analysis and realised I was far more interested in building the tools than using them.",
      "The scientific training never really left. It shaped how I approach problems today: staying curious, questioning assumptions, and breaking complex challenges into manageable pieces.",
    ],
  },
  {
    id: 'ai',
    icon: '🤖',
    label: 'The AI turn',
    color: 'var(--blue)',
    colorDim: 'var(--blue-dim)',
    colorBorder: 'var(--blue-border)',
    preview: "AI became the point where my scientific background and engineering work started to come together again.",
    paragraphs: [
      "AI became the point where my scientific background and engineering work started to come together again.",
      "At IBM, I built and drove adoption of an internal AI assistant that automated requirements writing and QA test generation. More recently, I've been building AI-powered applications, including ClinicalMatch Astra, a system that helps patients and clinicians discover relevant NHS clinical trials using natural language.",
      "ClinicalMatch Astra came from a desire to combine my background in biotechnology with my experience as a software engineer. AI made it possible to bridge those two worlds, using technology to make complex medical and research information more accessible.",
      "The direction I want to move in is client-facing engineering: working directly with users and customers to understand their problems, translating those needs into technical solutions, and helping bridge the gap between the two. My combination of scientific training, software engineering experience, and growing expertise in AI has naturally led me in that direction.",
    ],
  },
]

function StoryCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div {...fade(index)} style={{ marginBottom: '1px' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: open ? card.colorDim : 'var(--surface)',
          border: `1px solid ${open ? card.colorBorder : 'var(--border2)'}`,
          padding: '1.25rem 1.5rem',
          cursor: 'pointer',
          transition: 'all 0.22s',
          userSelect: 'none',
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'var(--surface2)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'var(--surface)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <span style={{ fontSize: 20 }}>{card.icon}</span>
            <div>
              <p style={{ fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: card.color, fontWeight: 700, marginBottom: 3, opacity: 0.85 }}>{card.label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.4 }}>{card.preview}</p>
            </div>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
            <ChevronDown size={16} color="var(--muted)" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '1.25rem 1.5rem 1.5rem', borderLeft: `1px solid ${card.colorBorder}`, borderRight: `1px solid ${card.colorBorder}`, borderBottom: `1px solid ${card.colorBorder}`, background: card.colorDim, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {card.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 14, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8 }}>{p}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <PageLayout title="About">
      <ScrollToTop />

      <motion.p {...fade(0)} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, color: 'var(--blue)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
        About
      </motion.p>

      <div style={{ marginBottom: '3rem' }}>
        {CARDS.map((card, i) => <StoryCard key={card.id} card={card} index={i} />)}
      </div>

      {/* Details */}
      <motion.p {...fade(3)} style={{ fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--purple)', opacity: 0.72, marginBottom: '1.25rem', fontWeight: 700 }}>
        Details
      </motion.p>
      <motion.div className="details-grid" {...fade(4)}>
        {DETAILS.map(item => (
          <div key={item.label}
            style={{ background: 'var(--bg)', padding: '1rem 1.25rem', transition: 'background 0.18s', cursor: 'default' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}>
            <p style={{ fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)', opacity: 0.65, marginBottom: 4, fontWeight: 700 }}>{item.label}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{item.value}</p>
          </div>
        ))}
        <div style={{ background: 'var(--bg)', padding: '1rem 1.25rem', transition: 'background 0.18s', cursor: 'default' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}>
          <p style={{ fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)', opacity: 0.65, marginBottom: 8, fontWeight: 700 }}>Languages</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {LANGUAGES.map(lang => (
              <span key={lang.name} title={`${lang.name} — ${lang.level}`} style={{ fontSize: 24, lineHeight: 1 }}>{lang.flag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </PageLayout>
  )
}
