import { motion } from 'framer-motion'
import { ArrowUpRight, Linkedin, Mail, Github } from 'lucide-react'
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

export default function Home() {
  const nav = useNavigate()
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── ABOUT ── */}
      <section id="about" className="home-section">
        <div style={accentLine()} />
        <SectionTitle color="var(--blue)">About</SectionTitle>
        <motion.div {...fade(1)}>
          {/* Mobile: concise. Desktop: two-col with stats */}
          <div className="about-layout">
            <div className="about-text">
              <p className="about-lead">
                I'm Elia, a software engineer with just over four years of experience, based in London.
              </p>
              <p className="about-body">
                Originally from Athens, Greece, I moved to London to study Biochemistry at King's College London, then completed an MSc in Applied Biosciences and Biotechnology at Imperial College London. It was during my Master's that I discovered I enjoyed building things far more than lab work, so I moved into software engineering.
              </p>
              <p className="about-body" style={{ marginTop: '0.75rem' }}>
                Since 2022 I've been at IBM, working on HMRC's Customs Declaration Service, a large distributed system processing millions of transactions across the UK border.
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

      {/* ── PROJECTS ── */}
      <section id="projects" className="home-section">
        <div style={accentLine('#8a65ea')} />
        <SectionTitle color="var(--purple)">Projects</SectionTitle>
        <div className="projects-grid">
          {[
            { icon:'🧬', title:'NHS Clinical Trial Finder', year:'2026', desc:'AI agent matching patients to UK clinical trials using Claude tool-calling and the ISRCTN API.', tags:['Python','Claude API','Tool-calling'], accent:'blue' },
            { icon:'🤖', title:'IBM ICA AI Assistant', year:'2024', desc:'LLM prototype automating requirements docs and QA test skeletons — adopted into the IBM team workflow.', tags:['IBM ICA','LLM','Prompt Engineering'], accent:'purple' },
            { icon:'🐝', title:'IBeeMonitor', year:'2022', desc:'Award-winning IoT and AI web app for pollinator monitoring, built end-to-end at an IBM hackathon.', tags:['React','IoT','AI'], accent:'blue' },
            { icon:'🌐', title:'Code the Future Nepal', year:'2024', desc:'Led two-week workshops for 20 children in Nepal. Every child published their own website by the end.', tags:['HTML','CSS','Teaching'], accent:'purple' },
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

      {/* ── SKILLS ── */}
      <section id="skills" className="home-section">
        <div style={accentLine()} />
        <SectionTitle color="var(--blue)">Skills</SectionTitle>
        <motion.div {...fade(1)}>
          {[
            { cat:'Languages', items:['Java','Python','TypeScript','SQL'] },
            { cat:'Frameworks', items:['Spring Boot','React','HTML','CSS'] },
            { cat:'Backend', items:['REST APIs','IBM MQ','Oracle SQL','Maven'] },
            { cat:'Testing', items:['BDD / Cucumber','TDD / JUnit','Agile'] },
            { cat:'Infrastructure', items:['Jenkins','Ansible','Git','AWS EC2'] },
            { cat:'AI', items:['Claude API','Tool-calling','Prompt Engineering','IBM ICA'] },
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
        <SeeMore text="Full skills and certifications" onClick={() => nav('/skills')} />
      </section>

      {/* ── AWARDS ── */}
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

      {/* ── EXPERIENCE ── */}
      <section id="cv" className="home-section">
        <div style={accentLine()} />
        <SectionTitle color="var(--blue)">Experience</SectionTitle>
        <motion.div {...fade(1)} className="exp-card">
          <div className="exp-header">
            <div>
              <span className="exp-role">Software Engineer</span>
              <span className="exp-company">&nbsp;&nbsp;IBM</span>
            </div>
            <span className="exp-date">2022 to present</span>
          </div>
          <ul className="exp-bullets">
            {[
              "Designing and shipping Java Spring Boot microservices for HMRC's Customs Declaration Service across 3 AWS Availability Zones, supporting millions of UK customs transactions daily.",
              "Owning features end to end from requirements through to production, applying BDD (Cucumber/Gherkin) and TDD (JUnit) throughout.",
              "Contributed to 15% system performance improvement through multithreading optimisations.",
              "Built and drove adoption of an internal AI assistant using IBM Consulting Advantage, automating requirements writing and QA test generation.",
            ].map((b, i) => (
              <li key={i} className="exp-bullet">
                <span className="exp-bullet-dot">+</span>
                <p>{b}</p>
              </li>
            ))}
          </ul>
          <div className="tag-row">
            {['Java','Spring Boot','BDD/TDD','Oracle SQL','IBM MQ'].map(t => <Tag key={t} t={t} />)}
          </div>
        </motion.div>
        <motion.div className="exp-actions" {...fade(2)}>
          <button onClick={() => nav('/cv')} className="exp-btn exp-btn--primary"
            onMouseEnter={e => { const el=e.currentTarget; el.style.color='var(--blue)'; el.style.borderColor='var(--blue-border)'; el.style.background='var(--blue-dim)' }}
            onMouseLeave={e => { const el=e.currentTarget; el.style.color='var(--text-strong)'; el.style.borderColor='var(--border2)'; el.style.background='var(--surface)' }}>
            Full CV <ArrowUpRight size={12} />
          </button>
          <a href="/cv.pdf" download="Elia_Kazantzi_CV.pdf" className="exp-btn exp-btn--secondary"
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.color='var(--text)'; el.style.borderColor='var(--border2)' }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.color='var(--muted)'; el.style.borderColor='var(--border)' }}>
            Download PDF
          </a>
        </motion.div>
      </section>

      {/* ── CONTACT ── */}
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
