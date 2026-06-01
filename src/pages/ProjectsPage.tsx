import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const SectionTitle = ({ children, color = 'var(--blue)' }: { children: string; color?: string }) => (
  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, color, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
    {children}
  </p>
)

const Tag = ({ t, accent = 'blue' }: { t: string; accent?: string }) => (
  <span style={{
    background: accent === 'blue' ? 'var(--blue-dim)' : 'var(--purple-dim)',
    color: accent === 'blue' ? 'var(--blue)' : 'var(--purple)',
    border: `1px solid ${accent === 'blue' ? 'var(--blue-border)' : 'var(--purple-border)'}`,
    fontSize: 11, fontFamily: 'Courier New, monospace', padding: '3px 10px', fontWeight: 700, letterSpacing: '0.06em',
  }}>{t}</span>
)

interface Slide { heading: string; body: string }
interface Project {
  icon: string
  title: string
  year: string
  accent: 'blue' | 'purple'
  tagline: string
  tags: string[]
  slides: Slide[]
}

const PROJECTS: Project[] = [
  {
    icon: '🧬',
    title: 'NHS Clinical Trial Finder',
    year: '2026',
    accent: 'blue',
    tagline: 'A conversational AI agent that matches patients to UK clinical trials they might qualify for.',
    tags: ['Python', 'Claude API', 'Tool-calling', 'ISRCTN API', 'Structured Outputs'],
    slides: [
      {
        heading: 'The problem',
        body: 'This came from a real situation. Finding a clinical trial you might be eligible for is genuinely painful. You are reading through dense eligibility criteria on the ISRCTN database and trying to manually work out if your situation fits. It is slow, confusing, and most patients do not have the clinical literacy to navigate it confidently.',
      },
      {
        heading: 'What I built',
        body: 'A conversational agent in Python that takes a patient profile (their condition, age, relevant history) and searches the ISRCTN public API for relevant trials. The interesting part is what comes after the search. Claude\'s tool-calling capability reasons over the eligibility criteria and returns plain-English explanations of whether and why someone might or might not qualify.',
      },
      {
        heading: 'Why tool-calling',
        body: 'Rather than stuffing all the trial data into a single prompt, I gave the model discrete tools it could call: one to search trials by condition, one to fetch the full criteria for a specific trial, one to evaluate a patient profile against those criteria. That way the reasoning is transparent and step by step, which really matters in a clinical context. You want to see the logic, not just get an output.',
      },
      {
        heading: 'What was hard',
        body: 'The eligibility criteria themselves. Lots of negations, conditional logic, and medical terminology. Getting the model to reason over that reliably without over or under-qualifying took a lot of iteration. The other challenge was failure modes: calibrating the output so it is useful but not overconfident in a clinical context.',
      },
    ],
  },
  {
    icon: '🤖',
    title: 'IBM ICA AI Assistant',
    year: '2024',
    accent: 'purple',
    tagline: 'An internal AI prototype that automated requirements writing and QA test generation for the HMRC CDS team.',
    tags: ['IBM ICA', 'LLM', 'Prompt Engineering', 'Internal Tooling'],
    slides: [
      {
        heading: 'The problem',
        body: 'Our BAs were spending a lot of time writing requirements documents from scratch, and QA were manually translating those into test case skeletons. Both tasks were slow, repetitive, and felt like exactly the kind of thing AI should be able to help with.',
      },
      {
        heading: 'What I built',
        body: 'I started experimenting with IBM\'s internal LLM tooling (IBM Consulting Advantage) in my own time. I built a prototype that takes a brief description and generates structured requirements documents and Gherkin test skeletons. I then refined the prompt structure with the BA and QA lead based on their feedback about what good output actually looks like.',
      },
      {
        heading: 'How adoption happened',
        body: 'I was deliberate about positioning it as a tool to reduce toil, not replace people. I built it with them rather than presenting a finished solution, which meant they felt ownership over it. It cut down first-draft time significantly and freed them up for the work that actually needs human judgement: stakeholder conversations, edge case analysis, and sign-off decisions.',
      },
    ],
  },
  {
    icon: '🐝',
    title: 'IBeeMonitor',
    year: '2022',
    accent: 'blue',
    tagline: 'An award-winning IoT and AI system for pollinator monitoring, built in 24 hours at an IBM hackathon.',
    tags: ['React', 'Python', 'CNN', 'MQTT', 'IBM Cloud', 'IoT'],
    slides: [
      {
        heading: 'The challenge',
        body: 'An IBM internal hackathon: 24 hours to build something end-to-end. Our team of four worked on pollinator monitoring, a real biodiversity problem. We built a system combining IoT sensors with a camera module and a lightweight image classification model.',
      },
      {
        heading: 'The pivot that won it',
        body: 'About four hours in, we realised real-time AI species identification was not realistic in the time we had. So we reframed. Instead of trying to fully automate identification, we built a tool that makes expert identification faster and more scalable. The judges, including a biodiversity researcher, said that was actually a more realistic and deployable approach.',
      },
      {
        heading: 'What I personally built',
        body: 'The React interface and the sensor data pipeline, plus overall system architecture decisions. The result won for technical innovation and end-to-end delivery. The key lesson was that making good architectural decisions under pressure, and being willing to scope down deliberately, is more valuable than being ambitious and not finishing.',
      },
    ],
  },
  {
    icon: '🌐',
    title: 'Code the Future Nepal',
    year: '2024',
    accent: 'purple',
    tagline: 'Two weeks in Nepal leading coding workshops for 20 children who had never programmed before.',
    tags: ['HTML', 'CSS', 'Teaching', 'IBM Giveback'],
    slides: [
      {
        heading: 'The programme',
        body: 'Through IBM\'s giveback programme in 2024, I spent two weeks in Nepal leading daily coding workshops for 20 children with zero programming background. The goal was for every single one of them to build and publish their own website by the end.',
      },
      {
        heading: 'How I structured it',
        body: 'The challenge was the range: wildly different learning speeds, different confidence levels, different relationships with failure. I handled it by pairing stronger students with the ones who were struggling, and structuring every day around one small completable thing. Not "today we are learning CSS" but "by the end of today you will have a webpage with your name on it in a colour you chose."',
      },
      {
        heading: 'The last day',
        body: 'Genuinely one of the best days I have had professionally. Every child published something real. Several of them said it was the first time they had felt like they could build something, not just use something that someone else built. That sense of daily progress was what kept motivation up across two weeks.',
      },
    ],
  },
]

