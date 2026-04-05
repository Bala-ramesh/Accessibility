import React from 'react'
import styles from './InnerPage.module.css'
import profileImage from '../assets/profile.jpg'

const SKILLS = [
  'WCAG 2.1 / 2.2',
  'ARIA',
  'Screen reader testing',
  'Accessibility auditing',
  'React',
  'Semantic HTML',
  'CSS',
  'axe DevTools',
  'NVDA',
  'VoiceOver',
  'JAWS',
  'Keyboard testing',
  'Colour contrast',
  'Inclusive design',
  'QA automation',
  'Front-end engineering',
]

export default function About() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <div className={styles.inner}>

        <header className={styles.pageHeader}>
          <span className="section-label">About</span>
          <h1 className={styles.pageTitle}>About me</h1>
        </header>

        <hr className="divider" />

        <div className={styles.aboutLayout}>
          {/* Sidebar */}
          <aside aria-label="Profile summary">
            <div className={styles.aboutAside}>
              <img
                src={profileImage}
                alt="Bala Mugunthan Ramesh"
                className={styles.avatarPlaceholder}
              />
                
              
              <p className={styles.aboutName}>Bala Mugunthan Ramesh</p>
              <p className={styles.aboutRole}>
                Frontend developer  &amp; Accessibility Consultant
              </p>
            </div>
          </aside>

          {/* Main content */}
          <div className={styles.aboutContent}>
            <section className={styles.aboutSection} aria-labelledby="about-background">
              <h2 id="about-background" className={styles.aboutSectionTitle}>Background</h2>
              <p className={styles.aboutPara}>
                I've spent the past 8+ years working at the intersection of front-end engineering,
                QA, and accessibility consultancy. That means I've shipped production code, broken
                it, tested it with real screen readers, and helped teams understand what "accessible"
                actually means in practice, not just on paper.
              </p>
              <p className={styles.aboutPara}>
                This site is built the same way I approach all accessibility work: starting with
                the people who use the web, understanding the technology they rely on, and then
                working backwards to the code and design decisions that make things work, or
                fail, for them.
              </p>
            </section>

            <section className={styles.aboutSection} aria-labelledby="about-why">
              <h2 id="about-why" className={styles.aboutSectionTitle}>Why this resource exists</h2>
              <p className={styles.aboutPara}>
                The accessibility space has a lot of rules and not enough practical guidance.
                WCAG is comprehensive but written for auditors, not developers. I built this
                hub to bridge that gap, translating the guidelines into patterns you can
                actually use, explain why they matter, and demonstrate them in working code.
              </p>
              <p className={styles.aboutPara}>
                Everything on this site is built to the same standards it documents. The source
                code is intentionally readable so you can inspect how any pattern is implemented.
              </p>
            </section>

            <section className={styles.aboutSection} aria-labelledby="about-skills">
              <h2 id="about-skills" className={styles.aboutSectionTitle}>Skills & tools</h2>
              <ul className={styles.tagList} role="list" aria-label="Skills and tools">
                {SKILLS.map(skill => (
                  <li key={skill} className={styles.tag}>{skill}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

      </div>
    </main>
  )
}
