import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    icon: '🧬',
    title: 'NHS Clinical Trial Agent',
    desc: 'An AI agent built with the Claude API that matches patients to relevant clinical trials using tool-calling and the ISRCTN public API. Reasons over eligibility criteria, condition, and location to surface the right trials.',
    tags: ['Python', 'Claude API', 'Tool-calling', 'ISRCTN API'],
    link: 'https://github.com',
    accent: 'blue',
  },
  {
    icon: '🐝',
    title: 'IBeeMonitor',
    desc: 'IoT and AI-powered beehive monitoring system built at an IBM hackathon. Won the technical innovation award. Combines sensor data with AI analysis to track pollinator diversity and hive health in real time.',
    tags: ['IoT', 'AI', 'IBM Cloud', 'Python'],
    link: null,
    accent: 'purple',
  },
  {
    icon: '🤖',
    title: 'IBM ICA AI Assistant',
    desc: 'Prototype AI assistant built with IBM Consulting Advantage that automated BA requirements documents and QA test case skeletons for the HMRC CDS team, reducing manual toil and freeing up engineers for higher-value work.',
    tags: ['IBM ICA', 'LLM', 'Prompt Engineering', 'Internal Tooling'],
    link: null,
    accent: 'blue',
  },
  {
    icon: '⚙️',
    title: 'HMRC CDS Microservices',
    desc: 'Optimised Java Spring Boot microservices processing high volumes of customs transactions for HMRC\'s Customs Declaration Service, achieving 15% performance improvement through multithreading and targeted enhancements.',
    tags: ['Java', 'Spring Boot', 'Oracle SQL', 'IBM MQ'],
    link: null,
    accent: 'purple',
  },
]

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.accentBar} />
      <motion.p className={styles.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        Projects
      </motion.p>

      <div className={styles.grid}>
        {PROJECTS.map((p, i) => (
          <motion.div key={p.title} className={`${styles.card} ${styles[p.accent]}`}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: 'easeOut' }}>
            <div className={styles.cardTop}>
              <span className={styles.icon}>{p.icon}</span>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.extLink}>
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
            <h3 className={styles.title}>{p.title}</h3>
            <p className={styles.desc}>{p.desc}</p>
            <div className={styles.tags}>
              {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
