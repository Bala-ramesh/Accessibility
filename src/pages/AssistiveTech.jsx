import React from 'react'
import styles from './InnerPage.module.css'

const AT_TYPES = [
  {
    title: 'Screen readers',
    description:
      'Software that converts on-screen text, images, and controls into speech or Braille output. Screen readers navigate via a virtual cursor, reading content in DOM order. Popular tools: NVDA (Windows, free), JAWS (Windows, commercial), VoiceOver (macOS/iOS, built-in), TalkBack (Android, built-in).',
    tips: [
      'Semantic HTML is the foundation: headings, landmarks, and roles create the navigation menu',
      'Screen readers announce role, name, and state; all three must be correct',
      'Test with at least two different screen reader/browser combinations',
      'Listen to how your page sounds with eyes closed',
    ],
  },
  {
    title: 'Keyboard-only navigation',
    description:
      'Many users, including people with motor disabilities, power users, and screen reader users, navigate entirely without a mouse. They rely on Tab, Shift+Tab, arrow keys, Enter, Space, and Escape.',
    tips: [
      'Focus order must match visual reading order',
      'Every interactive element needs a visible focus indicator',
      'Modal dialogs must trap focus and return it on close',
      'Custom widgets need the correct keyboard interaction pattern (ARIA APG)',
    ],
  },
  {
    title: 'Switch access',
    description:
      'Users with limited motor control may use a single switch (button) to scan through options on screen, selecting items when the highlight reaches them. Switch access relies on clean focus management and sequential navigation.',
    tips: [
      'Minimise the number of interactive elements: every item adds scan time',
      'Group related controls to reduce navigation steps',
      'Avoid time limits or make them adjustable',
    ],
  },
  {
    title: 'Voice control',
    description:
      'Tools like Dragon NaturallySpeaking and Apple Voice Control allow users to navigate and interact by speaking commands. They typically use the visible label of an element to target it, so visible labels must match accessible names.',
    tips: [
      'Visible label must match (or be contained in) the accessible name',
      'Avoid icon-only buttons without visible text: they cannot be targeted by voice',
      'Test by speaking the visible text of each interactive element',
    ],
  },
  {
    title: 'Magnification & zoom',
    description:
      'Users with low vision may use browser zoom (up to 400%), OS-level magnification, or specialist tools. Content must remain usable at 400% zoom with no loss of content or functionality.',
    tips: [
      'Use relative units (rem, em, %) rather than fixed pixels for text sizes',
      'Avoid horizontal scroll at 400% zoom; use responsive layout techniques',
      'Ensure touch targets are large enough when zoomed (WCAG 2.5.5)',
    ],
  },
  {
    title: 'Colour & contrast tools',
    description:
      'Users with colour vision deficiencies (affecting 1 in 12 men) use tools that adjust or remove colour, or rely on other visual indicators. Some use high contrast modes (Windows, macOS) which override your custom colours.',
    tips: [
      'Never convey information through colour alone',
      'Test with a grayscale filter to check if information is still clear',
      'Test in Windows High Contrast mode for forced colour environments',
    ],
  },
]

export default function AssistiveTech() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <div className={styles.inner}>

        <header className={styles.pageHeader}>
          <span className="section-label">Screen readers & more</span>
          <h1 className={styles.pageTitle}>Assistive Technology</h1>
          <p className={styles.pageIntro}>
            Assistive technology (AT) is any hardware or software that helps people with
            disabilities use computers and the web. Understanding how different AT types work
            is essential for building genuinely accessible interfaces, not just ones that pass
            automated scans.
          </p>
        </header>

        <hr className="divider" />

        <section aria-labelledby="at-types-heading">
          <h2 id="at-types-heading" className={styles.sectionTitle}>
            Types of assistive technology
          </h2>
          <p className={styles.sectionIntro}>
            Each AT type has different navigation patterns and requirements. Test with real tools,
            not just automated checkers.
          </p>

          <ul className={styles.atGrid} role="list">
            {AT_TYPES.map(({ title, description, tips }) => (
              <li key={title}>
                <article className={styles.atCard} aria-labelledby={`at-${title.replace(/\s+/g, '-')}`}>
                  <h3 id={`at-${title.replace(/\s+/g, '-')}`} className={styles.atCardTitle}>
                    {title}
                  </h3>
                  <p className={styles.atCardDesc}>{description}</p>
                  <ul className={styles.tipList} role="list" aria-label={`Tips for ${title}`}>
                    {tips.map(tip => (
                      <li key={tip} className={styles.tipItem}>
                        <span aria-hidden="true" className={styles.bullet}>—</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        <section aria-labelledby="sr-combos-heading">
          <h2 id="sr-combos-heading" className={styles.sectionTitle}>
            Recommended screen reader + browser combinations
          </h2>
          <div className={styles.tableWrapper} role="region" aria-label="Screen reader and browser combinations" tabIndex={0}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Screen reader</th>
                  <th scope="col">Browser</th>
                  <th scope="col">Platform</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NVDA</td>
                  <td>Chrome or Firefox</td>
                  <td>Windows</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td>JAWS</td>
                  <td>Chrome or Edge</td>
                  <td>Windows</td>
                  <td>Commercial</td>
                </tr>
                <tr>
                  <td>VoiceOver</td>
                  <td>Safari</td>
                  <td>macOS</td>
                  <td>Built-in</td>
                </tr>
                <tr>
                  <td>VoiceOver</td>
                  <td>Safari</td>
                  <td>iOS</td>
                  <td>Built-in</td>
                </tr>
                <tr>
                  <td>TalkBack</td>
                  <td>Chrome</td>
                  <td>Android</td>
                  <td>Built-in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  )
}
