import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Send } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const FORMSPREE = 'https://formspree.io/f/YOUR_FORM_ID'

export default function ContactPage() {
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

  const inputStyle = {
    background: 'var(--surface)', border: '1px solid var(--border2)',
    padding: '11px 14px', fontFamily: 'Inter, sans-serif',
    fontSize: 14, fontWeight: 400, color: 'var(--text-strong)',
    outline: 'none', width: '100%', transition: 'border-color 0.18s, background 0.18s',
  }

  return (
    <PageLayout title="Contact">
      <p style={{ fontSize: 11, fontFamily: 'Courier New, monospace', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--purple)', opacity: 0.75, marginBottom: '2rem' }}>
        Contact
      </p>

      <div className="contact-page-grid" style={{ display: 'grid', gap: '2.5rem', alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.8rem', fontWeight: 400, color: 'var(--text-strong)', lineHeight: 1, marginBottom: '1rem' }}>
            Let's talk.
          </p>
          <p style={{ fontSize: 14, fontWeight: 400, color: 'var(--text)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
            Got a role, project, or idea worth discussing? Drop me a message and I'll get back to you.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elia-kazantzi/' },
              { label: 'Email', href: 'mailto:kazantzi.elia@gmail.com' },
              { label: 'GitHub', href: 'https://github.com' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: 'var(--muted)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {l.label} <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {status === 'sent' ? (
            <div style={{ padding: '1.5rem', border: '1px solid var(--blue-border)', background: 'var(--blue-dim)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-strong)' }}>Message sent. I'll get back to you soon.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontFamily: 'Courier New, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>{label}</label>
                  <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--blue-border)'; e.currentTarget.style.background = 'var(--blue-dim)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'var(--surface)' }} />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontFamily: 'Courier New, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>Message</label>
                <textarea placeholder="What's on your mind?" value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, minHeight: 110, resize: 'none' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--blue-border)'; e.currentTarget.style.background = 'var(--blue-dim)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'var(--surface)' }} />
              </div>
              {status === 'error' && <p style={{ fontSize: 12, color: '#f87171', fontWeight: 500 }}>Something went wrong. Email me directly at kazantzi.elia@gmail.com</p>}
              <button onClick={submit} disabled={status === 'sending'}
                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, padding: '11px 22px', border: '1px solid var(--border2)', background: 'transparent', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', color: 'var(--text-strong)', cursor: 'pointer', letterSpacing: '0.04em', transition: 'background 0.18s, border-color 0.18s, color 0.18s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--blue-dim)'; el.style.borderColor = 'var(--blue-border)'; el.style.color = 'var(--blue)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.borderColor = 'var(--border2)'; el.style.color = 'var(--text-strong)' }}>
                <Send size={13} />
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    <style>{`
        .contact-page-grid { grid-template-columns: 1fr; }
        @media (min-width: 620px) { .contact-page-grid { grid-template-columns: 1fr 1.4fr; gap: 4rem; } }
      `}</style>
    </PageLayout>
  )
}
