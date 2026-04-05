import React from 'react'
import styles from './ModeToggle.module.css'

export default function ModeToggle({ colorMode, onToggle }) {
  const isDark = colorMode === 'dark'

  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <span aria-hidden="true" className={styles.icon}>
        {isDark ? '◐' : '◑'}
      </span>
      <span className={styles.label}>
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
