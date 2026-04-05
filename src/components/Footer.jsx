import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const FOOTER_LINKS = [
  { to: '/wcag', label: 'WCAG' },
  { to: '/assistive-tech', label: 'Assistive Tech' },
  { to: '/code-patterns', label: 'Code Patterns' },
  { to: '/testing', label: 'Testing' },
  { to: '/tools', label: 'Tools' },
  { to: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logoMark} aria-hidden="true">A11Y</span>
            <p className={styles.tagline}>
              Accessibility isn't a checklist. It's a practice.
            </p>
          </div>

          <nav className={styles.links} aria-label="Footer navigation">
            <ul className={styles.linkList} role="list">
              {FOOTER_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={styles.link}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            Built to practise what it preaches. WCAG 2.2 AA compliant.
          </p>
          <p className={styles.legal}>
            <a
              href="https://webaim.org/projects/million/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WebAIM Million report, opens in a new tab"
              className={styles.externalLink}
            >
              WebAIM Million, 2024
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
