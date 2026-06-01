import { motion } from 'framer-motion'
import { ArrowUpRight, Linkedin, Mail, Github } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' },
})

const sec: React.CSSProperties = {
  maxWidth: 780, margin: '0 auto', padding: '5rem 1.5rem',
  borderTop: '1px solid rgba(255,255,255,0.07)', position: 'relative',
}
const accentLine = (color = '#64CEFB'): React.CSSProperties => ({
  position: 'absolute', top: 0, left: '1.5rem', width: 40, height: 2,
  background: `linear-gradient(90deg, ${color}, transparent)`,
})

// Big bold section heading
function SectionTitle({ children, color = 'var(--text-strong)' }: { children: string; color?: string }) {
  return (
    <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
      {children}
    </p>
  )
}

const Tag = ({ t }: { t: string }) => (
  <span style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)', fontSize: 10, fontFamily: 'Courier New, monospace', padding: '3px 9px', fontWeight: 600, letterSpacing: '0.05em' }}>{t}</span>
)

function SeeMore({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'Courier New, monospace', marginTop: '2rem', transition: 'color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#64CEFB')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
      {text} <ArrowUpRight size={11} />
    </button>
  )
}

const FORMSPREE = 'https://formspree.io/f/YOUR_FORM_ID'

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const submit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) setForm({ name: '', email: '', message: '' })
    } catch { setStatus('error') }
  }
  const inp: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border2)', padding: '10px 13px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--text-strong)', outline: 'none', width: '100%', transition: 'border-color 0.18s, background 0.18s', resize: 'none' as const }
  const fieldLbl: React.CSSProperties = { fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--muted)', fontWeight: 700, marginBottom: 5, display: 'block' }

  if (status === 'sent') return (
    <div style={{ padding: '1.25rem', border: '1px solid var(--blue-border)', background: 'var(--blue-dim)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>Message sent. I'll get back to you soon.</p>
    </div>
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {[['name','Name','text','Your name'],['email','Email','email','you@example.com']].map(([k,label,type,ph]) => (
        <div key={k}>
          <label style={fieldLbl}>{label}</label>
          <input type={type} placeholder={ph} value={form[k as keyof typeof form]}
            onChange={e => setForm(f => ({...f,[k]:e.target.value}))} style={inp}
            onFocus={e => { e.currentTarget.style.borderColor='var(--blue-border)'; e.currentTarget.style.background='var(--blue-dim)' }}
            onBlur={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--surface)' }} />
        </div>
      ))}
      <div>
        <label style={fieldLbl}>Message</label>
        <textarea placeholder="What's on your mind?" value={form.message}
          onChange={e => setForm(f => ({...f,message:e.target.value}))}
          style={{...inp, minHeight:90}}
          onFocus={e => { e.currentTarget.style.borderColor='var(--blue-border)'; e.currentTarget.style.background='var(--blue-dim)' }}
          onBlur={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--surface)' }} />
      </div>
      {status==='error' && <p style={{ fontSize:12, color:'#f87171', fontWeight:600 }}>Something went wrong. Email me directly.</p>}
      <button onClick={submit} disabled={status==='sending'}
        style={{ alignSelf:'flex-start', display:'inline-flex', alignItems:'center', gap:7, fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-strong)', background:'transparent', border:'1px solid var(--border2)', padding:'9px 18px', cursor:'pointer', fontFamily:'Courier New, monospace', transition:'all 0.18s' }}
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

      {/* ABOUT */}
      <section id="about" style={sec}>
        <div style={accentLine()} />
        <SectionTitle color="var(--blue)">About</SectionTitle>
        <motion.div className="about-grid" style={{ display: 'grid', gap: '2rem', alignItems: 'start' }} {...fade(1)}>
          <div>
            <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.6, marginBottom: '1rem' }}>
              I'm Eleftheria, a software engineer with just over four years of experience, based in London.
            </p>
            <p style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Originally from Athens, Greece, I moved to London to study Biochemistry at King's College London, then completed an MSc in Applied Biosciences and Biotechnology at Imperial College London. It was during my Master's that I discovered I enjoyed building things far more than lab work, so I moved into software engineering.
            </p>
            <p style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', lineHeight: 1.8 }}>
              Since 2022 I've been at IBM, working on HMRC's Customs Declaration Service, a large distributed system processing millions of transactions across the UK border.
            </p>
            <SeeMore text="Full story" onClick={() => nav('/about')} />
          </div>
          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 150 }}>
            {[
              { num: '4+', label: 'Years at IBM' },
              { num: '4', label: 'IBM Awards' },
              { num: 'KCL + Imperial', label: 'Education', small: true },
            ].map(({ num, label, small }) => (
              <div key={label}
                style={{ borderTop: '1px solid var(--border)', padding: '1.1rem 0', cursor: 'default', transition: 'background 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(100,206,251,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: small ? '1.3rem' : '2.1rem', fontWeight: 400, color: 'var(--text-strong)', lineHeight: 1 }}>{num}</p>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 5 }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={sec}>
        <div style={accentLine('#8a65ea')} />
        <SectionTitle color="var(--purple)">Projects</SectionTitle>
        <div className="projects-grid" style={{ gap: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {[
            { icon:'🧬', title:'NHS Clinical Trial Finder', year:'2026', desc:'Python agent using Claude\'s tool-calling capability to match patient profiles to UK clinical trials via the ISRCTN API. Returns plain-English eligibility reasoning, step by step.', tags:['Python','Claude API','Tool-calling','ISRCTN API'], accent:'blue' },
            { icon:'🤖', title:'IBM ICA AI Assistant', year:'2024', desc:'Prototype built with IBM\'s internal LLM tooling that generates structured requirements docs and test skeletons from a brief description. Adopted into the team\'s delivery workflow.', tags:['IBM ICA','LLM','Prompt Engineering'], accent:'purple' },
            { icon:'🐝', title:'IBeeMonitor', year:'2022', desc:'End-to-end IoT and AI web app tracking pollinator diversity with real-time sensor data, an AI identification layer, and a React interface. Won the IBM internal hackathon for technical innovation.', tags:['IoT','React','AI','IBM Cloud'], accent:'blue' },
            { icon:'🌐', title:'Code the Future Nepal', year:'2024', desc:'Led two-week coding workshops for 20 children in Nepal as part of IBM\'s giveback programme, taking them from zero to publishing their own websites.', tags:['HTML','CSS','Teaching'], accent:'purple' },
          ].map((p, i) => (
            <motion.div key={p.title} {...fade(i * 0.07)}
              style={{ background:'var(--bg)', padding:'1.5rem', cursor:'default', transition:'background 0.2s, transform 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = p.accent==='blue' ? 'var(--blue-dim)' : 'var(--purple-dim)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg)'; e.currentTarget.style.transform='translateY(0)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:20 }}>{p.icon}</span>
                <span style={{ fontSize:11, fontFamily:'Courier New, monospace', color:'var(--muted)', fontWeight:600 }}>{p.year}</span>
              </div>
              <p style={{ fontSize:14, fontWeight:700, color:'var(--text-strong)', marginBottom:6 }}>{p.title}</p>
              <p style={{ fontSize:13, fontWeight:400, color:'var(--text)', lineHeight:1.7, marginBottom:10 }}>{p.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>{p.tags.map(t => <Tag key={t} t={t} />)}</div>
            </motion.div>
          ))}
        </div>
        <SeeMore text="All projects" onClick={() => nav('/projects')} />
      </section>

      {/* SKILLS */}
      <section id="skills" style={sec}>
        <div style={accentLine()} />
        <SectionTitle color="var(--blue)">Skills</SectionTitle>
        <motion.div {...fade(1)}>
          {[
            { cat:'Languages', items:['Java','Python','TypeScript','JavaScript','SQL'] },
            { cat:'Frameworks', items:['Spring Boot','React','HTML','CSS'] },
            { cat:'Backend', items:['REST APIs','SOAP APIs','IBM MQ','Oracle SQL','Atomikos','Maven'] },
            { cat:'Testing', items:['BDD / Cucumber / Gherkin','TDD / JUnit','JMeter','Agile'] },
            { cat:'Infrastructure', items:['Jenkins','Ansible','Git','IBM Cloud','AWS EC2'] },
            { cat:'AI', items:['Claude API','Tool-calling','Structured Outputs','Prompt Engineering','IBM ICA'] },
          ].map((group, i) => (
            <div key={group.cat}
              style={{ display:'grid', gridTemplateColumns:'110px 1fr', gap:'1.25rem', alignItems:'center', padding:'0.9rem 0', borderTop: i===0 ? '1px solid var(--border)' : undefined, borderBottom:'1px solid var(--border)', transition:'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background='rgba(100,206,251,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background='transparent')}>
              <p style={{ fontSize:12, fontWeight:700, color:'var(--muted)' }}>{group.cat}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {group.items.map(item => (
                  <span key={item}
                    style={{ background:'var(--surface)', color:'var(--text)', fontSize:12, fontWeight:600, padding:'5px 13px', border:'1px solid var(--border2)', letterSpacing:'0.02em', cursor:'default', transition:'all 0.18s' }}
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

      {/* AWARDS */}
      <section id="awards" style={sec}>
        <div style={accentLine('#8a65ea')} />
        <SectionTitle color="var(--purple)">Awards</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)' }}>
          {[
            { title:'Early Professional Superstar', org:'IBM HMRC CDS', desc:'Recognised for exceptional performance and impact in early career on the Customs Declaration Service.', accent:'blue' },
            { title:'CIC Role Model Award', org:'IBM', desc:'Awarded for outstanding professionalism and positive influence on team culture.', accent:'purple' },
            { title:'Women Powering the Tech Industry', org:'IBM (shortlisted)', desc:'Shortlisted for the IBM award recognising women making a positive impact in technology.', accent:'blue' },
            { title:'Glue Award: Teamwork and Collaboration', org:'IBM Engineering Practice', desc:'Recognised for holding the team together and contributing above and beyond the role.', accent:'purple' },
          ].map((a, i) => (
            <motion.div key={a.title} {...fade(i * 0.07)}
              style={{ background:'var(--bg)', padding:'1.5rem', display:'flex', flexDirection:'column', gap:5, cursor:'default', transition:'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = a.accent==='blue' ? 'var(--blue-dim)' : 'var(--purple-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background='var(--bg)')}>
              <p style={{ fontSize:10, fontFamily:'Courier New, monospace', letterSpacing:'0.1em', textTransform:'uppercase', color: a.accent==='blue' ? 'var(--blue)' : 'var(--purple)', opacity:0.8, fontWeight:700 }}>{a.org}</p>
              <p style={{ fontSize:14, fontWeight:700, color:'var(--text-strong)', lineHeight:1.3 }}>{a.title}</p>
              <p style={{ fontSize:13, fontWeight:400, color:'var(--text)', lineHeight:1.65 }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="cv" style={sec}>
        <div style={accentLine()} />
        <SectionTitle color="var(--blue)">Experience</SectionTitle>
        <motion.div {...fade(1)} style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'1.5rem 0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap', gap:'0.5rem', marginBottom:'0.75rem' }}>
            <div>
              <span style={{ fontSize:16, fontWeight:700, color:'var(--text-strong)' }}>Software Engineer</span>
              <span style={{ fontSize:14, fontWeight:500, color:'var(--muted)' }}>&nbsp;&nbsp;IBM</span>
            </div>
            <span style={{ fontSize:11, fontFamily:'Courier New, monospace', color:'var(--muted)', fontWeight:600, letterSpacing:'0.05em' }}>2022 to present</span>
          </div>
          <ul style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:'1rem' }}>
            {[
              'Designing and shipping Java Spring Boot microservices for HMRC\'s Customs Declaration Service across 3 AWS Availability Zones, supporting millions of UK customs transactions daily.',
              'Working across inventory, exports, compliance, and declarations, owning features end to end from requirements through to production rollout.',
              'Contributed to 15% system performance improvement through multithreading optimisations, applying BDD (Cucumber/Gherkin) and TDD (JUnit) throughout.',
              'Built and drove adoption of an internal AI assistant using IBM Consulting Advantage, automating requirements writing and QA test generation for the team.',
            ].map((b, i) => (
              <li key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                <span style={{ color:'var(--blue)', opacity:0.5, fontSize:13, marginTop:3, flexShrink:0, fontWeight:700 }}>+</span>
                <p style={{ fontSize:14, fontWeight:400, color:'var(--text)', lineHeight:1.75 }}>{b}</p>
              </li>
            ))}
          </ul>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {['Java','Spring Boot','BDD/TDD','Oracle SQL','IBM MQ','Jenkins'].map(t => <Tag key={t} t={t} />)}
          </div>
        </motion.div>
        <motion.div style={{ display:'flex', gap:'0.875rem', marginTop:'1.75rem', flexWrap:'wrap' }} {...fade(2)}>
          <button onClick={() => nav('/cv')}
            style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:'var(--text-strong)', textTransform:'uppercase', background:'var(--surface)', border:'1px solid var(--border2)', padding:'10px 18px', cursor:'pointer', transition:'all 0.18s', fontFamily:'Courier New, monospace' }}
            onMouseEnter={e => { const el=e.currentTarget; el.style.color='var(--blue)'; el.style.borderColor='var(--blue-border)'; el.style.background='var(--blue-dim)' }}
            onMouseLeave={e => { const el=e.currentTarget; el.style.color='var(--text-strong)'; el.style.borderColor='var(--border2)'; el.style.background='var(--surface)' }}>
            Full CV <ArrowUpRight size={12} />
          </button>
          <a href="/cv.pdf" download="Elia_Kazantzi_CV.pdf"
            style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:'var(--muted)', textTransform:'uppercase', background:'transparent', border:'1px solid var(--border)', padding:'10px 18px', cursor:'pointer', transition:'all 0.18s', fontFamily:'Courier New, monospace', textDecoration:'none' }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.color='var(--text)'; el.style.borderColor='var(--border2)' }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.color='var(--muted)'; el.style.borderColor='var(--border)' }}>
            Download PDF
          </a>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ ...sec, paddingBottom:'5rem' }}>
        <div style={accentLine('#8a65ea')} />
        <SectionTitle color="var(--purple)">Contact</SectionTitle>
        <motion.div style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:'3.5rem', alignItems:'start' }} {...fade(1)}>
          <div>
            <p style={{ fontFamily:"'Instrument Serif', serif", fontSize:'2.2rem', fontWeight:400, color:'var(--text-strong)', lineHeight:1.05, marginBottom:'0.875rem' }}>
              Let's talk.
            </p>
            <p style={{ fontSize:14, fontWeight:400, color:'var(--text)', lineHeight:1.8, marginBottom:'1.5rem' }}>
              Got a role, project, or idea worth discussing? Drop me a message and I'll get back to you.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { icon:Linkedin, label:'LinkedIn', href:'https://www.linkedin.com/in/elia-kazantzi/' },
                { icon:Mail, label:'Email', href:'mailto:kazantzi.elia@gmail.com' },
                { icon:Github, label:'GitHub', href:'https://github.com/' },
              ].map(({ icon:Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, fontWeight:600, color:'var(--muted)', transition:'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color='#64CEFB')}
                  onMouseLeave={e => (e.currentTarget.style.color='var(--muted)')}>
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </motion.div>
      </section>


      <style>{`
        .about-grid { grid-template-columns: 1fr; }
        .projects-grid { display: grid; grid-template-columns: 1fr; }
        .awards-grid { display: grid; grid-template-columns: 1fr; }
        .contact-grid { grid-template-columns: 1fr; }
        @media (min-width: 600px) {
          .projects-grid { grid-template-columns: 1fr 1fr; }
          .awards-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 700px) {
          .about-grid { grid-template-columns: 1fr auto; }
          .contact-grid { grid-template-columns: 1fr 1.3fr; }
        }
      `}</style>
      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', maxWidth:780, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'0.5rem' }}>
        <span style={{ fontFamily:"'Instrument Serif', serif", fontSize:'1.4rem', fontWeight:400, background:'linear-gradient(90deg,#64CEFB,#8a65ea)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>EK</span>
        <span style={{ fontSize:11, fontFamily:'Courier New, monospace', color:'var(--muted)', letterSpacing:'0.05em', fontWeight:600 }}>
          Eleftheria-Paraskevi Kazantzi · London · {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  )
}
