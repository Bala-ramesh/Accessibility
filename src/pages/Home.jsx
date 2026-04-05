import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const SECTION_CARDS = [
  {
    to: '/wcag',
    label: 'Guidelines decoded',
    title: 'WCAG',
    description:
      'Understand WCAG 2.1 and 2.2, from the four principles (POUR) to the criteria that matter most in production.',
  },
  {
    to: '/assistive-tech',
    label: 'Screen readers & more',
    title: 'Assistive Tech',
    description:
      'How screen readers, switch access, voice control, and other assistive technologies interact with your code.',
  },
  {
    to: '/code-patterns',
    label: 'Three tracks',
    title: 'Code Patterns',
    description:
      'Practical patterns for developers, accessible design principles for designers, and a ready-to-use component library.',
  },
  {
    to: '/testing',
    label: 'Auditing & QA',
    title: 'Testing & Auditing',
    description:
      'Automated checks, manual testing workflows, and how to run an accessibility audit that finds what scanners miss.',
  },
]

const AUDIENCE_CARDS = [
  {
    icon: '{ }',
    title: 'Developers',
    items: [
      'Semantic HTML patterns',
      'ARIA roles & attributes',
      'Focus management',
      'Forms & error handling',
    ],
    to: '/code-patterns',
    cta: 'Dev patterns →',
  },
  {
    icon: '◈',
    title: 'Designers',
    items: [
      'Colour & contrast',
      'Typography & readability',
      'Interactive states',
      'Touch targets & mobile',
    ],
    to: '/code-patterns',
    cta: 'Design patterns →',
  },
  {
    icon: '✓',
    title: 'Testers & QA',
    items: [
      'Automated scan setup',
      'Keyboard testing flow',
      'Screen reader basics',
      'Audit documentation',
    ],
    to: '/testing',
    cta: 'Testing guide →',
  },
]

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>

      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroInner}>
          <span className="section-label" aria-hidden="true">
            // accessibility knowledge hub
          </span>
          <h1 id="hero-heading" className={styles.heroHeading}>
            The web works better when<br />
            <span className={styles.heroAccent}>everyone can use it.</span>
          </h1>
          <p className={styles.heroSub}>
            A practical resource for developers, designers, and testers,
            grounded in 5+ years of hands-on consultancy, front-end engineering,
            and QA.
          </p>
          <Link to="/wcag" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            Explore the guide →
          </Link>
        </div>
      </section>

      {/* Stat banner */}
      <section className={styles.statSection} aria-labelledby="stat-heading">
        <div className={styles.statInner}>
          <p className={styles.statLabel} id="stat-heading">
            <span className="section-label">By the numbers</span>
          </p>
          <blockquote className={styles.statBlock} cite="https://webaim.org/projects/million/">
            <p className={styles.statNumber}>96.3%</p>
            <p className={styles.statText}>
              of the top one million home pages had detectable WCAG failures in
              2024, averaging <strong>56 distinct errors per page</strong>.
            </p>
            <footer className={styles.statSource}>
              <cite>
                <a
                  href="https://webaim.org/projects/million/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WebAIM Million 2024 report, opens in a new tab"
                >
                  WebAIM Million, 2024
                </a>
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Section cards */}
      <section className={styles.sectionCards} aria-labelledby="explore-heading">
        <div className={styles.centredInner}>
          <h2 id="explore-heading" className={styles.sectionHeading}>
            Explore the guide
          </h2>
          <ul className={styles.cardGrid} role="list">
            {SECTION_CARDS.map(({ to, label, title, description }) => (
              <li key={to}>
                <Link to={to} className={styles.card} aria-label={`${title} — ${label}`}>
                  <span className="section-label">{label}</span>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDesc}>{description}</p>
                  <span className={styles.cardArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Audience cards */}
      <section className={styles.audienceSection} aria-labelledby="audience-heading">
        <div className={styles.centredInner}>
          <span className="section-label">Who it's for</span>
          <h2 id="audience-heading" className={styles.sectionHeading}>
            Find your track
          </h2>
          <ul className={styles.audienceGrid} role="list">
            {AUDIENCE_CARDS.map(({ icon, title, items, to, cta }) => (
              <li key={title}>
                <article className={styles.audienceCard} aria-labelledby={`audience-${title}`}>
                  <span className={styles.audienceIcon} aria-hidden="true">{icon}</span>
                  <h3 id={`audience-${title}`} className={styles.audienceTitle}>
                    {title}
                  </h3>
                  <ul className={styles.audienceList} role="list">
                    {items.map(item => (
                      <li key={item} className={styles.audienceItem}>
                        <span aria-hidden="true" className={styles.bulletMark}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to={to} className={`btn-secondary ${styles.audienceCta}`}>
                    {cta}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  )
}
