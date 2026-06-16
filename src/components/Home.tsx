import { motion } from 'framer-motion'
import { ArrowUpRight, Linkedin, Mail, Github, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' },
})

const accentLine = (color = '#64CEFB'): React.CSSProperties => ({
  position: 'absolute', top: 0, left: 0, width: 36, height: 2,
  background: `linear-gradient(90deg, ${color}, transparent)`,
})

function SectionTitle({ children, color = 'var(--blue)' }: { children: string; color?: string }) {
  return (
    <p className="section-title" style={{ color }}>
      {children}
    </p>
  )
}

function SeeMore({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="see-more"
      onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--blue-dim)'; el.style.borderColor = 'var(--blue-border)'; el.style.color = 'var(--blue)' }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--surface)'; el.style.borderColor = 'var(--border2)'; el.style.color = 'var(--text-strong)' }}>
      {text} <ArrowUpRight size={11} />
    </button>
  )
}

const Tag = ({ t }: { t: string }) => (
  <span className="tag">{t}</span>
)

const FORMSPREE = 'https://formspree.io/f/YOUR_FORM_ID'

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const submit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) setForm({ name: '', email: '', message: '' })
    } catch { setStatus('error') }
  }

  if (status === 'sent') return (
    <div className="form-success">
      <div className="form-success-dot" />
      <p>Message sent. I'll get back to you soon.</p>
    </div>
  )
  return (
    <div className="contact-form">
      {[['name','Name','text','Your name'],['email','Email','email','you@example.com']].map(([k,label,type,ph]) => (
        <div key={k} className="form-field">
          <label className="form-label">{label}</label>
          <input type={type} placeholder={ph} value={form[k as keyof typeof form]}
            className="form-input"
            onChange={e => setForm(f => ({...f,[k]:e.target.value}))}
            onFocus={e => { e.currentTarget.style.borderColor='var(--blue-border)'; e.currentTarget.style.background='var(--blue-dim)' }}
            onBlur={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--surface)' }} />
        </div>
      ))}
      <div className="form-field">
        <label className="form-label">Message</label>
        <textarea placeholder="What's on your mind?" value={form.message}
          className="form-input form-textarea"
          onChange={e => setForm(f => ({...f,message:e.target.value}))}
          onFocus={e => { e.currentTarget.style.borderColor='var(--blue-border)'; e.currentTarget.style.background='var(--blue-dim)' }}
          onBlur={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--surface)' }} />
      </div>
      {status==='error' && <p className="form-error">Something went wrong. Email me directly.</p>}
      <button onClick={submit} disabled={status==='sending'} className="form-btn"
        onMouseEnter={e => { const el=e.currentTarget; el.style.color='var(--blue)'; el.style.borderColor='var(--blue-border)'; el.style.background='var(--blue-dim)' }}
        onMouseLeave={e => { const el=e.currentTarget; el.style.color='var(--text-strong)'; el.style.borderColor='var(--border2)'; el.style.background='transparent' }}>
        {status==='sending' ? 'Sending...' : 'Send message'}
      </button>
    </div>
  )
}

const CERTS = [
  { name: 'IBM Generative & Agentic AI Foundation', color: 'var(--blue)', year: '2026' },
  { name: 'Trustworthy AI and AI Ethics', color: 'var(--blue)', year: '2023' },
  { name: 'IBM Cloud Advocate Essentials', color: 'var(--blue)', year: '2023' },
  { name: 'IBM Consulting: Delivering Business Value', color: 'var(--purple)', year: '2022' },
  { name: 'Enterprise Design Thinking Practitioner', color: 'var(--purple)', year: '2022' },
  { name: 'IBM Agile Explorer', color: 'var(--purple)', year: '2022' },
  { name: 'IBM Consulting: Communicating Value', color: 'var(--purple)', year: '2022' },
]

