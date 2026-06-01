import { useEffect } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'

const SKILLS = [
  { cat: 'Languages', items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { cat: 'Frameworks', items: ['Spring Boot', 'React', 'HTML', 'CSS'] },
  { cat: 'Backend', items: ['REST APIs', 'SOAP APIs', 'IBM MQ', 'Oracle SQL', 'Atomikos', 'Maven'] },
  { cat: 'Testing', items: ['BDD / Cucumber / Gherkin', 'TDD / JUnit', 'JMeter', 'Agile'] },
  { cat: 'Infrastructure', items: ['Jenkins', 'Ansible', 'Git', 'IBM Cloud', 'AWS EC2'] },
  { cat: 'AI', items: ['Claude API', 'Tool-calling', 'Structured Outputs', 'Prompt Engineering', 'IBM ICA'] },
]

const CERTS = [
  'IBM Trustworthy AI and AI Ethics',
  'IBM Consulting: Communicating Value',
  'IBM Consulting: Delivering Business Value',
  'IBM Cloud Advocate Essentials',
  'AWS Cloud Practitioner (course completed)',
]

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20px' },
  transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' },
})

const SectionTitle = ({ children, color = 'var(--blue)' }: { children: string; color?: string }) => (
  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, color, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
    {children}
  </p>
)

export default function SkillsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <PageLayout title="Skills">
      <SectionTitle color="var(--blue)">Skills</SectionTitle>

      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '3.5rem' }}>
        {SKILLS.map((group, i) => (
          <motion.div key={group.cat} {...fade(i)}
            className="skills-table-row" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', alignItems: 'center', padding: '1rem 0', borderBottom: i < SKILLS.length - 1 ? '1px solid var(--border)' : undefined, transition: 'background 0.18s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(100,206,251,0.03)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>{group.cat}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {group.items.map(item => (
                <span key={item}
                  style={{ background: 'var(--surface)', color: 'var(--text)', fontSize: 12, fontWeight: 600, padding: '5px 13px', border: '1px solid var(--border2)', letterSpacing: '0.02em', cursor: 'default', transition: 'all 0.18s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--blue-border)'; el.style.color = 'var(--blue)'; el.style.background = 'var(--blue-dim)'; el.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border2)'; el.style.color = 'var(--text)'; el.style.background = 'var(--surface)'; el.style.transform = 'translateY(0)' }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <SectionTitle color="var(--purple)">Certifications</SectionTitle>
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: '1rem' }}>
        {CERTS.map((c, i) => (
          <motion.div key={c} {...fade(i)}
            style={{ padding: '0.875rem 0.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s', cursor: 'default' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-dim)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)', opacity: 0.5, flexShrink: 0 }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{c}</p>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  )
}
