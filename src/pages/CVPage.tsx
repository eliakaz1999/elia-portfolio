import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
})

const sectionLabel = (color = 'var(--blue)'): React.CSSProperties => ({
  fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.18em',
  textTransform: 'uppercase', color, opacity: 0.75, marginBottom: '1.5rem', fontWeight: 700,
})

const SectionTitle = ({ children, color = 'var(--blue)' }: { children: string; color?: string }) => (
  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400, color, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '1.75rem' }}>
    {children}
  </p>
)

function Tag({ t }: { t: string }) {
  return <span style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)', fontSize: 10, fontFamily: 'Courier New, monospace', padding: '3px 9px', fontWeight: 600, letterSpacing: '0.05em' }}>{t}</span>
}

function EntryRow({ role, where, date }: { role: string; where: string; date: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
      <div>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>{role}</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)' }}>&nbsp;&nbsp;{where}</span>
      </div>
      <span style={{ fontSize: 11, fontFamily: 'Courier New, monospace', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{date}</span>
    </div>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '0.875rem' }}>
      {items.map((b, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--blue)', opacity: 0.5, fontSize: 13, marginTop: 3, flexShrink: 0, fontWeight: 700 }}>+</span>
          <p style={{ fontSize: 14, fontWeight: 400, color: 'var(--text)', lineHeight: 1.75 }}>{b}</p>
        </li>
      ))}
    </ul>
  )
}

function Tags({ items }: { items: string[] }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{items.map(t => <Tag key={t} t={t} />)}</div>
}

