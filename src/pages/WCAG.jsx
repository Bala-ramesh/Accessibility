import React from 'react'
import styles from './InnerPage.module.css'

const PRINCIPLES = [
  {
    letter: 'P',
    name: 'Perceivable',
    description:
      'Information must be presentable in ways users can perceive. If someone can\'t see it, hear it, or feel it  it doesn\'t exist for them. Text alternatives, captions, and sufficient contrast live here.',
  },
  {
    letter: 'O',
    name: 'Operable',
    description:
      'Users must be able to operate the interface. All functionality must be keyboard accessible. No time limits that can\'t be extended. No content that triggers seizures.',
  },
  {
    letter: 'U',
    name: 'Understandable',
    description:
      'Content and controls must be understandable. Predictable behaviour, clear error messages, consistent navigation. Readable language. Users shouldn\'t have to guess what something does.',
  },
  {
    letter: 'R',
    name: 'Robust',
    description:
      'Content must be robust enough to be interpreted by assistive technologies. Valid, well-structured HTML. ARIA used correctly. If the markup is broken, the accessibility is broken.',
  },
]

const LEVELS = [
  {
    level: 'A',
    title: 'Level A — The minimum',
    description:
      'Removes the most critical barriers. Without these, some users simply cannot access your content at all. Non-negotiable baseline.',
    highlight: false,
  },
  {
    level: 'AA',
    title: 'Level AA — The target',
    description:
      'The standard most regulations require. Removes significant barriers for most users with disabilities. This is what you should be building to.',
    highlight: true,
  },
  {
    level: 'AAA',
    title: 'Level AAA — Enhanced',
    description:
      'The highest standard. Not always possible for all content but worth reaching for in critical user journeys. Apply where you can.',
    highlight: false,
  },
]

const VERSIONS = [
  {
    tag: '2.1',
    label: 'Still widely referenced',
    title: 'WCAG 2.1',
    accent: false,
    description:
      'Released 2018. Added 17 new criteria covering mobile, low vision, and cognitive accessibility. Most legal frameworks still cite 2.1 AA. If you\'re auditing against a specific regulation, check which version it references.',
  },
  {
    tag: '2.2',
    label: 'Current standard',
    title: 'WCAG 2.2',
    accent: true,
    description:
      'Released 2023. Added 9 new criteria with a focus on cognitive and mobile accessibility. Notable additions: focus appearance, dragging movements, accessible authentication. Start here for new projects.',
  },
  {
    tag: '3.0',
    label: 'In progress',
    title: 'WCAG 3.0',
    accent: false,
    description:
      'WCAG 3.0 moves away from pass/fail criteria toward a scoring model. Still in draft and years from becoming a formal standard. Don\'t build to 3.0 yet but stay informed, as the direction of travel matters.',
  },
]

const MYTHS = [
  {
    myth: '"WCAG compliance means hitting 100% AAA"',
    correction:
      'AAA is the highest level but it\'s not the legal or industry target. AA is the standard. Some AAA criteria can\'t realistically be met for all content types  the spec acknowledges this. Aim for AA, reach for AAA where it makes sense.',
  },
  {
    myth: '"Automated tools catch everything"',
    correction:
      'Automated tools catch roughly 30–40% of accessibility issues. They\'re great for the mechanical stuff: missing alt text, colour contrast failures, duplicate IDs. But they can\'t test keyboard flow, screen reader announcements, logical reading order, or whether a form error message actually makes sense. Manual testing is non-negotiable.',
  },
  {
    myth: '"Accessibility is just for blind users"',
    correction:
      'Accessibility covers the full spectrum of disability visual, auditory, motor, cognitive, and situational. That includes people using a phone in sunlight, someone with a broken arm using only a keyboard, a user with ADHD who needs clear structure, and an older adult with reduced dexterity. Good accessibility helps everyone.',
  },
  {
    myth: '"We only need to meet AA once at launch"',
    correction:
      'Every new feature, content update, and design change is an opportunity to introduce new barriers. Accessibility is a continuous practice. It needs to be part of your definition of done, not a project that ends at launch.',
  },
  {
    myth: '"ARIA fixes inaccessible HTML"',
    correction:
      'The first rule of ARIA is: don\'t use ARIA if a native HTML element does the job. A button is more accessible than a div with role="button". ARIA supplements semantic HTML, it doesn\'t replace it. Misused ARIA actively makes things worse for screen reader users.',
  },
]

