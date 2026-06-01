import { motion } from 'framer-motion'
import shared from './shared.module.css'
import styles from './Blog.module.css'

const POSTS = [
  {
    title: "Building an NHS clinical trial agent with Claude's tool-calling API",
    date: 'coming soon',
    slug: null,
  },
  {
    title: 'From biochemistry to backend: how a science degree shapes how I code',
    date: 'coming soon',
    slug: null,
  },
  {
    title: 'What I learned building IBeeMonitor at an IBM hackathon',
    date: 'coming soon',
    slug: null,
  },
]

export default function Blog() {
  return (
    <section className={shared.section} id="blog">
      <motion.p
        className={shared.label}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Writing
      </motion.p>

      <div className={styles.list}>
        {POSTS.map((post, i) => (
          <motion.div
            key={post.title}
            className={styles.item}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
          >
            <span className={styles.title}>{post.title}</span>
            <span className={styles.meta}>{post.date}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        className={styles.footnote}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        posts dropping soon —
      </motion.p>
    </section>
  )
}
