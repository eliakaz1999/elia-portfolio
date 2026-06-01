import { motion } from 'framer-motion'
import styles from './Skills.module.css'

const SKILLS = [
  { category: 'Languages', items: ['Java', 'Python', 'TypeScript', 'SQL'] },
  { category: 'Backend', items: ['Spring Boot', 'REST APIs', 'IBM MQ', 'Oracle SQL', 'JAXB', 'WildFly'] },
  { category: 'Testing', items: ['JUnit', 'Mockito', 'Cucumber BDD', 'TDD', 'Gherkin'] },
  { category: 'Infrastructure', items: ['Jenkins', 'Ansible', 'Git', 'IBM Cloud'] },
  { category: 'AI', items: ['Claude API', 'Tool-calling', 'Agentic Python', 'MCP', 'Prompt Engineering'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
]

const AWARDS = [
  { title: 'Early Professional Superstar', org: 'IBM', desc: 'Recognised for exceptional performance and impact in early career at HMRC CDS.' },
  { title: 'CIC Role Model Award', org: 'IBM', desc: 'Awarded for outstanding professionalism and positive influence on the team.' },
  { title: 'Glue Award for Teamwork', org: 'IBM', desc: 'Recognised for holding the team together and going above and beyond the role.' },
  { title: 'Technical Innovation Award', org: 'IBM Hackathon', desc: 'Won for IBeeMonitor: IoT and AI-powered beehive monitoring system.' },
]

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: 'easeOut' } },
})

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.accentBar} />

      <motion.p className={styles.label} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        Skills
      </motion.p>

      <div className={styles.skillsList}>
        {SKILLS.map((group, i) => (
          <motion.div key={group.category} className={styles.skillRow}
            variants={fadeUp(i * 0.07)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }}>
            <p className={styles.category}>{group.category}</p>
            <div className={styles.pills}>
              {group.items.map(item => (
                <span key={item} className={styles.pill}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p className={`${styles.label} ${styles.awardsLabel}`}
        variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        Awards
      </motion.p>

      <div className={styles.awardsGrid}>
        {AWARDS.map((award, i) => (
          <motion.div key={award.title} className={styles.awardCard}
            variants={fadeUp(i * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }}>
            <div className={styles.awardGlow} />
            <span className={styles.awardOrg}>{award.org}</span>
            <span className={styles.awardTitle}>{award.title}</span>
            <p className={styles.awardDesc}>{award.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