export default function WCAG() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <div className={styles.inner}>

        {/* Page header */}
        <header className={styles.pageHeader}>
          <span className="section-label">// wcag guidelines</span>
          <h1 className={styles.pageTitle}>WCAG decoded</h1>
          <p className={styles.pageIntro}>
            The Web Content Accessibility Guidelines are the international standard
            for accessible web content. Here's what they actually mean, without
            the spec language.
          </p>
        </header>

        <hr className="divider" />

        {/* Section 1 — What is WCAG */}
        <section aria-labelledby="what-heading">
          <h2 id="what-heading" className={styles.sectionTitle}>What is WCAG?</h2>
          <p className={styles.bodyText}>
            WCAG is a set of technical guidelines published by the W3C that define
            what "accessible" means for web content. They're organised around
            testable success criteria, specific things you can check, pass, or fail.
            Governments, legal frameworks, and procurement processes worldwide
            reference WCAG as the benchmark for accessibility compliance.
          </p>
          <p className={styles.bodyText}>
            But WCAG isn't the ceiling. It's the floor. Meeting the guidelines means
            you've removed the most significant barriers. It doesn't mean every user
            will have an equal experience.
          </p>
        </section>

        <hr className="divider" />

        {/* Section 2 — POUR principles */}
        <section aria-labelledby="pour-heading">
          <span className="section-label">Four principles</span>
          <h2 id="pour-heading" className={styles.sectionTitle}>The POUR principles</h2>
          <p className={styles.sectionIntro}>
            Every WCAG success criterion maps back to one of four principles. Understand
            these and the logic behind every individual rule becomes clear.
          </p>
          <ul className={styles.principleList} role="list">
            {PRINCIPLES.map(({ letter, name, description }) => (
              <li key={letter}>
                <article className={styles.principleCard} aria-labelledby={`principle-${letter}`}>
                  <div className={styles.principleHeader}>
                    <span className={styles.principleLetterMark} aria-hidden="true">{letter}</span>
                    <h3 id={`principle-${letter}`} className={styles.principleName}>{name}</h3>
                  </div>
                  <p className={styles.principleDesc}>{description}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        {/* Section 3 — Conformance levels */}
        <section aria-labelledby="levels-heading">
          <span className="section-label">Conformance</span>
          <h2 id="levels-heading" className={styles.sectionTitle}>Levels A, AA, and AAA</h2>
          <p className={styles.sectionIntro}>
            WCAG success criteria are grouped into three conformance levels. AA is the
            legal requirement in most jurisdictions and the standard to build to.
          </p>
          <ul className={styles.conformanceGrid} role="list">
            {LEVELS.map(({ level, title, description, highlight }) => (
              <li key={level}>
                <article
                  className={`${styles.conformanceCard} ${highlight ? styles.conformanceCardHighlight : ''}`}
                  aria-labelledby={`level-${level}`}
                >
                  {highlight && (
                    <span className={styles.conformanceTag} aria-label="Recommended target">
                      Target
                    </span>
                  )}
                  <div className={styles.conformanceBadge} aria-hidden="true">{level}</div>
                  <h3 id={`level-${level}`} className={styles.conformanceTitle}>{title}</h3>
                  <p className={styles.conformanceDesc}>{description}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        {/* Section 4 — Versions */}
        <section aria-labelledby="versions-heading">
          <span className="section-label">Versions</span>
          <h2 id="versions-heading" className={styles.sectionTitle}>2.1 vs 2.2 vs 3.0</h2>
          <p className={styles.sectionIntro}>
            WCAG has evolved across versions. Knowing the differences matters when auditing
            against a specific regulation or planning a new build.
          </p>
          <ul className={styles.versionList} role="list">
            {VERSIONS.map(({ tag, label, title, accent, description }) => (
              <li key={tag}>
                <article className={styles.versionCard} aria-labelledby={`version-${tag}`}>
                  <div className={styles.versionMeta}>
                    <span
                      className={`${styles.versionTag} ${accent ? styles.versionTagAccent : ''}`}
                    >
                      {tag}
                    </span>
                    <span className={styles.versionLabel}>{label}</span>
                  </div>
                  <div className={styles.versionBody}>
                    <h3 id={`version-${tag}`} className={styles.versionTitle}>{title}</h3>
                    <p className={styles.versionDesc}>{description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        {/* Section 5 — Non-technical explanation */}
        <section aria-labelledby="stakeholder-heading">
          <span className="section-label">For stakeholders</span>
          <h2 id="stakeholder-heading" className={styles.sectionTitle}>
            How to explain WCAG to non-technical stakeholders
          </h2>
          <blockquote className={styles.pullQuote} cite="#">
            <p className={styles.pullQuoteText}>
              "Think of WCAG like building regulations for a physical space. You
              wouldn't open a public building without a ramp, accessible toilets,
              and clear signage, not because the law requires it, but because it's
              the baseline for letting everyone in."
            </p>
            <p className={styles.pullQuoteText}>
              "WCAG does the same thing for the web. It defines the minimum standard
              that makes sure people with disabilities can actually use what you've
              built. AA is the ramp. AAA is the wide-aisle premium experience."
            </p>
            <p className={styles.pullQuoteText}>
              "And just like a building, accessibility isn't a one-time sign-off.
              New content, new features, new designs, all of it needs to meet
              the standard."
            </p>
          </blockquote>
        </section>

        <hr className="divider" />

        {/* Section 6 — Myths */}
        <section aria-labelledby="myths-heading">
          <span className="section-label">Common misconceptions</span>
          <h2 id="myths-heading" className={styles.sectionTitle}>Five myths, debunked</h2>
          <ul className={styles.mythList} role="list">
            {MYTHS.map(({ myth, correction }) => (
              <li key={myth}>
                <article className={styles.mythCard}>
                  <p className={styles.mythStatement}>
                    <span className={styles.mythSymbol} aria-hidden="true">✕</span>
                    {myth}
                  </p>
                  <p className={styles.mythCorrection}>{correction}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  )
}
