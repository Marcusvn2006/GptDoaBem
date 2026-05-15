import { IoShareSocialOutline } from 'react-icons/io5'
import styles from './Footer.module.css'

const footerLinks = [
  [
    { label: 'Manifesto', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Contact Us', href: '#contato' },
  ],
  [
    { label: 'Impact Report', href: '#impacto' },
    { label: 'Terms of Service', href: '#' },
  ],
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>GPTDOABEM</span>
          <p className={styles.tagline}>
            "Impacto social não pode depender da sorte.<br />
            Precisa de estrutura."
          </p>
        </div>

        <nav className={styles.links}>
          {footerLinks.map((col, i) => (
            <div key={i} className={styles.col}>
              {col.map(({ label, href }) => (
                <a key={label} href={href} className={styles.link}>{label}</a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          © 2024 GPTDOABEM. Pioneering Social Impact through Technological Empathy.
        </p>
        <button className={styles.shareBtn} aria-label="Compartilhar">
          <IoShareSocialOutline size={20} />
        </button>
      </div>
    </footer>
  )
}
