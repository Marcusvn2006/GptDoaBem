import { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Problema', href: '#problema' },
  { label: 'Solução', href: '#solucao' },
  { label: 'Hub', href: '#hub' },
  { label: 'Aceleradora', href: '#aceleradora' },
  { label: 'Suporte', href: '#contato' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>GPTDOABEM</a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#contato" className={styles.loginBtn}>Login</a>
          <a href="#cadastro" className={styles.ctaBtn}>Get Started</a>
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
        </button>
      </div>
    </header>
  )
}
