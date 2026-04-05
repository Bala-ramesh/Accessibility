import React from 'react'
import styles from './InnerPage.module.css'

const TOOL_CATEGORIES = [
  {
    id: 'browser-extensions',
    heading: 'Browser extensions',
    tools: [
      {
        name: 'axe DevTools',
        type: 'Automated scanner',
        description:
          'The industry-standard accessibility testing engine. Zero false positives by default. Available as a free browser extension and paid DevTools Pro.',
        url: 'https://www.deque.com/axe/devtools/',
        urlLabel: 'axe DevTools website',
      },
      {
        name: 'WAVE',
        type: 'Visual overlay',
        description:
          'Shows accessibility errors, warnings, and structural information as a visual overlay on your page. Excellent for quick audits and communicating issues to stakeholders.',
        url: 'https://wave.webaim.org/',
        urlLabel: 'WAVE website',
      },
      {
        name: 'Colour Contrast Analyser',
        type: 'Contrast checker',
        description:
          'Desktop app with an eyedropper to check contrast ratios of any two colours on screen. Works outside the browser, useful for checking designs and UI.',
        url: 'https://www.tpgi.com/color-contrast-checker/',
        urlLabel: 'Colour Contrast Analyser website',
      },
    ],
  },
  {
    id: 'built-in-tools',
    heading: 'Built-in browser tools',
    tools: [
      {
        name: 'Chrome Lighthouse',
        type: 'Automated audit',
        description:
          'Built into Chrome DevTools. Runs accessibility audit alongside performance and SEO checks. Based on axe-core. Open DevTools → Lighthouse tab.',
        url: 'https://developer.chrome.com/docs/lighthouse/',
        urlLabel: 'Lighthouse documentation',
      },
      {
        name: 'Firefox Accessibility Inspector',
        type: 'DOM inspector',
        description:
          'Inspect the accessibility tree, check properties, and run contrast checks. Particularly useful for inspecting ARIA live regions and role/name/state.',
        url: 'https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/',
        urlLabel: 'Firefox Accessibility Inspector documentation',
      },
    ],
  },
  {
    id: 'screen-readers',
    heading: 'Screen readers',
    tools: [
      {
        name: 'NVDA',
        type: 'Screen reader (Windows)',
        description:
          'NonVisual Desktop Access. Free, open source, widely used. Test with Chrome or Firefox. The most representative Windows screen reader for web content.',
        url: 'https://www.nvaccess.org/download/',
        urlLabel: 'NVDA download page',
      },
      {
        name: 'VoiceOver',
        type: 'Screen reader (macOS / iOS)',
        description:
          'Built into all Apple devices. On macOS: Cmd+F5 to toggle. On iOS: triple-click the side or home button. Test with Safari for the most accurate results.',
        url: 'https://support.apple.com/guide/voiceover/welcome/mac',
        urlLabel: 'VoiceOver user guide',
      },
      {
        name: 'JAWS',
        type: 'Screen reader (Windows)',
        description:
          'Job Access With Speech. Commercial product, widely used in enterprise and government. Free 40-minute demo mode available. Test with Chrome or Edge.',
        url: 'https://www.freedomscientific.com/products/software/jaws/',
        urlLabel: 'JAWS website',
      },
    ],
  },
  {
    id: 'reference',
    heading: 'Reference & specification',
    tools: [
      {
        name: 'WCAG 2.2',
        type: 'Specification',
        description:
          'The authoritative WCAG 2.2 specification from W3C. Understanding how criteria are structured and what "sufficient techniques" mean is essential for auditing.',
        url: 'https://www.w3.org/TR/WCAG22/',
        urlLabel: 'WCAG 2.2 specification',
      },
      {
        name: 'ARIA Authoring Practices Guide',
        type: 'Reference',
        description:
          'The W3C APG documents the correct keyboard interaction patterns and ARIA roles for every common widget type. The canonical reference for custom component development.',
        url: 'https://www.w3.org/WAI/ARIA/apg/',
        urlLabel: 'ARIA Authoring Practices Guide',
      },
      {
        name: 'WebAIM',
        type: 'Reference & training',
        description:
          'Accessibility articles, tutorials, WAVE tool, contrast checker, and the annual WebAIM Million report. One of the most widely referenced accessibility resources.',
        url: 'https://webaim.org/',
        urlLabel: 'WebAIM website',
      },
      {
        name: 'a11y.coffee',
        type: 'Quick reference',
        description:
          'Concise, practical accessibility reference. Useful for quick lookups and sharing with teams who are new to accessibility.',
        url: 'https://a11y.coffee/',
        urlLabel: 'a11y.coffee website',
      },
    ],
  },
]

export default function Tools() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <div className={styles.inner}>

        <header className={styles.pageHeader}>
          <span className="section-label">Tools & Resources</span>
          <h1 className={styles.pageTitle}>Tools & Resources</h1>
          <p className={styles.pageIntro}>
            The tools that belong in every accessibility workflow, from quick automated scans to
            full screen reader testing and the specification references that underpin everything.
          </p>
        </header>

        <hr className="divider" />

        {TOOL_CATEGORIES.map(({ id, heading, tools }) => (
          <React.Fragment key={id}>
            <section aria-labelledby={`${id}-heading`}>
              <h2 id={`${id}-heading`} className={styles.sectionTitle}>{heading}</h2>
              <ul className={styles.toolsGrid} role="list">
                {tools.map(({ name, type, description, url, urlLabel }) => (
                  <li key={name}>
                    <article className={styles.toolCard} aria-labelledby={`tool-${name.replace(/\s+/g, '-')}`}>
                      <div>
                        <span className={styles.toolType}>{type}</span>
                      </div>
                      <h3 id={`tool-${name.replace(/\s+/g, '-')}`} className={styles.toolName}>
                        {name}
                      </h3>
                      <p className={styles.toolDesc}>{description}</p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.toolLink}
                        aria-label={`${urlLabel}, opens in a new tab`}
                      >
                        Visit →
                      </a>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
            <hr className="divider" />
          </React.Fragment>
        ))}

      </div>
    </main>
  )
}
