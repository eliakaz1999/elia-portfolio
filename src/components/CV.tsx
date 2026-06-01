import { motion } from 'framer-motion'
import shared from './shared.module.css'
import styles from './CV.module.css'

const EXPERIENCE = [
  {
    role: 'Software Engineer',
    where: 'IBM · HMRC Customs Declaration Service',
    date: '2021 — present',
    desc: 'Working on the AES workstream within CDS, building and maintaining Java Spring Boot microservices. Delivered developer work including refactoring, unit tests, bug fixes, and sequence diagrams. IBM Early Professional Superstar Award, CIC Role Model Award, and Glue Award for Teamwork.',
    tags: ['Java', 'Spring Boot', 'BDD/TDD', 'Oracle SQL', 'IBM MQ', 'Jenkins', 'Ansible'],
  },
]

const EDUCATION = [
  {
    role: 'MSc Applied Biosciences',
    where: 'Imperial College London',
    date: '2019 — 2020',
    desc: 'Postgraduate research combining biology and data analysis, developing rigorous analytical and problem-solving skills transferable to software engineering.',
    tags: [],
  },
  {
    role: 'BSc Biochemistry',
    where: "King's College London",
    date: '2016 — 2019',
    desc: 'Foundation in scientific reasoning, systems thinking, and data interpretation.',
    tags: [],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
}

function CVItem({ role, where, date, desc, tags, index }: {
  role: string; where: string; date: string; desc: string; tags: string[]; index: number
}) {
  return (
    <motion.div
      className={styles.item}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className={styles.row}>
        <div>
          <span className={styles.role}>{role}</span>
          <span className={styles.where}> · {where}</span>
        </div>
        <span className={styles.date}>{date}</span>
      </div>
      <p className={styles.desc}>{desc}</p>
      {tags.length > 0 && (
        <div className={shared.tags}>
          {tags.map(t => <span key={t} className={shared.tag}>{t}</span>)}
        </div>
      )}
    </motion.div>
  )
}

export default function CV() {
  return (
    <section className={shared.section} id="cv">
      <motion.p
        className={shared.label}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.p>

      {EXPERIENCE.map((item, i) => (
        <CVItem key={item.role} {...item} index={i} />
      ))}

      <motion.p
        className={`${shared.label} ${styles.eduLabel}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Education
      </motion.p>

      {EDUCATION.map((item, i) => (
        <CVItem key={item.role} {...item} index={i} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ marginTop: '2rem' }}
      >
        <a href="/cv.pdf" className={styles.downloadBtn} download>
          Download full CV →
        </a>
      </motion.div>
    </section>
  )
}
