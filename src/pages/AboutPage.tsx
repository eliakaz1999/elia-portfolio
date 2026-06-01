import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'

// Scroll to top when page loads
function ScrollToTop() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return null
}

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
})

const lbl = (color = 'var(--blue)'): React.CSSProperties => ({
  fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.18em',
  textTransform: 'uppercase', color, opacity: 0.72, marginBottom: '1.75rem', fontWeight: 700,
})

const SectionTitle = ({ children, color = 'var(--blue)' }: { children: string; color?: string }) => (
  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, color, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
    {children}
  </p>
)

const divider: React.CSSProperties = { borderTop: '1px solid var(--border)', marginBottom: '3rem', marginTop: '3rem' }

const INTERESTS = [
  {
    photo: '/photo-photography.jpg',
    label: 'Photography',
    sub: 'Skies, landscapes, and quiet moments. I shoot with a camera whenever I travel and find myself reaching for it most on clear nights.',
    accent: 'blue',
  },
  {
    photo: '/photo-watercolour.jpg',
    label: 'Watercolour painting',
    sub: 'I picked it up a few years ago and it stuck. I paint with friends whenever we get the chance and it\'s one of those things that forces you to actually switch off.',
    accent: 'purple',
  },
  {
    photo: '/photo-running.jpg',
    label: 'Long distance running',
    sub: 'Been running since I was a kid, started in track and field, worked up to a half marathon, and a full marathon is next on the list.',
    accent: 'blue',
  },
  {
    photo: '/photo-travel.jpg',
    label: 'Travelling',
    sub: 'Any excuse to get on a plane. I\'ve explored a lot of the world with friends and family and there\'s always somewhere new to add to the list.',
    accent: 'purple',
  },
  {
    photo: '/photo-tennis.jpg',
    label: 'Tennis',
    sub: 'A big fan of the sport. I\'ve been to Wimbledon a couple of times and it never gets old. I used to play as a kid, so I have a real appreciation for how hard the sport actually is.',
    accent: 'blue',
  },
  {
    photo: '/photo-concerts.jpg',
    label: 'Live music',
    sub: 'There\'s nothing quite like seeing an artist live. I go to as many concerts as I can and love discovering new music that way.',
    accent: 'purple',
  },
]

function InterestCard({ item }: { item: typeof INTERESTS[0] }) {
  const [flipped, setFlipped] = useState(false)
  const accentColor = item.accent === 'blue' ? 'var(--blue)' : 'var(--purple)'
  const accentDim = item.accent === 'blue' ? 'var(--blue-dim)' : 'var(--purple-dim)'

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{ cursor: 'pointer', position: 'relative', aspectRatio: '9/11', perspective: '1000px' }}>
      <div style={{
        position: 'absolute', inset: 0,
        transition: 'transform 0.55s cubic-bezier(0.4,0.2,0.2,1)',
        transformStyle: 'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* Front — photo */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', overflow: 'hidden', background: '#0c0e14' }}>
          <img src={item.photo} alt={item.label}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.88) brightness(0.88)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem 1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{item.label}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: 'Courier New, monospace', letterSpacing: '0.06em', marginTop: 2 }}>tap to flip</p>
          </div>
        </div>
        {/* Back — text */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: accentDim, border: `1px solid ${item.accent === 'blue' ? 'var(--blue-border)' : 'var(--purple-border)'}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem 1.25rem', gap: '0.75rem' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)', lineHeight: 1.2 }}>{item.label}</p>
          <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--text)', lineHeight: 1.7 }}>{item.sub}</p>
          <p style={{ fontSize: 10, color: accentColor, fontFamily: 'Courier New, monospace', letterSpacing: '0.06em', opacity: 0.7 }}>tap to flip back</p>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <PageLayout title="About">
      <ScrollToTop />
      <SectionTitle color="var(--blue)">About</SectionTitle>

      <motion.p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.55, marginBottom: '1.25rem', maxWidth: 580 }} {...fade(0)}>
        I'm Elia, a software engineer with just over four years of experience at IBM, based in London.
      </motion.p>
      <motion.p style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8, marginBottom: '1rem', maxWidth: 620 }} {...fade(1)}>
        I've mainly been working on HMRC's Customs Declaration Service, a large distributed system processing millions of transactions across the UK border. I've worked across inventory, exports, compliance, and declarations, which has given me a strong understanding of how the platform fits together end to end rather than just one isolated component.
      </motion.p>
      <motion.p style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8, marginBottom: '1rem', maxWidth: 620 }} {...fade(2)}>
        Most of my work has been in Java and Spring Boot, building and maintaining features and working closely with QA, DevOps, and stakeholders to take requirements through to production. Testing is built in from the start. I work with QA early to define BDD scenarios before implementation begins, which surfaces issues much earlier in the lifecycle.
      </motion.p>
      <motion.p style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8, marginBottom: '1rem', maxWidth: 620 }} {...fade(3)}>
        More recently I've also taken on more of a coordination role. I run the bi-weekly sync for the wider HMRC account, helping align different teams across an engagement of around 200 people. Currently I'm most excited about a greenfield Spring Boot project we're building from scratch, where you're making the foundational architectural decisions that everything else will build on top of.
      </motion.p>

      <div style={divider} />
      <SectionTitle color="var(--purple)">Background</SectionTitle>

      <motion.p style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8, marginBottom: '1rem', maxWidth: 620 }} {...fade(1)}>
        My background is non-traditional. I studied Biochemistry at King's College London, then completed an MSc in Applied Biosciences and Biotechnology at Imperial College London. It was during my Master's that I discovered how much I enjoyed the programming side. I was writing Python for data analysis and realised I was far more excited about building the tools than using them.
      </motion.p>
      <motion.p style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: 620 }} {...fade(2)}>
        I think it's been more of an advantage than a gap. The way I approach problems is shaped by scientific thinking: being systematic, rigorous about what you actually know versus what you're assuming, and comfortable sitting with uncertainty before jumping to a conclusion.
      </motion.p>

      <div style={divider} />
      <motion.p style={lbl('var(--purple)')} {...fade(0)}>Details</motion.p>

      <motion.div className="details-grid" {...fade(1)}>
        {[
          { label: 'Originally from', value: 'Athens, Greece' },
          { label: 'Based in', value: 'London, UK' },
          { label: 'Current company', value: 'IBM' },
          { label: 'Client', value: 'HMRC, Customs Declaration Service' },
          { label: 'Languages', value: 'Greek (native), English (fluent), French (B2)' },
          { label: 'Education', value: 'MSc Imperial College London · BSc King\'s College London' },
          { label: 'Open to', value: 'Solutions Engineer, Forward Deployed Engineer, AI Engineer' },
          { label: 'Contact', value: 'kazantzi.elia@gmail.com' },
        ].map(item => (
          <div key={item.label}
            style={{ background: 'var(--bg)', padding: '1rem 1.25rem', transition: 'background 0.18s', cursor: 'default' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}>
            <p style={{ fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)', opacity: 0.65, marginBottom: 4, fontWeight: 700 }}>{item.label}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{item.value}</p>
          </div>
        ))}
      </motion.div>

      <div style={{ ...divider, marginBottom: '1.75rem' }} />
      <motion.p style={lbl('var(--blue)')} {...fade(0)}>Interests</motion.p>

      <motion.div className="interests-grid" {...fade(1)}>
        {INTERESTS.map(item => <InterestCard key={item.label} item={item} />)}
      </motion.div>
    </PageLayout>
  )
}
