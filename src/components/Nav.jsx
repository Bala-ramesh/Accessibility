import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ModeToggle from './ModeToggle.jsx'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { to: '/wcag', label: 'WCAG' },
  { to: '/assistive-tech', label: 'Assistive Tech' },
  { to: '/code-patterns', label: 'Code Patterns' },
  { to: '/testing', label: 'Testing' },
  { to: '/tools', label: 'Tools' },
  { to: '/about', label: 'About' },
]

export default function Nav({ colorMode, onToggleMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(prev => !prev)
  }

  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <NavLink to="/" end className={styles.logo} aria-label="Accessibility Knowledge Hub — home">
          <span className={styles.logoMark} aria-hidden="true">A11Y</span>
          <span className={styles.logoText}>Knowledge Hub</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ModeToggle colorMode={colorMode} onToggle={onToggleMode} />

          {/* Mobile menu button */}
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileNavList} role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}` : styles.mobileNavLink
                }
                onClick={handleNavClick}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
