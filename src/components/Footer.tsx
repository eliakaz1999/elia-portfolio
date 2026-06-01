import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.ek}>EK</span>
      <span className={styles.right}>
        Eleftheria-Paraskevi Kazantzi
        <span className={styles.sep} />
        London {new Date().getFullYear()}
      </span>
    </footer>
  )
}
