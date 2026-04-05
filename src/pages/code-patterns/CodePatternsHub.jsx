import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CodePatternsHub.module.css'

const CARDS = [
  {
    to: '/code-patterns/html',
    tag: '01',
    title: 'HTML & semantic structure',
    description:
      'The foundation of every accessible experience. Native elements, landmark regions, heading hierarchy, forms, links vs buttons.',
  },
  {
    to: '/code-patterns/aria',
    tag: '02',
    title: 'ARIA: when and how to use it',
    description:
      'ARIA fills the gaps HTML can\'t cover. Learn the rules, roles, states, live regions, and the mistakes that make things worse.',
  },
  {
    to: '/code-patterns/css',
    tag: '03',
    title: 'CSS for accessibility',
    description:
      'Focus indicators, colour contrast, reduced motion, visually hidden content, and spacing for touch targets.',
  },
  {
    to: '/code-patterns/javascript',
    tag: '04',
    title: 'JavaScript & state management',
    description:
      'Dynamic content, focus management, keyboard interactions, modal patterns, and keeping assistive tech in sync.',
  },
]

export default function CodePatternsHub() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <div className={styles.inner}>

        <header className={styles.pageHeader}>
          <span className="section-label">// code patterns</span>
          <h1 className={styles.pageTitle}>Code patterns</h1>
          <p className={styles.pageIntro}>
            Accessible code isn't a layer you add at the end; it's the result of good
            decisions made throughout. The HTML you choose, the CSS you write, and the
            JavaScript you use to manage state all shape whether your interface works for
            everyone. These four topics cover the patterns that matter most.
          </p>
        </header>

        <hr className="divider" />

        <section aria-labelledby="topics-heading">
          <h2 id="topics-heading" className={styles.topicsHeading}>Choose a topic</h2>
          <ul className={styles.cardGrid} role="list">
            {CARDS.map(({ to, tag, title, description }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={styles.card}
                  aria-label={`${title} — ${description}`}
                >
                  <span className={styles.cardTag} aria-hidden="true">{tag}</span>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDesc}>{description}</p>
                  <span className={styles.cardArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  )
}
