import React from 'react'
import styles from './SubPage.module.css'
import {
  useActiveSection,
  AnchorNav,
  BackLink,
  NextLink,
  Block,
  CodeBlock,
  DoBlock,
  DoDont,
  DefList,
} from './helpers.jsx'

const NAV_ITEMS = [
  { id: 'focus-management',     label: 'Focus management' },
  { id: 'dynamic-content',      label: 'Dynamic content' },
  { id: 'keyboard-interactions', label: 'Keyboard interactions' },
  { id: 'focus-trap',           label: 'Focus trap' },
  { id: 'state-announcements',  label: 'State announcements' },
]

export default function JavascriptState() {
  const { activeSection, navRef } = useActiveSection(NAV_ITEMS.map((i) => i.id))

  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>

      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <BackLink />
          <span className="section-label">04 — JavaScript & state</span>
          <h1 className={styles.pageTitle}>JavaScript & state management</h1>
          <p className={styles.pageIntro}>
            JavaScript is where accessible experiences often break down. Dynamic content,
            state changes, and custom interactions all need deliberate accessibility handling.
          </p>
        </div>
      </div>

      <div className={styles.mobileNav}>
        <AnchorNav items={NAV_ITEMS} activeSection={activeSection} navRef={navRef} />
      </div>

      <div className={styles.pageLayout}>
        <aside className={styles.sidebar}>
          <nav aria-label="On this page">
            <p className={styles.sidebarLabel} aria-hidden="true">On this page</p>
            <ul className={styles.sidebarList} role="list">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`${styles.sidebarLink} ${activeSection === id ? styles.sidebarLinkActive : ''}`}
                    aria-current={activeSection === id ? 'true' : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className={styles.mainContent}>

        {/* ── Focus management ────────────────────── */}
        <section id="focus-management" aria-labelledby="js-s1-heading" className={styles.section}>
          <h2 id="js-s1-heading" className={styles.sectionTitle}>Focus management</h2>
          <p className={styles.sectionIntro}>
            When the UI changes significantly (a modal opens, a page section loads, an error
            appears), move focus deliberately. Without it, keyboard and screen reader users
            are stranded at the trigger element while the content they need is elsewhere.
          </p>

          <div className={styles.blockList}>
            <Block title="Move focus when a modal opens" id="js-b1">
              <p className={styles.blockDesc}>
                When a modal opens, move focus to the first focusable element inside it, or
                to the modal heading if there is one. When the modal closes, return focus to
                the element that triggered it.
              </p>
              <DoBlock
                code={`function openModal(triggerEl) {\n  const modal = document.getElementById('modal');\n  modal.removeAttribute('hidden');\n\n  // Focus the heading for context, or first interactive element\n  const heading = modal.querySelector('h2');\n  const firstFocusable = modal.querySelector(\n    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'\n  );\n  (heading || firstFocusable)?.focus();\n}\n\nfunction closeModal(triggerEl) {\n  const modal = document.getElementById('modal');\n  modal.setAttribute('hidden', '');\n  triggerEl?.focus(); // return to trigger\n}`}
              />
            </Block>

            <Block title="Focus management in single-page apps" id="js-b2">
              <p className={styles.blockDesc}>
                In SPAs, client-side route changes don't trigger the browser's default focus
                behaviour. Move focus to the new page's <code>h1</code> or the{' '}
                <code>&lt;main&gt;</code> element, and announce the navigation to screen
                readers via a live region.
              </p>
              <DoBlock
                code={`// After route change\nfunction onRouteChange(pageTitle) {\n  // Move focus to main content area\n  const main = document.getElementById('main-content');\n  main?.focus();\n\n  // Announce page change to screen readers\n  const announcer = document.getElementById('route-announcer');\n  announcer.textContent = '';\n  setTimeout(() => {\n    announcer.textContent = \`Navigated to \${pageTitle}\`;\n  }, 100);\n}\n\n// In your HTML — render on load\n// <div id="route-announcer"\n//      role="status"\n//      aria-live="polite"\n//      class="sr-only"></div>`}
              />
            </Block>

            <Block title="Focus on error — forms" id="js-b3">
              <p className={styles.blockDesc}>
                When a form submission fails validation, move focus to the error summary or the
                first invalid field. Don't leave focus at the submit button while errors are
                displayed above.
              </p>
              <DoBlock
                code={`function handleFormError(errors) {\n  // Option 1: move to error summary\n  const summary = document.getElementById('error-summary');\n  summary.textContent = \`\${errors.length} errors. Please correct and try again.\`;\n  summary.focus();\n\n  // Option 2: move to first invalid field\n  const firstInvalid = document.querySelector('[aria-invalid="true"]');\n  firstInvalid?.focus();\n}`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Dynamic content ─────────────────────── */}
        <section id="dynamic-content" aria-labelledby="js-s2-heading" className={styles.section}>
          <h2 id="js-s2-heading" className={styles.sectionTitle}>Dynamic content</h2>
          <p className={styles.sectionIntro}>
            Screen readers can only see the DOM. When you update content via JavaScript,
            assistive tech needs a way to know the update happened, especially when focus
            hasn't moved.
          </p>

          <div className={styles.blockList}>
            <Block title="Announce content updates via live regions" id="js-b4">
              <p className={styles.blockDesc}>
                Live regions are the right tool for non-focus-moving updates: search results,
                cart totals, filter counts, save confirmations, loading states.
              </p>
              <DoDont
                doCode={`// Rendered in HTML on load:\n// <div id="status" role="status" aria-live="polite"></div>\n\n// JS — update content to trigger announcement\nconst status = document.getElementById('status');\n\n// After filter applied:\nstatus.textContent = 'Showing 12 results';\n\n// After cart update:\nstatus.textContent = 'Item added. Cart total: 3 items';`}
                dontCode={`// Silent DOM update — screen readers never notified\nresultsContainer.innerHTML = buildResultsHTML(results);\n\n// Also silent — no live region\ndocument.title = '12 results found';`}
              />
            </Block>

            <Block title="Loading states" id="js-b5">
              <p className={styles.blockDesc}>
                Announce when content is loading and when it has loaded. Use{' '}
                <code>aria-busy="true"</code> on the region being updated, then remove it and
                announce completion.
              </p>
              <DoBlock
                code={`const region = document.getElementById('results');\nconst status = document.getElementById('status');\n\nasync function loadResults(query) {\n  // Signal loading start\n  region.setAttribute('aria-busy', 'true');\n  status.textContent = 'Loading results...';\n\n  const data = await fetchResults(query);\n\n  // Signal loading end\n  region.removeAttribute('aria-busy');\n  region.innerHTML = buildResultsHTML(data);\n  status.textContent = \`\${data.length} results for \"\${query}\"\`;\n}`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Keyboard interactions ───────────────── */}
        <section id="keyboard-interactions" aria-labelledby="js-s3-heading" className={styles.section}>
          <h2 id="js-s3-heading" className={styles.sectionTitle}>Keyboard interactions</h2>
          <p className={styles.sectionIntro}>
            Custom components must support the keyboard patterns users expect. Follow the{' '}
            <a
              href="https://www.w3.org/WAI/ARIA/apg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ARIA Authoring Practices Guide, opens in a new tab"
            >
              ARIA Authoring Practices Guide (APG)
            </a>{' '}
            for the established patterns for each widget type.
          </p>

          <div className={styles.blockList}>
            <Block title="Expected keyboard patterns by component" id="js-b6">
              <DefList
                label="Standard keyboard patterns by widget type"
                rows={[
                  ['Buttons',          'Enter and Space activate'],
                  ['Links',            'Enter activates'],
                  ['Modal dialogs',    'Escape closes; Tab / Shift+Tab cycles focus within'],
                  ['Dropdown menus',   'Enter / Space opens; Arrow keys navigate; Escape closes'],
                  ['Tab panels',       'Arrow keys switch tabs; Enter / Space select'],
                  ['Listboxes',        'Arrow keys move selection; Space / Enter confirm'],
                  ['Date pickers',     'Arrow keys navigate the grid; Enter selects'],
                  ['Sliders',          'Arrow keys adjust value; Home / End go to min/max'],
                  ['Tree views',       'Arrow keys expand/collapse and navigate nodes'],
                ]}
              />
            </Block>

            <Block title="Implementing keyboard handling" id="js-b7">
              <p className={styles.blockDesc}>
                Listen on <code>keydown</code> (not <code>keypress</code>, now deprecated) and
                match against <code>event.key</code>. Always call <code>event.preventDefault()</code>{' '}
                when handling a key to prevent the browser's default behaviour (e.g. Space
                scrolling the page).
              </p>
              <DoBlock
                code={`menuButton.addEventListener('keydown', (e) => {\n  switch (e.key) {\n    case 'Enter':\n    case ' ':\n      toggleMenu();\n      e.preventDefault();\n      break;\n    case 'Escape':\n      closeMenu();\n      menuButton.focus();\n      e.preventDefault();\n      break;\n    case 'ArrowDown':\n      openMenu();\n      focusFirstMenuItem();\n      e.preventDefault();\n      break;\n  }\n});`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Focus trap ──────────────────────────── */}
        <section id="focus-trap" aria-labelledby="js-s4-heading" className={styles.section}>
          <h2 id="js-s4-heading" className={styles.sectionTitle}>Focus trap for modals</h2>
          <p className={styles.sectionIntro}>
            When a modal dialog is open, Tab and Shift+Tab must cycle only within it. Focus
            must not escape to the page content behind the modal, which would be confusing
            and potentially expose hidden content to screen readers.
          </p>

          <div className={styles.blockList}>
            <Block title="Basic focus trap implementation" id="js-b8">
              <p className={styles.blockDesc}>
                Query for all focusable elements within the modal, then intercept Tab and
                Shift+Tab to wrap focus at the boundaries.
              </p>
              <CodeBlock
                code={`const focusableSelector = [\n  'a[href]',\n  'button:not([disabled])',\n  'input:not([disabled])',\n  'select:not([disabled])',\n  'textarea:not([disabled])',\n  '[tabindex]:not([tabindex="-1"])',\n].join(', ');\n\nfunction trapFocus(modal) {\n  const focusable = [...modal.querySelectorAll(focusableSelector)];\n  const first = focusable[0];\n  const last  = focusable[focusable.length - 1];\n\n  modal.addEventListener('keydown', (e) => {\n    if (e.key !== 'Tab') return;\n\n    if (e.shiftKey) {\n      // Shift+Tab from first — wrap to last\n      if (document.activeElement === first) {\n        last.focus();\n        e.preventDefault();\n      }\n    } else {\n      // Tab from last — wrap to first\n      if (document.activeElement === last) {\n        first.focus();\n        e.preventDefault();\n      }\n    }\n  });\n}`}
              />
            </Block>

            <Block title="Also handle Escape to close" id="js-b9">
              <p className={styles.blockDesc}>
                ARIA dialog pattern requires Escape to close the modal and return focus to the
                trigger. This is a WCAG 2.1.2 requirement (no keyboard trap): the user must
                always be able to leave a component.
              </p>
              <DoBlock
                code={`function initModal(modal, triggerEl) {\n  // Open\n  function open() {\n    modal.removeAttribute('hidden');\n    modal.setAttribute('aria-modal', 'true');\n    trapFocus(modal);\n    modal.querySelector('h2')?.focus();\n  }\n\n  // Close and return focus\n  function close() {\n    modal.setAttribute('hidden', '');\n    triggerEl.focus(); // return to trigger\n  }\n\n  // Escape key\n  modal.addEventListener('keydown', (e) => {\n    if (e.key === 'Escape') close();\n  });\n\n  triggerEl.addEventListener('click', open);\n  modal.querySelector('.close-btn')?.addEventListener('click', close);\n}`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── State announcements ─────────────────── */}
        <section id="state-announcements" aria-labelledby="js-s5-heading" className={styles.section}>
          <h2 id="js-s5-heading" className={styles.sectionTitle}>State announcements</h2>
          <p className={styles.sectionIntro}>
            When a UI state changes visually, assistive tech needs to know too. There are two
            approaches: update an ARIA state attribute, or update the content of a live region.
            Often you need both.
          </p>

          <div className={styles.blockList}>
            <Block title="Toggle patterns" id="js-b10">
              <p className={styles.blockDesc}>
                For toggle buttons, use <code>aria-pressed</code>. Update it in sync with the
                visual state. The button's accessible name should not change; let{' '}
                <code>aria-pressed</code> communicate the state.
              </p>
              <DoDont
                doCode={`/* aria-pressed communicates state — name stays constant */\n<button aria-pressed="false" id="mute-btn">\n  Mute\n</button>\n\nmuteBtn.addEventListener('click', () => {\n  const pressed = muteBtn.getAttribute('aria-pressed') === 'true';\n  muteBtn.setAttribute('aria-pressed', String(!pressed));\n});`}
                dontCode={`/* Changing the name is ambiguous — what does it mean NOW? */\n<button id="mute-btn">Mute</button>\n\nmuteBtn.addEventListener('click', () => {\n  const muted = muteBtn.textContent === 'Mute';\n  muteBtn.textContent = muted ? 'Unmute' : 'Mute'; // confusing\n});`}
              />
            </Block>

            <Block title="Announcing non-toggle state changes" id="js-b11">
              <p className={styles.blockDesc}>
                For state changes that don't map to a specific ARIA attribute (item added to
                cart, filter applied, search complete), use a live region.
              </p>
              <DoBlock
                code={`// Single polite announcer — reuse across the page\nconst announcer = document.getElementById('announcer');\n\nfunction announce(message) {\n  // Clear first to re-trigger if the same message repeats\n  announcer.textContent = '';\n  requestAnimationFrame(() => {\n    announcer.textContent = message;\n  });\n}\n\n// Usage\nannounce('Item added to cart. 3 items total.');\nannounce('Filter applied: showing 8 results.');\nannounce('File uploaded successfully.');`}
              />
            </Block>

            <Block title="aria-expanded for disclosures" id="js-b12">
              <p className={styles.blockDesc}>
                Disclosure widgets (accordions, expandable sections, navigation drawers) need
                <code>aria-expanded</code> kept in sync. Pair it with{' '}
                <code>aria-controls</code> pointing to the controlled panel.
              </p>
              <DoBlock
                code={`<button\n  type="button"\n  aria-expanded="false"\n  aria-controls="faq-answer-1"\n>\n  What is WCAG?\n</button>\n\n<div id="faq-answer-1" hidden>\n  WCAG is a set of technical guidelines...\n</div>\n\n<script>\n  const btn = document.querySelector('[aria-controls="faq-answer-1"]');\n  const panel = document.getElementById('faq-answer-1');\n\n  btn.addEventListener('click', () => {\n    const open = btn.getAttribute('aria-expanded') === 'true';\n    btn.setAttribute('aria-expanded', String(!open));\n    panel.hidden = open;\n  });\n</script>`}
              />
            </Block>
          </div>
        </section>

        <NextLink to="/code-patterns" label="Back to Code patterns overview" />

        </div>
      </div>
    </main>
  )
}