const INTERESTS = [
  { photo: '/photo-photography.jpg', label: 'Photography', sub: 'Skies, landscapes, and quiet moments. I shoot with a camera whenever I travel and find myself reaching for it most on clear nights.', accent: 'blue' },
  { photo: '/photo-watercolour.jpg', label: 'Watercolour painting', sub: "I picked it up a few years ago and it stuck. I paint with friends whenever we get the chance and it's one of those things that forces you to actually switch off.", accent: 'purple' },
  { photo: '/photo-running.jpg', label: 'Long distance running', sub: 'Been running since I was a kid, started in track and field, worked up to a half marathon, and a full marathon is next on the list.', accent: 'blue' },
  { photo: '/photo-travel.jpg', label: 'Travelling', sub: "Any excuse to get on a plane. I've explored a lot of the world with friends and family and there's always somewhere new to add to the list.", accent: 'purple' },
  { photo: '/photo-tennis.jpg', label: 'Tennis', sub: "A big fan of the sport. I've been to Wimbledon a couple of times and it never gets old. I used to play as a kid, so I have a real appreciation for how hard the sport actually is.", accent: 'blue' },
  { photo: '/photo-concerts.jpg', label: 'Live music', sub: "There's nothing quite like seeing an artist live. I go to as many concerts as I can and love discovering new music that way.", accent: 'purple' },
]

