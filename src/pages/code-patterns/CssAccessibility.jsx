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
  { id: 'focus-indicators', label: 'Focus indicators' },
  { id: 'colour-contrast',  label: 'Colour & contrast' },
  { id: 'reduced-motion',   label: 'Reduced motion' },
  { id: 'visually-hidden',  label: 'Visually hidden' },
  { id: 'touch-targets',    label: 'Touch targets' },
]

export default function CssAccessibility() {
  const { activeSection, navRef } = useActiveSection(NAV_ITEMS.map((i) => i.id))

  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>

      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <BackLink />
          <span className="section-label">03 — CSS</span>
          <h1 className={styles.pageTitle}>CSS for accessibility</h1>
          <p className={styles.pageIntro}>
            CSS isn't just visual. The properties you choose directly affect whether users can
            perceive, navigate, and interact with your interface.
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

        {/* ── Focus indicators ────────────────────── */}
        <section id="focus-indicators" aria-labelledby="css-s1-heading" className={styles.section}>
          <h2 id="css-s1-heading" className={styles.sectionTitle}>Focus indicators</h2>
          <p className={styles.sectionIntro}>
            Keyboard users depend on a visible focus indicator to know where they are on the
            page. Removing it without providing an alternative is a WCAG 2.4.7 failure.
          </p>

          <div className={styles.blockList}>
            <Block title="Never suppress focus without replacing it" id="css-b1">
              <p className={styles.blockDesc}>
                The most common accessibility mistake in CSS. Use <code>:focus-visible</code>{' '}
                to style keyboard focus only; it won't fire for mouse clicks, so you don't
                need to suppress anything.
              </p>
              <DoDont
                doCode={`/* Style keyboard focus with :focus-visible */\n:focus-visible {\n  outline: 3px solid #E8593C;\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n\n/* Safely remove for mouse — :focus-visible won't fire */\n:focus:not(:focus-visible) {\n  outline: none;\n}`}
                dontCode={`/* Removes focus for EVERYONE including keyboard users */\n* {\n  outline: none;\n}\n\n:focus {\n  outline: 0;\n}`}
              />
            </Block>

            <Block title="WCAG 2.2 focus appearance requirements" id="css-b2">
              <p className={styles.blockDesc}>
                WCAG 2.2 Success Criterion 2.4.11 (Level AA) specifies minimum focus indicator
                requirements: the focus indicator area must be at least as large as a 2px
                perimeter of the component, and must have a contrast ratio of at least 3:1
                against adjacent colours.
              </p>
              <DoBlock
                code={`/* Meets 2.4.11 — 3px outline, sufficient contrast */\n:focus-visible {\n  outline: 3px solid #E8593C;  /* 3:1 contrast with white */\n  outline-offset: 2px;          /* separates from element edge */\n}\n\n/* For dark backgrounds, ensure 3:1 against the bg */\n.dark-surface:focus-visible {\n  outline-color: #ffffff;\n}`}
              />
            </Block>

            <Block title="Custom focus styles for branded components" id="css-b3">
              <p className={styles.blockDesc}>
                For components with custom designs, replace the default outline with something
                that fits the brand but still meets the 3:1 contrast requirement and is
                clearly visible.
              </p>
              <DoBlock
                code={`/* Custom focus ring for a card component */\n.card:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #E8593C;\n}\n\n/* Focus style for a button on dark background */\n.btn-dark:focus-visible {\n  outline: 3px solid #ffffff;\n  outline-offset: 2px;\n}`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Colour & contrast ───────────────────── */}
        <section id="colour-contrast" aria-labelledby="css-s2-heading" className={styles.section}>
          <h2 id="css-s2-heading" className={styles.sectionTitle}>Colour & contrast</h2>
          <p className={styles.sectionIntro}>
            Sufficient colour contrast ensures text is readable for users with low vision or
            colour vision deficiencies. 1 in 12 men and 1 in 200 women have some form of
            colour vision deficiency.
          </p>

          <div className={styles.blockList}>
            <Block title="WCAG AA contrast requirements" id="css-b4">
              <DefList
                label="WCAG AA minimum contrast ratios"
                rows={[
                  ['Normal text (under 18px regular or 14px bold)', 'Minimum 4.5:1'],
                  ['Large text (18px+ regular or 14px+ bold)', 'Minimum 3:1'],
                  ['UI components (borders, icons, form controls)', 'Minimum 3:1'],
                  ['Focus indicators', 'Minimum 3:1 against adjacent colours'],
                  ['Decorative text', 'No requirement'],
                  ['Disabled elements', 'No requirement, but consider usability'],
                ]}
              />
            </Block>

            <Block title="Never convey information by colour alone" id="css-b5">
              <p className={styles.blockDesc}>
                WCAG 1.4.1 requires that colour is not the only visual means of conveying
                information. Add a second visual indicator: an icon, border, pattern, or
                text label.
              </p>
              <DoDont
                doCode={`/* Error state — colour + icon + text, not just red */\n.field-error input {\n  border-color: #c0392b;\n  border-width: 2px;\n}\n\n.field-error .label::before {\n  content: '⚠ '; /* icon */\n}\n\n.field-error .message {\n  color: #c0392b;\n  /* text label also present */\n}`}
                dontCode={`/* Colour-only error indication */\n.field-error input {\n  border-color: red; /* only visual cue */\n}`}
              />
            </Block>

            <Block title="Test in forced colours / high contrast mode" id="css-b6">
              <p className={styles.blockDesc}>
                Windows High Contrast mode overrides all custom colours. Elements styled only
                with CSS colours (backgrounds, borders, custom focus rings) may disappear.
                Use <code>forced-colors</code> media query to adapt.
              </p>
              <CodeBlock
                code={`@media (forced-colors: active) {\n  /* Ensure custom focus rings survive forced colours */\n  :focus-visible {\n    outline: 3px solid ButtonText;\n  }\n\n  /* Preserve borders on cards that rely on background */\n  .card {\n    border: 1px solid ButtonText;\n  }\n}`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Reduced motion ──────────────────────── */}
        <section id="reduced-motion" aria-labelledby="css-s3-heading" className={styles.section}>
          <h2 id="css-s3-heading" className={styles.sectionTitle}>Reduced motion</h2>
          <p className={styles.sectionIntro}>
            Users with vestibular disorders can experience nausea, dizziness, or seizures from
            excessive animation. The <code>prefers-reduced-motion</code> media query lets you
            respect their system preference.
          </p>

          <div className={styles.blockList}>
            <Block title="Global motion reset" id="css-b7">
              <p className={styles.blockDesc}>
                The safest approach: a global rule that removes all animations and transitions
                when the user has requested reduced motion. Apply it early in your CSS.
              </p>
              <CodeBlock
                code={`@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}`}
              />
            </Block>

            <Block title="Provide alternative feedback for reduced motion" id="css-b8">
              <p className={styles.blockDesc}>
                Where animation communicates state (a spinner, a progress bar), substitute a
                non-motion equivalent: opacity change, a status label, or a static icon.
              </p>
              <DoDont
                doCode={`/* Fade instead of slide */\n.modal {\n  transition: opacity 200ms ease;\n  transform: translateY(20px);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .modal {\n    transition: opacity 200ms ease;\n    transform: none; /* no motion */\n  }\n}`}
                dontCode={`/* Animation with no fallback */\n.modal {\n  animation: slideIn 300ms ease;\n}\n/* No @media (prefers-reduced-motion) block */`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Visually hidden ─────────────────────── */}
        <section id="visually-hidden" aria-labelledby="css-s4-heading" className={styles.section}>
          <h2 id="css-s4-heading" className={styles.sectionTitle}>Visually hidden, not display: none</h2>
          <p className={styles.sectionIntro}>
            Sometimes you need to provide content for screen readers that sighted users don't
            need to see: additional context labels, "opens in a new tab" notices, skip links
            before focus. The visually-hidden pattern keeps content in the accessibility tree
            while removing it visually.
          </p>

          <div className={styles.blockList}>
            <Block title="The visually-hidden utility class" id="css-b9">
              <p className={styles.blockDesc}>
                Use this pattern, not <code>display: none</code> or{' '}
                <code>visibility: hidden</code>, both of which remove content from the
                accessibility tree entirely.
              </p>
              <DoDont
                doCode={`.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}`}
                dontCode={`/* Removed from accessibility tree — screen readers skip it */\n.hidden { display: none; }\n.hidden { visibility: hidden; }\n\n/* Invisible but takes up space — fragile */\n.hidden { opacity: 0; }`}
              />
            </Block>

            <Block title="Common uses" id="css-b10">
              <p className={styles.blockDesc}>
                The <code>.sr-only</code> pattern is used wherever you need to communicate
                additional context to screen reader users that the visual design already makes
                clear for sighted users.
              </p>
              <CodeBlock
                code={`/* Clarify an ambiguous icon button */\n<button aria-label="Close dialog">\n  <svg aria-hidden="true">...</svg>\n</button>\n\n/* Add context to a standalone link */\n<a href="/product/123">\n  Buy now\n  <span class="sr-only">— Blue Widget, £29.99</span>\n</a>\n\n/* Mark required fields accessibly */\n<label>\n  Email\n  <span aria-hidden="true"> *</span>\n  <span class="sr-only">(required)</span>\n</label>`}
              />
            </Block>

            <Block title="Skip links" id="css-b11">
              <p className={styles.blockDesc}>
                Skip links are visually hidden until focused. They must be the first focusable
                element on the page so keyboard users can skip past repeated navigation.
              </p>
              <CodeBlock
                code={`.skip-link {\n  position: absolute;\n  top: -100%;\n  left: 1rem;\n  background: #E8593C;\n  color: #ffffff;\n  padding: 0.75rem 1.5rem;\n  font-weight: 700;\n  text-decoration: none;\n  border-radius: 6px;\n  z-index: 9999;\n}\n\n.skip-link:focus {\n  top: 1rem; /* appears when focused */\n}`}
              />
            </Block>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Touch targets ───────────────────────── */}
        <section id="touch-targets" aria-labelledby="css-s5-heading" className={styles.section}>
          <h2 id="css-s5-heading" className={styles.sectionTitle}>Spacing & touch targets</h2>
          <p className={styles.sectionIntro}>
            Interactive elements must be large enough to tap accurately. WCAG 2.5.5 (Level AAA)
            recommends 44×44px minimum. WCAG 2.5.8 (Level AA, 2.2) requires at least 24×24px or
            adequate spacing between targets.
          </p>

          <div className={styles.blockList}>
            <Block title="Minimum touch target size" id="css-b12">
              <p className={styles.blockDesc}>
                Use padding to achieve minimum target size, not just font size. A small icon
                button with a large invisible hit area covers both visual and touch needs.
              </p>
              <DoBlock
                code={`/* Minimum size via padding */\n.btn {\n  min-height: 44px;\n  min-width: 44px;\n  padding: 12px 24px;\n}\n\n/* Expand tap area without changing visual size */\n.icon-btn {\n  position: relative;\n  padding: 8px;\n}\n\n.icon-btn::before {\n  content: '';\n  position: absolute;\n  inset: 50% auto auto 50%;\n  transform: translate(-50%, -50%);\n  min-width: 44px;\n  min-height: 44px;\n}`}
              />
            </Block>

            <Block title="Spacing between adjacent targets" id="css-b13">
              <p className={styles.blockDesc}>
                When targets can't be made 44px, ensure adequate spacing between them. WCAG
                2.5.8 requires that the spacing plus the target size totals at least 24px in
                each dimension.
              </p>
              <DoBlock
                code={`/* Adequate spacing between small targets */\n.nav-item + .nav-item {\n  margin-left: 8px;\n}\n\n/* Inline icon buttons in a toolbar */\n.toolbar-btn {\n  min-height: 44px;\n  min-width: 44px;\n  /* no extra margin needed — meets 44px independently */\n}\n\n/* Smaller targets with compensating spacing */\n.tag-btn {\n  height: 32px;\n  margin: 6px; /* 32 + 6*2 = 44px effective */\n}`}
              />
            </Block>
          </div>
        </section>

        <NextLink to="/code-patterns/javascript" label="JavaScript & state management" />

        </div>
      </div>
    </main>
  )
}
