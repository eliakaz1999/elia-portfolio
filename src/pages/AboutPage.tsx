import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'

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

export default function AboutPage() {
  return (
    <PageLayout title="About">
      <SectionTitle color="var(--blue)">About</SectionTitle>

      <motion.p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.55, marginBottom: '1.25rem', maxWidth: 580 }} {...fade(0)}>
        I'm Eleftheria, a software engineer with just over four years of experience at IBM, based in London.
      </motion.p>

      <motion.p style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8, marginBottom: '1rem', maxWidth: 620 }} {...fade(1)}>
        Originally from Athens, Greece, I moved to London to study, and have been here ever since. I've mainly been working on HMRC's Customs Declaration Service, a large distributed system processing millions of transactions across the UK border. I've worked across inventory, exports, compliance, and declarations, which has given me a strong understanding of how the platform fits together end to end rather than just one isolated component.
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
        I think it's been more of an advantage than a gap. The way I approach problems is shaped by scientific thinking: being systematic, rigorous about what you actually know versus what you're assuming, and comfortable sitting with uncertainty before jumping to a conclusion. For roles that involve working across different industries, having a background that lets you engage with the substance of what a client is doing is genuinely useful. If the problem is in healthcare, pharma, or life sciences, I'm not starting from zero.
      </motion.p>

      <div style={divider} />
      <motion.p style={lbl('var(--purple)')} {...fade(0)}>Details</motion.p>

      <motion.div className="details-grid" style={{ gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '3rem' }} {...fade(1)}>
        {[
          { label: 'Originally from', value: 'Athens, Greece' },
          { label: 'Based in', value: 'London, UK' },
          { label: 'Current company', value: 'IBM' },
          { label: 'Client', value: 'HMRC, Customs Declaration Service' },
          { label: 'Languages', value: 'Greek (native), English (fluent), French (B2)' },
          { label: 'Education', value: 'MSc Imperial College London, BSc King\'s College London' },
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

      {/* INTERESTS WITH PHOTOS */}
      <motion.p style={lbl('var(--purple)')} {...fade(0)}>Interests</motion.p>

      <motion.div className="interests-grid" style={{ gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }} {...fade(1)}>
        {[
          {
            photo: '/photo-photography.jpg',
            label: 'Photography',
            sub: 'Moon and night sky photography',
          },
          {
            photo: '/photo-watercolour.jpg',
            label: 'Watercolour painting',
            sub: 'Landscapes and nature studies',
          },
          {
            photo: '/photo-running.jpg',
            label: 'Long distance running',
            sub: 'Half marathon finisher',
          },
        ].map(item => (
          <div key={item.label}
            style={{ background: 'var(--bg)', overflow: 'hidden', cursor: 'default', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}>
            {/* Image equal height, no crop */}
            <div style={{ width: '100%', aspectRatio: '9/11', overflow: 'hidden', background: '#0c0e14' }}>
              <img
                src={item.photo}
                alt={item.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                  filter: 'saturate(0.88) brightness(0.92)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)')}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
              />
            </div>
            <div style={{ padding: '0.875rem 1rem' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)', fontFamily: 'Courier New, monospace', letterSpacing: '0.04em' }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </motion.div>
    <style>{`
        .details-grid { display: grid; grid-template-columns: 1fr; }
        .interests-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 500px) { .details-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 560px) { .interests-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>
    </PageLayout>
  )
}