function InterestCard({ item }: { item: typeof INTERESTS[0] }) {
  const [flipped, setFlipped] = useState(false)
  const accentColor = item.accent === 'blue' ? 'var(--blue)' : 'var(--purple)'
  const accentDim = item.accent === 'blue' ? 'var(--blue-dim)' : 'var(--purple-dim)'
  return (
    <div onClick={() => setFlipped(f => !f)} style={{ cursor: 'pointer', position: 'relative', aspectRatio: '9/11', perspective: '1000px' }}>
      <div style={{ position: 'absolute', inset: 0, transition: 'transform 0.55s cubic-bezier(0.4,0.2,0.2,1)', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', overflow: 'hidden', background: '#0c0e14' }}>
          <img src={item.photo} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.88) brightness(0.88)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem 1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{item.label}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: 'Courier New, monospace', letterSpacing: '0.06em', marginTop: 2 }}>tap to flip</p>
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: accentDim, border: `1px solid ${item.accent === 'blue' ? 'var(--blue-border)' : 'var(--purple-border)'}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem 1.25rem', gap: '0.75rem' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)', lineHeight: 1.2 }}>{item.label}</p>
          <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--text)', lineHeight: 1.7 }}>{item.sub}</p>
          <p style={{ fontSize: 10, color: accentColor, fontFamily: 'Courier New, monospace', letterSpacing: '0.06em', opacity: 0.7 }}>tap to flip back</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const nav = useNavigate()
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ABOUT */}
      <section id="about" className="home-section">
        <div style={accentLine()} />
        <SectionTitle color="var(--blue)">About</SectionTitle>
        <motion.div {...fade(1)}>
          <div className="about-layout">
            <div className="about-text">
              <p className="about-lead">
                I'm Elia, a software engineer with four years of experience, based in London.
              </p>
              <p className="about-body">
                My path started with Biochemistry at King's College London and an MSc in Applied Biosciences and Biotechnology at Imperial College London. During my Master's I discovered I enjoyed building things far more than lab work, so I moved into software engineering.
              </p>
              <p className="about-body" style={{ marginTop: '0.75rem' }}>
                Since 2022 I've been at IBM, building Java and Spring Boot microservices for HMRC's Customs Declaration Service, one of the UK government's most complex platforms, processing millions of customs transactions daily across three AWS availability zones.
              </p>
              <p className="about-body" style={{ marginTop: '0.75rem' }}>
                Alongside core engineering, I've become increasingly focused on AI: building agentic workflows, integrating LLM APIs, and finding practical ways to use AI to solve real problems. I thrive in unfamiliar environments, learn new domains quickly, and enjoy turning complex, messy problems into solutions that create real value.
              </p>
              <SeeMore text="Full story" onClick={() => nav('/about')} />
            </div>
            <div className="about-stats">
              {[
                { num: '4+', label: 'Years at IBM' },
                { num: '4', label: 'IBM Awards' },
                { num: 'KCL + ICL', label: 'Education', small: true },
              ].map(({ num, label, small }) => (
                <div key={label} className="stat-item">
                  <p className="stat-num" style={{ fontSize: small ? '1.2rem' : '1.9rem' }}>{num}</p>
                  <p className="stat-label">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="home-section">
        <div style={accentLine('#8a65ea')} />
        <SectionTitle color="var(--purple)">Projects</SectionTitle>
        <div className="projects-grid">
          {[
            { icon:'🧬', title:'ClinicalMatch Astra', year:'2026', desc:'AI agent that helps patients and clinicians discover relevant NHS clinical trials. Users describe a condition in natural language and receive matches with plain-English eligibility explanations.', tags:['Python','Claude API','Tool-calling','Flask'], accent:'blue' },
            { icon:'🤖', title:'IBM ICA AI Assistant', year:'2024', desc:'LLM tool built on IBM Consulting Advantage to automate requirements writing and QA test generation, successfully integrated into the delivery team workflow.', tags:['IBM ICA','LLM','Prompt Engineering'], accent:'purple' },
            { icon:'🐝', title:'IBeeMonitor', year:'2022', desc:"End-to-end IoT and AI web app for pollinator monitoring built across the full stack at an IBM hackathon. Won IBM's internal award for technical innovation and delivery.", tags:['React','IoT','Firebase','AI'], accent:'blue' },
            { icon:'🌐', title:'Code the Future Nepal', year:'2024', desc:'Ran daily coding workshops for 20 children in Nepal over two weeks. Every student started from zero and every student published their own website by the end.', tags:['HTML','CSS','Teaching'], accent:'purple' },
          ].map((p, i) => (
            <motion.div key={p.title} className={`project-card project-card--${p.accent}`} {...fade(i * 0.06)}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)' }}>
              <div className="project-card-top">
                <span className="project-icon">{p.icon}</span>
                <span className="project-year">{p.year}</span>
              </div>
              <p className="project-title">{p.title}</p>
              <p className="project-desc">{p.desc}</p>
              <div className="tag-row">{p.tags.map(t => <Tag key={t} t={t} />)}</div>
            </motion.div>
          ))}
        </div>
        <SeeMore text="All projects" onClick={() => nav('/projects')} />
      </section>

      {/* SKILLS */}
      <section id="skills" className="home-section">
        <div style={accentLine()} />
        <SectionTitle color="var(--blue)">Skills</SectionTitle>
        <motion.div {...fade(1)}>
          {[
            { cat:'Languages', items:['Java','Python','TypeScript','SQL'] },
            { cat:'Frameworks', items:['Spring Boot','React','Flask','HTML/CSS'] },
            { cat:'Backend', items:['REST APIs','IBM MQ','Oracle SQL','Maven'] },
            { cat:'Testing', items:['BDD / Cucumber','TDD / JUnit','Agile'] },
            { cat:'Infrastructure', items:['Jenkins','Ansible','Git','AWS EC2'] },
            { cat:'AI', items:['Claude API','Tool-calling','Agentic Workflows','Prompt Engineering','IBM ICA'] },
          ].map((group, i) => (
            <div key={group.cat} className="skills-row"
              onMouseEnter={e => (e.currentTarget.style.background='rgba(100,206,251,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background='transparent')}>
              <p className="skills-cat">{group.cat}</p>
              <div className="skills-pills">
                {group.items.map(item => (
                  <span key={item} className="skill-pill"
                    onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='var(--blue-border)'; el.style.color='var(--blue)'; el.style.background='var(--blue-dim)'; el.style.transform='translateY(-2px)' }}
                    onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='var(--border2)'; el.style.color='var(--text)'; el.style.background='var(--surface)'; el.style.transform='translateY(0)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div {...fade(2)} style={{ marginTop: '2rem' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Certifications</p>
          {CERTS.map((cert, i) => (
            <motion.div key={cert.name} {...fade(i * 0.04)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderTop: '1px solid var(--border)', transition: 'background 0.15s', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(100,206,251,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: cert.color, opacity: 0.6, flexShrink: 0 }} />
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{cert.name}</p>
              </div>
              <span style={{ fontSize: 11, fontFamily: 'Courier New, monospace', color: cert.color, fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 12, opacity: 0.7 }}>{cert.year}</span>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </motion.div>
      </section>

      {/* AWARDS */}
      <section id="awards" className="home-section">
        <div style={accentLine('#8a65ea')} />
        <SectionTitle color="var(--purple)">Awards</SectionTitle>
        <div className="awards-grid">
          {[
            { title:'Early Professional Superstar', org:'IBM HMRC CDS', desc:'Recognised for exceptional performance in early career on the Customs Declaration Service.', accent:'blue' },
            { title:'CIC Role Model Award', org:'IBM', desc:'Awarded for outstanding professionalism and positive influence on team culture.', accent:'purple' },
            { title:'Women Powering the Tech Industry', org:'IBM (shortlisted)', desc:'Shortlisted for the IBM award recognising women making a positive impact in technology.', accent:'blue' },
            { title:'Glue Award: Teamwork and Collaboration', org:'IBM Engineering Practice', desc:'Recognised for holding the team together and contributing above and beyond the role.', accent:'purple' },
          ].map((a, i) => (
            <motion.div key={a.title} className={`award-card award-card--${a.accent}`} {...fade(i * 0.07)}
              onMouseEnter={e => (e.currentTarget.style.background = a.accent==='blue' ? 'var(--blue-dim)' : 'var(--purple-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background='var(--bg)')}>
              <p className={`award-org award-org--${a.accent}`}>{a.org}</p>
              <p className="award-title">{a.title}</p>
              <p className="award-desc">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CV DOWNLOAD */}
      <section id="cv" className="home-section">
        <div style={accentLine()} />
        <motion.div {...fade(1)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 400, color: 'var(--text-strong)', lineHeight: 1.2 }}>
            Want the full picture?
          </p>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 440 }}>
            My CV has the full work history, education, and certifications in one place.
          </p>
          <a href="/cv.pdf" download="Elia_Kazantzi_CV.pdf"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)', background: 'var(--surface)', border: '1px solid var(--border2)', padding: '11px 20px', cursor: 'pointer', fontFamily: 'Courier New, monospace', transition: 'all 0.18s', textDecoration: 'none' }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.color='var(--blue)'; el.style.borderColor='var(--blue-border)'; el.style.background='var(--blue-dim)' }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.color='var(--text-strong)'; el.style.borderColor='var(--border2)'; el.style.background='var(--surface)' }}>
            <Download size={13} /> Download CV
          </a>
        </motion.div>
      </section>

      {/* INTERESTS */}
      <section id="interests" className="home-section">
        <div style={accentLine('#8a65ea')} />
        <SectionTitle color="var(--purple)">Outside work</SectionTitle>
        <div className="interests-grid">
          {INTERESTS.map((item, i) => (
            <motion.div key={item.label} {...fade(i * 0.06)}>
              <InterestCard item={item} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="home-section" style={{ paddingBottom: '5rem' }}>
        <div style={accentLine('#8a65ea')} />
        <SectionTitle color="var(--purple)">Contact</SectionTitle>
        <motion.div className="contact-layout" {...fade(1)}>
          <div className="contact-left">
            <p className="contact-heading">Let's talk.</p>
            <p className="contact-sub">Got a role, project, or idea worth discussing? Drop me a message.</p>
            <div className="contact-links">
              {[
                { icon:Linkedin, label:'LinkedIn', href:'https://www.linkedin.com/in/elia-kazantzi/' },
                { icon:Mail, label:'kazantzi.elia@gmail.com', href:'mailto:kazantzi.elia@gmail.com' },
                { icon:Github, label:'GitHub', href:'https://github.com/eliakaz1999' },
              ].map(({ icon:Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-link"
                  onMouseEnter={e => (e.currentTarget.style.color='#64CEFB')}
                  onMouseLeave={e => (e.currentTarget.style.color='var(--muted)')}>
                  <Icon size={13} /> {label}
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <span className="footer-ek">EK</span>
        <span className="footer-name">Elia Kazantzi · London · {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