function ProjectSlider({ project }: { project: Project }) {
  const [slide, setSlide] = useState(0)
  const total = project.slides.length
  const acc = project.accent

  const borderCol = acc === 'blue' ? 'var(--blue-border)' : 'var(--purple-border)'
  const dimCol = acc === 'blue' ? 'var(--blue-dim)' : 'var(--purple-dim)'
  const accentCol = acc === 'blue' ? 'var(--blue)' : 'var(--purple)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{ border: `1px solid ${borderCol}`, background: 'var(--bg)', marginBottom: '2px', overflow: 'hidden' }}>

      {/* Project header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', padding: '1.75rem 1.75rem 1.25rem', borderBottom: `1px solid ${borderCol}`, background: dimCol }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{project.icon}</span>
          <div>
            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 4, lineHeight: 1.2 }}>{project.title}</p>
            <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--text)', lineHeight: 1.6, maxWidth: 480 }}>{project.tagline}</p>
          </div>
        </div>
        <span style={{ fontSize: 11, fontFamily: 'Courier New, monospace', color: accentCol, fontWeight: 700, letterSpacing: '0.08em', flexShrink: 0, opacity: 0.8, paddingTop: 2 }}>{project.year}</span>
      </div>

      {/* Slide content */}
      <div style={{ padding: '1.75rem', minHeight: 180, position: 'relative' }}>
        {/* Slide counter dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem' }}>
          {project.slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              style={{ width: i === slide ? 20 : 7, height: 7, borderRadius: 4, background: i === slide ? accentCol : 'var(--border2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s' }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={slide}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}>
            <p style={{ fontSize: 11, fontFamily: 'Courier New, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: accentCol, fontWeight: 700, opacity: 0.8, marginBottom: '0.6rem' }}>
              {project.slides[slide].heading}
            </p>
            <p style={{ fontSize: 'clamp(13px, 3.5vw, 14px)', fontWeight: 400, color: 'var(--text)', lineHeight: 1.85 }}>
              {project.slides[slide].body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav + tags footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.75rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map(t => <Tag key={t} t={t} accent={acc} />)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <button onClick={() => setSlide(s => Math.max(0, s - 1))} disabled={slide === 0}
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border2)', background: 'transparent', cursor: slide === 0 ? 'default' : 'pointer', opacity: slide === 0 ? 0.3 : 1, transition: 'all 0.15s', color: 'var(--text)' }}
            onMouseEnter={e => { if (slide > 0) (e.currentTarget.style.borderColor = borderCol) }}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border2)')}>
            <ChevronLeft size={15} />
          </button>
          <span style={{ fontSize: 11, fontFamily: 'Courier New, monospace', color: 'var(--muted)', fontWeight: 600, minWidth: 36, textAlign: 'center' }}>
            {slide + 1} / {total}
          </span>
          <button onClick={() => setSlide(s => Math.min(total - 1, s + 1))} disabled={slide === total - 1}
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border2)', background: 'transparent', cursor: slide === total - 1 ? 'default' : 'pointer', opacity: slide === total - 1 ? 0.3 : 1, transition: 'all 0.15s', color: 'var(--text)' }}
            onMouseEnter={e => { if (slide < total - 1) (e.currentTarget.style.borderColor = borderCol) }}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border2)')}>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  return (
    <PageLayout title="Projects">
      <SectionTitle color="var(--purple)">Projects</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {PROJECTS.map(p => <ProjectSlider key={p.title} project={p} />)}
      </div>
    </PageLayout>
  )
}
