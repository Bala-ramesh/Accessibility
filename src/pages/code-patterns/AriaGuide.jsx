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
  Callout,
  MistakeList,
} from './helpers.jsx'

const NAV_ITEMS = [
  { id: 'aria-roles',    label: 'Roles' },
  { id: 'aria-states',   label: 'States & properties' },
  { id: 'aria-live',     label: 'Live regions' },
  { id: 'aria-mistakes', label: 'Common mistakes' },
]

export default function AriaGuide() {
  const { activeSection, navRef } = useActiveSection(NAV_ITEMS.map((i) => i.id))

  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>

      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <BackLink />
          <span className="section-label">02 — ARIA</span>
          <h1 className={styles.pageTitle}>ARIA: when and how to use it</h1>
          <p className={styles.pageIntro}>
            ARIA (Accessible Rich Internet Applications) lets you add accessibility information
            that HTML alone can't express. But it comes with a strict rule: if a native HTML
            element does the job, use that instead.
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

        <Callout label="The first rule of ARIA">
          <p>
            "No ARIA is better than bad ARIA. Incorrect ARIA actively misleads screen reader
            users — it's worse than having no ARIA at all."
          </p>
        </Callout>

        {/* ── Roles ───────────────────────────────── */}
        <section id="aria-roles" aria-labelledby="aria-s1-heading" className={styles.section}>
          <h2 id="aria-s1-heading" className={styles.sectionTitle}>Roles</h2>
          <p className={styles.sectionIntro}>
            ARIA roles tell assistive technology what an element <em>is</em>. They override
            or supplement the element's native role. Only add a role when HTML semantics
            are insufficient.
          </p>

          <div className={styles.blockList}>
            <Block title="Adding a role to a non-semantic element" id="aria-b1">
              <p className={styles.blockDesc}>
                When you must use a non-semantic element as an interactive widget, add a role
                to communicate its purpose; then also handle keyboard interaction and state
                manually. Role alone is not enough.
              </p>
              <DoDont
                doCode={`/* A custom widget that HTML can't express natively */\n<div role="alert">\n  Your session will expire in 5 minutes.\n</div>`}
                dontCode={`/* Redundant — <button> already has role="button" */\n<button role="button">Close</button>\n\n/* Missing required keyboard support */\n<div role="button" onclick="doThing()">Click me</div>`}
              />
            </Block>

            <Block title="Adding keyboard support when using role='button'" id="aria-b2">
              <p className={styles.blockDesc}>
                If you use <code>role="button"</code> on a non-button element, you must also
                add <code>tabindex="0"</code> and handle both <code>Enter</code> and{' '}
                <code>Space</code> keydown events. Native <code>&lt;button&gt;</code> handles
                all of this automatically.
              </p>
              <DoDont
                doCode={`<div\n  role="button"\n  tabindex="0"\n  onclick="doThing()"\n  onkeydown="if(e.key==='Enter'||e.key===' ')doThing()"\n>\n  Custom button\n</div>`}
                dontCode={`/* Missing tabindex and keyboard support */\n<div role="button" onclick="doThing()">\n  Custom button\n</div>`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── States & properties ─────────────────── */}
        <section id="aria-states" aria-labelledby="aria-s2-heading" className={styles.section}>
          <h2 id="aria-s2-heading" className={styles.sectionTitle}>States & properties</h2>
          <p className={styles.sectionIntro}>
            ARIA states describe the current condition of an element. They must always reflect
            the visible UI: if the panel is open, <code>aria-expanded</code> must be{' '}
            <code>"true"</code>. Stale states mislead users.
          </p>

          <div className={styles.blockList}>
            <Block title="Common state attributes" id="aria-b3">
              <DefList
                label="Common ARIA state attributes"
                rows={[
                  ['aria-expanded', 'Is a collapsible panel, menu, or disclosure open?'],
                  ['aria-checked',  'Is a custom checkbox or toggle checked?'],
                  ['aria-selected', 'Is a tab, option, or listbox item selected?'],
                  ['aria-disabled', 'Is an element inactive (but still present in the tree)?'],
                  ['aria-pressed',  'Is a toggle button currently pressed/active?'],
                  ['aria-hidden',   'Should this element be hidden from the accessibility tree?'],
                  ['aria-invalid',  'Is a form field in an error state?'],
                  ['aria-required', 'Is a form field required? (prefer native required)'],
                ]}
              />
            </Block>

            <Block title="Keeping states in sync" id="aria-b4">
              <p className={styles.blockDesc}>
                Update ARIA states whenever the visible UI changes. A disclosure button must
                toggle between <code>aria-expanded="false"</code> and{' '}
                <code>aria-expanded="true"</code>.
              </p>
              <DoBlock
                code={`<button\n  type="button"\n  aria-expanded="false"\n  aria-controls="panel"\n  id="toggle-btn"\n>\n  Show details\n</button>\n<div id="panel" hidden>...</div>\n\n<script>\n  const btn = document.getElementById('toggle-btn');\n  const panel = document.getElementById('panel');\n\n  btn.addEventListener('click', () => {\n    const isOpen = btn.getAttribute('aria-expanded') === 'true';\n    btn.setAttribute('aria-expanded', String(!isOpen));\n    panel.hidden = isOpen;\n  });\n</script>`}
              />
            </Block>

            <Block title="aria-label and aria-labelledby" id="aria-b5">
              <p className={styles.blockDesc}>
                Use <code>aria-label</code> to provide an accessible name directly on an
                element. Use <code>aria-labelledby</code> to reference the text of another
                visible element as the name. Prefer <code>aria-labelledby</code> when a
                visible label already exists; it keeps visible and accessible names in sync.
              </p>
              <DoDont
                doCode={`/* Reference visible text */\n<h2 id="section-title">Recent orders</h2>\n<section aria-labelledby="section-title">...\n\n/* Provide name for icon-only button */\n<button aria-label="Close dialog">\n  <svg aria-hidden="true">...</svg>\n</button>`}
                dontCode={`/* aria-label on a <div> with no role — meaningless */\n<div aria-label="container">...</div>\n\n/* Mismatched visible and accessible name */\n<button aria-label="Submit">Cancel</button>`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Live regions ────────────────────────── */}
        <section id="aria-live" aria-labelledby="aria-s3-heading" className={styles.section}>
          <h2 id="aria-s3-heading" className={styles.sectionTitle}>Live regions</h2>
          <p className={styles.sectionIntro}>
            Live regions announce dynamic content changes to screen readers without moving
            focus. Use them for status updates, search results, error summaries, and other
            non-modal content changes.
          </p>

          <div className={styles.blockList}>
            <Block title="Live region values" id="aria-b6">
              <DefList
                label="Live region values and when to use them"
                rows={[
                  ['aria-live="polite"',    'Waits for user to finish current interaction before announcing. Use for most updates.'],
                  ['aria-live="assertive"', 'Interrupts immediately. Use only for critical errors or urgent messages.'],
                  ['role="status"',         'Equivalent to aria-live="polite". For status messages and confirmations.'],
                  ['role="alert"',          'Equivalent to aria-live="assertive". For validation errors and urgent notices.'],
                  ['aria-atomic="true"',    'Announce the entire region content when any part changes.'],
                ]}
              />
            </Block>

            <Block title="Setting up a live region" id="aria-b7">
              <p className={styles.blockDesc}>
                Render the live region element in the DOM on page load, before any content
                is injected into it. Adding content to a newly created live region is unreliable
                across screen readers.
              </p>
              <DoBlock
                code={`/* HTML — render on load, empty */\n<div role="status" aria-live="polite" aria-atomic="true">\n  <!-- content injected dynamically -->\n</div>\n\n/* JS — inject content to trigger announcement */\nconst statusRegion = document.querySelector('[role="status"]');\nstatusRegion.textContent = '12 results found';`}
              />
            </Block>

            <Block title="Don't overuse assertive" id="aria-b8">
              <p className={styles.blockDesc}>
                <code>aria-live="assertive"</code> interrupts whatever the user is doing.
                Reserve it for errors that block task completion. Use{' '}
                <code>aria-live="polite"</code> for everything else.
              </p>
              <DoDont
                doCode={`/* polite — form saved confirmation */\n<div role="status" aria-live="polite">\n  Changes saved.\n</div>\n\n/* assertive — critical error */\n<div role="alert">\n  Session expired. Please log in again.\n</div>`}
                dontCode={`/* assertive for non-urgent updates — disruptive */\n<div aria-live="assertive">\n  Search results updated.\n</div>`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Common mistakes ─────────────────────── */}
        <section id="aria-mistakes" aria-labelledby="aria-s4-heading" className={styles.section}>
          <h2 id="aria-s4-heading" className={styles.sectionTitle}>Common mistakes</h2>
          <p className={styles.sectionIntro}>
            Misused ARIA actively makes things worse for screen reader users. These are the
            most common errors found in production codebases.
          </p>

          <MistakeList
            items={[
              'Adding role="button" to a <button>: redundant and can cause issues in some screen readers',
              'Using aria-label on a <div> or <span> with no role: the label has nothing to attach to',
              'Setting aria-hidden="true" on a focusable element: keyboard users can still reach it; screen readers then skip its announcement',
              'Forgetting to update aria-expanded when a panel opens or closes: the state becomes a lie',
              'Using aria-required instead of the native required attribute: required is supported everywhere and provides native browser validation',
              'Applying aria-describedby to reference content that is hidden with display:none: hidden content is not in the accessibility tree',
              'Using role="presentation" on a table that contains data: removes the semantic meaning from every cell',
            ]}
          />
        </section>

        <NextLink to="/code-patterns/css" label="CSS for accessibility" />

        </div>
      </div>
    </main>
  )
}
