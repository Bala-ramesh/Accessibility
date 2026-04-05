import React from 'react'
import styles from './InnerPage.module.css'

const PHASES = [
  {
    number: '01',
    title: 'Automated scanning',
    description:
      'Run automated tools (axe, Lighthouse, WAVE) early and often. Automated checks can catch roughly 30–40% of WCAG issues, mostly low-contrast text, missing alt text, and missing form labels. They are a floor, not a ceiling.',
  },
  {
    number: '02',
    title: 'Keyboard-only testing',
    description:
      'Unplug your mouse. Navigate every interactive element with Tab, Shift+Tab, arrow keys, Enter, Space, and Escape. Verify: (1) every element is reachable, (2) focus indicator is always visible, (3) no keyboard traps, (4) logical tab order, (5) modal dialogs trap and return focus correctly.',
  },
  {
    number: '03',
    title: 'Screen reader testing',
    description:
      'Test with NVDA + Chrome on Windows and VoiceOver + Safari on macOS/iOS as a minimum. Listen to the full page with eyes closed. Check: (1) headings and landmarks create a usable page outline, (2) images have meaningful alt text, (3) form errors are announced, (4) dynamic content changes are announced via live regions.',
  },
  {
    number: '04',
    title: 'Colour & contrast audit',
    description:
      'Use a contrast checker (e.g. WebAIM Contrast Checker, Colour Contrast Analyser app) to verify every text/background combination meets 4.5:1 (normal text) or 3:1 (large text). Check all states: default, hover, focus, disabled, error.',
  },
  {
    number: '05',
    title: 'Zoom & reflow testing',
    description:
      'Set browser zoom to 200%, 300%, and 400%. Verify no content is clipped, no horizontal scrollbar appears (1.4.10 Reflow), and all functionality remains available. Test with text-only zoom in Firefox.',
  },
  {
    number: '06',
    title: 'Reduced motion & forced colours',
    description:
      'Enable "Reduce Motion" in your OS settings to verify animations are disabled or reduced. Test in Windows High Contrast mode to verify content is still readable when the browser overrides your colour palette.',
  },
  {
    number: '07',
    title: 'Document & report findings',
    description:
      'Record each issue with: (1) the WCAG criterion it violates, (2) the severity (critical/serious/moderate/minor), (3) how to reproduce it, (4) affected user groups, and (5) recommended fix. Use a standard audit report format that developers can act on.',
  },
]

const TOOLS_QUICK = [
  { name: 'axe DevTools', what: 'Browser extension: automated scan, zero false positives by default' },
  { name: 'Lighthouse', what: 'Built into Chrome DevTools, includes accessibility audit' },
  { name: 'WAVE', what: 'Visual overlay showing accessibility errors and structural info' },
  { name: 'NVDA', what: 'Free screen reader for Windows, test with Chrome or Firefox' },
  { name: 'VoiceOver', what: 'Built-in screen reader on macOS and iOS, test with Safari' },
  { name: 'Colour Contrast Analyser', what: 'Desktop app: eyedropper to check any colour on screen' },
]

export default function Testing() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <div className={styles.inner}>

        <header className={styles.pageHeader}>
          <span className="section-label">Auditing & QA</span>
          <h1 className={styles.pageTitle}>Testing & Auditing</h1>
          <p className={styles.pageIntro}>
            Automated tools catch around 30–40% of accessibility issues. The rest require manual
            testing, real assistive technology, and users with disabilities. This is the workflow
            that finds what scanners miss.
          </p>
        </header>

        <hr className="divider" />

        <section aria-labelledby="workflow-heading">
          <h2 id="workflow-heading" className={styles.sectionTitle}>
            Testing workflow
          </h2>
          <p className={styles.sectionIntro}>
            Run these phases in order for a thorough accessibility audit. Each phase catches
            different types of issues.
          </p>

          <ol className={styles.phaseList} aria-label="Testing workflow phases">
            {PHASES.map(({ number, title, description }) => (
              <li key={number} style={{ listStyle: 'none' }}>
                <article className={styles.phaseCard} aria-labelledby={`phase-${number}`}>
                  <div className={styles.phaseNumber} aria-hidden="true">{number}</div>
                  <div className={styles.phaseContent}>
                    <h3 id={`phase-${number}`} className={styles.phaseTitle}>{title}</h3>
                    <p className={styles.phaseDesc}>{description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <hr className="divider" />

        <section aria-labelledby="tools-quick-heading">
          <h2 id="tools-quick-heading" className={styles.sectionTitle}>
            Essential testing tools
          </h2>
          <p className={styles.sectionIntro}>
            These six tools cover the core testing workflow. See the <a href="/tools">Tools &amp; Resources</a> page for the full list.
          </p>

          <div className={styles.tableWrapper} role="region" aria-label="Essential testing tools table" tabIndex={0}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">What it does</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS_QUICK.map(({ name, what }) => (
                  <tr key={name}>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{name}</td>
                    <td>{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="divider" />

        <section aria-labelledby="severity-heading">
          <h2 id="severity-heading" className={styles.sectionTitle}>
            Issue severity levels
          </h2>
          <p className={styles.sectionIntro}>
            Use consistent severity ratings to help development teams prioritise fixes.
          </p>

          <div className={styles.tableWrapper} role="region" aria-label="Issue severity levels table" tabIndex={0}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Severity</th>
                  <th scope="col">Definition</th>
                  <th scope="col">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#d32f2f' }}>Critical</strong></td>
                  <td>Blocks task completion for users with disabilities</td>
                  <td>Keyboard trap in modal, no form submit without mouse</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e65100' }}>Serious</strong></td>
                  <td>Significant barrier; workaround exists but is difficult</td>
                  <td>Missing form label, focus not managed in SPA navigation</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#f57c00' }}>Moderate</strong></td>
                  <td>Some impact; workaround is reasonable</td>
                  <td>Low contrast decorative text, missing heading level</td>
                </tr>
                <tr>
                  <td><strong style={{ color: 'var(--text-secondary)' }}>Minor</strong></td>
                  <td>Negligible impact, cosmetic or best practice</td>
                  <td>Redundant alt text, unnecessary ARIA attribute</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  )
}
