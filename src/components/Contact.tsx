import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Send } from 'lucide-react'
import styles from './Contact.module.css'

// Replace YOUR_FORM_ID with your Formspree form ID after signing up at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.accentBar} />
      <motion.p className={styles.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        Contact
      </motion.p>

      <motion.div className={styles.inner} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
        <div className={styles.left}>
          <p className={styles.heading}>Let's talk.</p>
          <p className={styles.sub}>Got a role, project, or idea worth discussing? Drop me a message.</p>
          <div className={styles.links}>
            <a href="https://www.linkedin.com/in/elia-kazantzi/" target="_blank" rel="noopener noreferrer" className={styles.link}>
              LinkedIn <ArrowUpRight size={11} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              GitHub <ArrowUpRight size={11} />
            </a>
            <a href="mailto:kazantzi.elia@gmail.com" className={styles.link}>
              Email <ArrowUpRight size={11} />
            </a>
          </div>
        </div>

        <div className={styles.right}>
          {status === 'sent' ? (
            <motion.div className={styles.success} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <div className={styles.successDot} />
              <p>Message sent. I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <div className={styles.form}>
              {[
                { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className={styles.field}>
                  <label className={styles.fieldLabel}>{label}</label>
                  <input className={styles.input} type={type} placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Message</label>
                <textarea className={styles.textarea} placeholder="What's on your mind?"
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              {status === 'error' && <p className={styles.errorMsg}>Something went wrong. Try emailing me directly.</p>}
              <button className={styles.submitBtn} onClick={handleSubmit} disabled={status === 'sending'}>
                <Send size={13} />
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
