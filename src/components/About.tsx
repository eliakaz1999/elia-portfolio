import { motion } from 'framer-motion'
import styles from './About.module.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } },
})

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.accentBar} />

      <motion.p className={styles.label} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        About
      </motion.p>

      <div className={styles.grid}>
        <motion.div variants={fadeUp(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          <p className={styles.lead}>
            I studied Biochemistry at King's College London and Applied Biosciences at Imperial before moving into software engineering.
          </p>
          <p className={styles.body}>
            That path shaped how I approach problems: rigorously, from first principles, with a bias toward understanding systems before changing them. At IBM I've shipped Java Spring Boot microservices, BDD and TDD test suites, and AI tooling on HMRC's Customs Declaration Service.
          </p>
          <p className={styles.body}>
            Outside work I build personal projects using the Claude API. I'm drawn to roles where deep technical execution meets real-world impact, ideally in applied AI.
          </p>
        </motion.div>

        <motion.div className={styles.stats} variants={fadeUp(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          {[
            { num: '4+', label: 'years at IBM' },
            { num: 'KCL + Imperial', label: 'academic background', small: true },
            { num: '3', label: 'IBM awards' },
          ].map(({ num, label, small }) => (
            <div key={label} className={styles.stat}>
              <span className={`${styles.statNum} ${small ? styles.small : ''}`}>{num}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