export default function CVPage() {
  return (
    <PageLayout title="CV" rightSlot={
      <a href="/cv.pdf" download="Elia_Kazantzi_CV.pdf"
        style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, color: 'var(--muted)', border: '1px solid var(--border2)', padding: '7px 16px', transition: 'color 0.15s, border-color 0.15s, background 0.15s', textDecoration: 'none', fontFamily: 'Courier New, monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.color = 'var(--blue)'; el.style.borderColor = 'var(--blue-border)'; el.style.background = 'var(--blue-dim)' }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'var(--muted)'; el.style.borderColor = 'var(--border2)'; el.style.background = 'transparent' }}>
        <Download size={13} /> Download PDF
      </a>
    }>

      {/* Header */}
      <motion.div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--border)', marginBottom: '3rem' }} {...fade(0)}>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 400, color: 'var(--text-strong)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6 }}>
          Eleftheria-Paraskevi (Elia) Kazantzi
        </h1>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', marginBottom: 8, letterSpacing: '0.04em' }}>Software Engineer</p>
        <p style={{ fontSize: 12, fontFamily: 'Courier New, monospace', color: 'var(--muted)', letterSpacing: '0.03em', lineHeight: 1.7 }}>
          +44 7518849967&nbsp;&nbsp;·&nbsp;&nbsp;kazantzi.elia@gmail.com&nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="https://www.linkedin.com/in/elia-kazantzi/" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--muted)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            linkedin.com/in/elia-kazantzi
          </a>
        </p>
      </motion.div>

      {/* Education */}
      <motion.div style={{ marginBottom: '3rem' }} {...fade(1)}>
        <SectionTitle color="var(--blue)">Education</SectionTitle>
        <div style={{ borderTop: '1px solid var(--border)' }}>
          <div style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
            <EntryRow role="MSc in Applied Biosciences and Biotechnology" where="Imperial College London" date="2020 to 2021" />
            <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Grade: Merit</p>
          </div>
          <div style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
            <EntryRow role="BSc in Biochemistry" where="King's College London" date="2017 to 2020" />
            <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Grade: Upper Second Class Honours</p>
          </div>
        </div>
      </motion.div>

      {/* Professional Experience */}
      <motion.div style={{ marginBottom: '3rem' }} {...fade(2)}>
        <SectionTitle color="var(--purple)">Professional Experience</SectionTitle>
        <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1.5rem 0' }}>
          <EntryRow role="Software Engineer" where="IBM, London" date="2022 to Present" />
          <Bullets items={[
            "Designed and shipped Java microservices (Spring Boot) for HMRC's Customs Declaration Service (CDS) across 3 AWS Availability Zones on EC2, supporting millions of UK customs transactions daily.",
            "Embedded with HMRC stakeholders, QA, DevOps and business analysts to deliver features across inventory, exports and compliance workflows, translating ambiguous regulatory requirements into production systems within a highly constrained, risk-sensitive environment.",
            "Contributed to a 15% improvement in system performance through multithreading and computational optimisations while applying BDD (Cucumber/Gherkin) and TDD (JUnit, JMeter) practices daily.",
            "Identified, built, and drove adoption of an internal AI assistant using IBM Consulting Advantage (ICA) to automate requirements writing and QA test generation; navigated stakeholder concerns in a highly risk-averse government environment to integrate it into delivery workflows.",
          ]} />
          <Tags items={['Java', 'Spring Boot', 'Oracle SQL', 'IBM MQ', 'BDD/TDD', 'Jenkins', 'Ansible', 'AWS EC2']} />
        </div>
      </motion.div>

      {/* Projects & Activities */}
      <motion.div style={{ marginBottom: '3rem' }} {...fade(3)}>
        <SectionTitle color="var(--blue)">Projects and Activities</SectionTitle>
        <div style={{ borderTop: '1px solid var(--border)' }}>
          <div style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
            <EntryRow role="NHS Clinical Trial Finder" where="Personal Project" date="2026 to Present" />
            <Bullets items={[
              "Built a Claude-powered Python assistant matching patient profiles to UK clinical trials via the ISRCTN API, using tool-calling and structured outputs to return plain-English eligibility reasoning; designed prompt structure and output schemas with evaluation criteria and failure handling to ensure reliable responses across varied inputs.",
            ]} />
            <Tags items={['Python', 'Claude API', 'Tool-calling', 'ISRCTN API']} />
          </div>
          <div style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
            <EntryRow role="Code the Future Nepal" where="IBM Giveback / Volunteering" date="2024" />
            <Bullets items={[
              "Led daily coding workshops for 20 children in Nepal over 2 weeks, taking them from zero programming knowledge to building and publishing their own websites using HTML and CSS.",
            ]} />
          </div>
          <div style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
            <EntryRow role="IBeeMonitor" where="IBM Hackathon, Award-Winning" date="2022" />
            <Bullets items={[
              "Designed and delivered an end-to-end IoT/AI web application tracking pollinator diversity, integrating real-time sensor data with an AI identification layer and a React interface, winning the IBM internal hackathon for technical innovation and end-to-end delivery.",
            ]} />
            <Tags items={['IoT', 'React', 'AI', 'IBM Cloud']} />
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div style={{ marginBottom: '3rem' }} {...fade(4)}>
        <SectionTitle color="var(--purple)">Skills</SectionTitle>
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {[
            { label: 'Programming and Frameworks', value: 'Python, Java, TypeScript, JavaScript, React, HTML, CSS, Spring Boot' },
            { label: 'Backend and Tools', value: 'REST/SOAP APIs, IBM MQ, Oracle SQL, Atomikos, Jenkins, Ansible, Maven, Git' },
            { label: 'Testing and Methodologies', value: 'BDD (Cucumber/Gherkin), TDD (JUnit), Agile' },
            { label: 'Certifications', value: 'IBM Trustworthy AI and AI Ethics, IBM Consulting: Communicating Value, IBM Consulting: Delivering Business Value, IBM Cloud Advocate Essentials, AWS Cloud Practitioner (course completed)' },
          ].map(row => (
            <div key={row.label} className="skills-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 200px) 1fr', gap: '1.25rem', alignItems: 'start', padding: '0.9rem 0', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(100,206,251,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>{row.label}</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.65 }}>{row.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Additional Information */}
      <motion.div {...fade(5)}>
        <SectionTitle color="var(--blue)">Additional Information</SectionTitle>
        <div className="addl-grid" style={{ gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
          {[
            {
              label: 'Awards', accent: 'blue',
              value: 'IBM HMRC CDS Early Professional Superstar, IBM CIC Role Model Award, IBM Women Powering the Tech Industry (shortlisted), IBM Engineering Practice Glue Award: Teamwork and Collaboration',
            },
            {
              label: 'Languages', accent: 'purple',
              value: 'Greek (Native), English (Fluent), French (B2)',
            },
            {
              label: 'Interests', accent: 'blue',
              value: 'Long distance running (half marathon), photography, watercolour painting',
            },
            {
              label: 'Location', accent: 'purple',
              value: 'London, UK (originally from Athens, Greece)',
            },
          ].map(item => (
            <div key={item.label}
              style={{ background: 'var(--bg)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 5, transition: 'background 0.18s', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget.style.background = item.accent === 'blue' ? 'var(--blue-dim)' : 'var(--purple-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}>
              <p style={{ fontSize: 10, fontFamily: 'Courier New, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: item.accent === 'blue' ? 'var(--blue)' : 'var(--purple)', opacity: 0.75, fontWeight: 700 }}>{item.label}</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.65 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    <style>{`
        .addl-grid { display: grid; grid-template-columns: 1fr; }
        .skills-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        @media (min-width: 500px) {
          .addl-grid { grid-template-columns: 1fr 1fr; }
          .skills-row { grid-template-columns: minmax(120px, 200px) 1fr !important; gap: 1.25rem !important; }
        }
      `}</style>
    </PageLayout>
  )
}
