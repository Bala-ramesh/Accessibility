import React from 'react'
import styles from './SubPage.module.css'
import pageStyles from './HtmlSemantics.module.css'
import {
  useActiveSection,
  AnchorNav,
  BackLink,
  NextLink,
  DoDont,
} from './helpers.jsx'

/* ── Section IDs for nav tracking ─────────────── */
const MAIN_SECTIONS = [
  { id: 'key-concepts',        label: 'Key Concepts' },
  { id: 'detailed-guidelines', label: 'Guidelines' },
  { id: 'examples',            label: 'Examples' },
  { id: 'checklist',           label: 'Checklist' },
]

/* ── Key concept cards ─────────────────────────── */
const CONCEPTS = [
  {
    tag: 'Principle',
    title: 'Native HTML first',
    desc: 'Use semantic elements before ARIA. Every native element carries built-in role, keyboard behaviour, and screen reader support for free.',
  },
  {
    tag: 'Structure',
    title: 'Landmark regions',
    desc: 'Use <header>, <main>, <nav>, <footer>, <aside>, <section> to give pages navigable structure for assistive technology users.',
  },
  {
    tag: 'Structure',
    title: 'Heading hierarchy',
    desc: 'One h1 per page. Sequential nesting (h2 → h3). Use CSS for visual sizing, not heading level. Headings are navigation, not style.',
  },
  {
    tag: 'Media',
    title: 'Images & alt text',
    desc: 'Decorative images get empty alt="". Informative images get concise descriptions. Complex images (charts, diagrams) need long descriptions.',
  },
  {
    tag: 'Interaction',
    title: 'Keyboard navigation',
    desc: 'Every interactive element must be reachable by Tab. Tab order must follow the visual reading flow. Positive tabindex values break this.',
  },
  {
    tag: 'Interaction',
    title: 'Focus states',
    desc: 'Never remove :focus-visible outlines without an equally visible alternative. WCAG 2.4.7 requires visible keyboard focus.',
  },
  {
    tag: 'Forms',
    title: 'Accessible forms',
    desc: 'Every input needs a <label>. Group related controls with fieldset + legend. Announce errors live. Validate on blur, not on keystroke.',
  },
  {
    tag: 'Content',
    title: 'Lists & tables',
    desc: 'Use <ul>/<ol> for collections. Use <table> with <caption>, <th scope>, <thead>, <tbody> for tabular data, never for layout.',
  },
  {
    tag: 'ARIA',
    title: 'Accessible names',
    desc: 'All interactive elements must have an accessible name. Use visible text first. Add aria-label only when no visible text is suitable.',
  },
]

/* ── Detailed guidelines by category ──────────── */
const GUIDELINES = [
  {
    category: 'Structure & Elements',
    items: [
      {
        id: 'gl-semantic',
        title: 'Semantic elements',
        desc: 'Use elements for their intended purpose. Every native HTML element carries built-in role, keyboard behaviour, and accessibility support. Use them before reaching for ARIA or custom event handlers.',
        doCode:
`<button type="button">Save changes</button>
<a href="/dashboard">Go to dashboard</a>
<nav aria-label="Main navigation">...</nav>
<header>...</header>
<main id="main-content">...</main>`,
        dontCode:
`<div onclick="save()">Save changes</div>
<span onclick="navigate()">Go to dashboard</span>
<div class="nav">...</div>
<div class="header">...</div>
<div class="content">...</div>`,
      },
      {
        id: 'gl-landmarks',
        title: 'Landmark regions',
        desc: 'Landmarks give structural meaning to a page. Screen reader users navigate between landmarks to jump to the content they need, just like sighted users scan visually. Every page needs exactly one <main>. Label duplicate landmarks.',
        doCode:
`<header>...</header>
<nav aria-label="Main navigation">...</nav>
<main id="main-content">...</main>
<aside aria-label="Related resources">...</aside>
<footer>...</footer>

<!-- Two navs: both need aria-label -->
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Breadcrumb">...</nav>`,
        dontCode:
`<!-- No landmark elements -->
<div class="header">...</div>
<div class="nav">...</div>
<div class="content">...</div>

<!-- Duplicate unlabelled navs -->
<!-- Screen reader can't distinguish these -->
<nav>...</nav>
<nav>...</nav>`,
      },
      {
        id: 'gl-headings',
        title: 'Heading hierarchy',
        desc: 'Headings are navigation. Screen reader users jump between headings to scan structure. One h1 per page. Nest levels sequentially. If you need smaller text, use CSS; don\'t skip to a lower heading level for visual reasons.',
        doCode:
`<h1>Page title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
  <h2>Next section</h2>

/* Visual sizing via CSS, not heading level */
.h2-style { font-size: clamp(1.5rem, 3vw, 2.25rem); }
.h3-style { font-size: clamp(1.125rem, 2vw, 1.5rem); }`,
        dontCode:
`<h1>Page title</h1>
  <h3>Subsection</h3>  /* skipped h2! */
    <h5>Detail</h5>  /* skipped h4! */

<!-- h4 chosen to look smaller — wrong reason -->
<h4>This should be h2, just styled smaller</h4>`,
      },
      {
        id: 'gl-section-article',
        title: 'section vs article vs div',
        desc: '<article> is for self-contained, independently distributable content (a blog post, a comment, a product card). <section> groups thematic content within a page and needs an accessible name. <div> carries no semantic meaning; use it only for styling or scripting hooks.',
        doCode:
`<!-- Self-contained, syndication-worthy content -->
<article>
  <h2>Blog post title</h2>
  <p>Content that makes sense standalone...</p>
</article>

<!-- Thematic group: needs accessible name -->
<section aria-labelledby="team-heading">
  <h2 id="team-heading">Our team</h2>
</section>

<!-- Pure layout wrapper — no semantic meaning needed -->
<div class="card-grid">...</div>`,
        dontCode:
`<!-- <div> where semantic element fits -->
<div class="article">...</div>

<!-- <section> without accessible name -->
<!-- Screen readers announce "section" with no label -->
<section>...</section>

<!-- <article> for non-distributable layout chunks -->
<article class="sidebar-widget">...</article>`,
      },
    ],
  },
  {
    category: 'Interaction',
    items: [
      {
        id: 'gl-links-buttons',
        title: 'Links vs buttons',
        desc: 'Links navigate. Buttons perform actions. They are not interchangeable. An <a> without an href receives no keyboard focus and has no accessible role. Getting this wrong confuses both keyboard users and screen reader users.',
        doCode:
`/* Navigation — use a link */
<a href="/about">About us</a>
<a href="#section-2">Jump to section 2</a>
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Example.com (opens in a new tab)"
>Example.com</a>

/* Actions — use a button */
<button type="submit">Submit form</button>
<button type="button">Open modal</button>
<button type="button">Toggle menu</button>`,
        dontCode:
`/* Wrong — use <button> for actions */
<a href="#">Open modal</a>
<a href="javascript:void(0)">Delete item</a>

/* Wrong — use <a> for navigation */
<button onclick="location.href='/about'">About us</button>

/* Href-less link: no focus, no role */
<a onclick="doThing()">Click me</a>`,
      },
      {
        id: 'gl-keyboard',
        title: 'Keyboard navigation',
        desc: 'All interactive elements must be reachable and operable by keyboard alone. Tab moves forward, Shift+Tab moves backward. Tab order must follow the visual reading flow. Never use positive tabindex values; they override natural order and cause confusion.',
        doCode:
`<!-- Skip link: first focusable element on the page -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<!-- DOM order matches visual order -->
<header>...</header>
<main id="main-content">...</main>
<footer>...</footer>

<!-- tabindex="0": adds to natural tab flow -->
<div role="region" tabindex="0" aria-label="Map">...</div>

<!-- tabindex="-1": focusable by script only -->
<div id="modal-heading" tabindex="-1">...</div>`,
        dontCode:
`<!-- Positive tabindex overrides natural order -->
<button tabindex="3">Appears last visually</button>
<button tabindex="1">But receives focus first</button>

<!-- Never use positive tabindex -->
<div tabindex="5">This breaks everything</div>

<!-- Removing an element from tab order -->
<!-- (only valid for intentionally hidden elements) -->
<button tabindex="-1">Unreachable by keyboard</button>`,
      },
      {
        id: 'gl-focus-states',
        title: 'Focus states',
        desc: 'Visible focus is a WCAG 2.4.7 (AA) requirement. Use :focus-visible to show outlines for keyboard users without affecting mouse or touch users. Never suppress outlines without providing an equally visible, high-contrast alternative.',
        doCode:
`/* :focus-visible: shows only for keyboard navigation */
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove outline for mouse/touch only */
:focus:not(:focus-visible) {
  outline: none;
}

/* Custom component: maintain visible focus */
.btn:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 3px;
  box-shadow: 0 0 0 5px rgba(0, 95, 204, 0.25);
}`,
        dontCode:
`/* NEVER — removes focus for ALL users */
* { outline: none; }
* { outline: 0; }
button:focus { outline: none; }
a:focus { outline: none; }

/* Even "styling" must meet contrast requirements */
/* A 1px dotted outline doesn't pass WCAG 2.4.11 */
:focus { outline: 1px dotted grey; }`,
      },
      {
        id: 'gl-interactive-components',
        title: 'Interactive components',
        desc: 'Modals must trap focus within them while open, and return focus to the trigger when closed. Use the native <dialog> element where possible; it provides focus trapping and Escape key handling built-in. Custom widgets need keyboard support matching their native equivalents.',
        doCode:
`<!-- Native <dialog>: focus trap, Escape, built-in -->
<dialog
  id="confirm-dialog"
  aria-labelledby="dlg-title"
  aria-modal="true"
>
  <h2 id="dlg-title">Confirm delete</h2>
  <p>This action cannot be undone.</p>
  <!-- autofocus: first focused element on open -->
  <button autofocus type="button"
    onclick="confirmDialog.close()">Cancel</button>
  <button type="button">Delete</button>
</dialog>

<button
  type="button"
  onclick="confirmDialog.showModal()"
>
  Delete item
</button>`,
        dontCode:
`<!-- No focus management, no Escape handling -->
<div class="modal" role="dialog">
  <h2>Confirm delete</h2>
  <!-- Focus escapes to content behind modal -->
  <!-- Closing doesn't return focus to trigger -->
  <!-- Escape key not handled -->
</div>

<!-- Opening without showModal() loses
     built-in focus trap and role=dialog -->
<script>
  dialog.style.display = 'block'; /* wrong */
</script>`,
      },
    ],
  },
  {
    category: 'Media & Content',
    items: [
      {
        id: 'gl-images',
        title: 'Images & alt text',
        desc: 'Every <img> needs an alt attribute. Decorative images get empty alt="" (screen readers skip them entirely; do not write "decorative" or describe the image). Informative images get concise text alternatives. Complex images need a long description.',
        doCode:
`<!-- Decorative: empty alt, screen reader skips -->
<img src="banner-bg.jpg" alt="" role="presentation" />

<!-- Informative: describe what the image conveys -->
<img
  src="revenue-chart.png"
  alt="Revenue grew 40% from Q3 to Q4 2024"
/>

<!-- Complex: long description via figcaption -->
<figure>
  <img
    src="org-chart.png"
    alt="Company org chart"
    aria-describedby="org-chart-desc"
  />
  <figcaption id="org-chart-desc">
    CEO at top. Three VPs (Engineering, Product,
    Design) report to the CEO. Each VP leads a
    team of 4–6 engineers or designers.
  </figcaption>
</figure>`,
        dontCode:
`<!-- Missing alt: screen reader reads filename -->
<img src="revenue-chart.png" />

<!-- "Image of" is redundant — AT already says "image" -->
<img src="dog.jpg" alt="Image of a dog" />

<!-- Filename as alt text -->
<img src="img_0234.jpg" alt="img_0234" />

<!-- Decorative with descriptive text (adds noise) -->
<img src="divider.svg" alt="decorative swirl divider" />

<!-- Long description missing for complex image -->
<img src="org-chart.png" alt="Org chart" />`,
      },
      {
        id: 'gl-lists',
        title: 'Lists',
        desc: 'Use <ul> for unordered collections where sequence doesn\'t matter. Use <ol> for ordered sequences, steps, or rankings. Use <dl> for key-value pairs, glossaries, or metadata. Don\'t use lists purely for visual indentation or layout.',
        doCode:
`<!-- Unordered: sequence is irrelevant -->
<ul>
  <li>Keyboard accessible</li>
  <li>Screen reader compatible</li>
  <li>Colour contrast compliant</li>
</ul>

<!-- Ordered: sequence matters (steps) -->
<ol>
  <li>Install dependencies</li>
  <li>Configure your environment</li>
  <li>Start the dev server</li>
</ol>

<!-- Definition list: key-value pairs -->
<dl>
  <dt>WCAG</dt>
  <dd>Web Content Accessibility Guidelines</dd>
  <dt>AT</dt>
  <dd>Assistive Technology</dd>
</dl>`,
        dontCode:
`<!-- Using list for visual indent only -->
<ul style="list-style:none; padding:0">
  <li>Not really a list</li>
  <li>Just indented text</li>
</ul>

<!-- Using <br> instead of a list -->
<p>
  Step 1: Install<br />
  Step 2: Configure<br />
  Step 3: Run
</p>

<!-- Mixing list types incorrectly -->
<ul>
  <li>1. First step</li>  <!-- use <ol> -->
  <li>2. Second step</li>
</ul>`,
      },
      {
        id: 'gl-tables',
        title: 'Tables',
        desc: 'Use <table> only for tabular data, never for layout. Always include <caption> to name the table. Use <thead>, <tbody> for structure. Use <th> with scope="col" or scope="row" to associate headers with data cells so screen readers can announce the correct header for each cell.',
        doCode:
`<table>
  <caption>Monthly revenue by region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$12,000</td>
      <td>$14,500</td>
    </tr>
    <tr>
      <th scope="row">South</th>
      <td>$9,800</td>
      <td>$11,200</td>
    </tr>
  </tbody>
</table>`,
        dontCode:
`<!-- No caption, no <th>, no scope -->
<table>
  <tr>
    <td>Region</td>  <!-- should be <th scope="col"> -->
    <td>Q3</td>
    <td>Q4</td>
  </tr>
  <tr>
    <td>North</td>
    <td>$12,000</td>
    <td>$14,500</td>
  </tr>
</table>

<!-- Layout table: use CSS Grid/Flexbox instead -->
<table>
  <tr>
    <td><img src="logo.png" /></td>
    <td><nav>...</nav></td>
  </tr>
</table>`,
      },
    ],
  },
  {
    category: 'Forms',
    items: [
      {
        id: 'gl-form-structure',
        title: 'Form structure',
        desc: 'Every input needs a visible <label> associated via for/id. Placeholder text is not a label; it disappears on input and has low contrast by default. Group related controls (radio buttons, checkboxes) with <fieldset> and <legend>.',
        doCode:
`<form>
  <!-- Visible label, correctly associated -->
  <label for="email">Email address</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    autocomplete="email"
  />

  <!-- Related group: fieldset + legend -->
  <fieldset>
    <legend>Preferred contact method</legend>
    <label>
      <input type="radio" name="contact" value="email" />
      Email
    </label>
    <label>
      <input type="radio" name="contact" value="phone" />
      Phone
    </label>
  </fieldset>
</form>`,
        dontCode:
`<!-- Placeholder as label — disappears on input -->
<input type="email" placeholder="Email address" />

<!-- No label association -->
<span>Email</span>
<input type="email" />

<!-- aria-label instead of visible label
     (acceptable but less preferred) -->
<input type="email" aria-label="Email address" />

<!-- Radio group without fieldset/legend -->
<p>Contact method</p>
<input type="radio" name="c" /> Email
<input type="radio" name="c" /> Phone`,
      },
      {
        id: 'gl-form-ux',
        title: 'Form UX & validation',
        desc: 'Validate on blur or submit, not on every keystroke. Use aria-describedby to link error messages to their inputs. Use aria-invalid="true" on invalid fields. Announce errors with role="alert". Provide format hints before the field to prevent errors in the first place.',
        doCode:
`<!-- Hint before the field: error prevention -->
<label for="pwd">Password</label>
<p id="pwd-hint">Minimum 8 characters, include a number.</p>
<input
  type="password"
  id="pwd"
  aria-describedby="pwd-hint pwd-error"
  aria-invalid="true"
  autocomplete="new-password"
/>

<!-- Error: role="alert" announces immediately -->
<p id="pwd-error" role="alert">
  Password must be at least 8 characters.
</p>

<!-- Required field: both visual and semantic -->
<label for="name">
  Full name
  <span aria-hidden="true"> *</span>
  <span class="sr-only">(required)</span>
</label>
<input type="text" id="name" required autocomplete="name" />`,
        dontCode:
`<!-- Error not linked to field -->
<span style="color:red">Invalid email!</span>
<input type="email" />

<!-- Error communicated by colour alone -->
<input type="email" style="border: 2px solid red" />

<!-- Validation fires on every keystroke -->
<input type="email" oninput="validate(this)" />

<!-- No role="alert": error not announced -->
<p id="err" class="error-msg">Invalid email</p>
<input aria-describedby="err" type="email" />`,
      },
    ],
  },
  {
    category: 'ARIA & Names',
    items: [
      {
        id: 'gl-accessible-names',
        title: 'Accessible names',
        desc: 'Every interactive element needs an accessible name: the text assistive technology announces. Prefer visible text. Use aria-label for icon-only controls. Use aria-labelledby to reference existing on-page text. Avoid aria-label when it would duplicate visible text.',
        doCode:
`<!-- Visible text: best approach -->
<button type="button">Close</button>

<!-- Icon only: aria-label required -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false">
    <!-- SVG paths -->
  </svg>
</button>

<!-- Icon + visible text: hide the icon from AT -->
<button type="button">
  <svg aria-hidden="true" focusable="false">...</svg>
  Close
</button>

<!-- Section name from existing heading -->
<h2 id="team-heading">Our team</h2>
<section aria-labelledby="team-heading">...</section>`,
        dontCode:
`<!-- Icon button with no name -->
<button type="button">
  <svg><!-- no title, no aria-label --></svg>
</button>

<!-- Empty aria-label removes the name entirely -->
<button aria-label="">Delete</button>

<!-- aria-label duplicating visible text (redundant) -->
<button aria-label="Submit the form" type="submit">
  Submit
</button>

<!-- SVG <title> alone doesn't reliably expose the name -->
<button type="button">
  <svg><title>Close</title></svg>
</button>`,
      },
      {
        id: 'gl-disabled',
        title: 'disabled vs aria-disabled',
        desc: 'The native disabled attribute removes an element from tab order and prevents all interaction; screen readers may skip it entirely. aria-disabled="true" keeps the element focusable and communicates its state, which is preferable when you want keyboard users to discover why it\'s unavailable.',
        doCode:
`<!-- Native disabled: removes from tab order entirely -->
<!-- Best when element truly should not be focusable -->
<button type="submit" disabled>Processing...</button>

<!-- aria-disabled: stays focusable, can explain why -->
<!-- Must prevent action in the click handler -->
<button
  type="button"
  aria-disabled="true"
  aria-describedby="export-reason"
  onclick="handleDisabledClick(event)"
>
  Export data
</button>
<p id="export-reason" class="sr-only">
  Select at least one row to enable export.
</p>

<script>
function handleDisabledClick(e) {
  if (e.currentTarget.getAttribute('aria-disabled') === 'true') {
    e.preventDefault()
    showTooltip('Select rows first')
  }
}
</script>`,
        dontCode:
`<!-- aria-disabled but action still fires -->
<button
  aria-disabled="true"
  onclick="deleteItem()"  /* still triggers! */
>
  Delete
</button>

<!-- Using disabled for cosmetic effect only -->
<input
  type="text"
  disabled
  placeholder="Not actually disabled, just greyed out"
/>

<!-- No visual or programmatic indication -->
<button type="button" style="opacity:0.4">
  <!-- User doesn't know why it's greyed out -->
  Export
</button>`,
      },
    ],
  },
]

/* ── Quick-scan checklist ──────────────────────── */
const CHECKLIST = [
  {
    category: 'Structure & Semantics',
    items: [
      'One <h1> per page; heading levels never skipped',
      'Exactly one <main> landmark on every page',
      'Multiple <nav> elements each have a unique aria-label',
      '<section> elements named via aria-labelledby (not bare <section>)',
      '<article> used only for self-contained, distributable content',
      '<div> used only for layout/styling, never where a semantic element fits',
    ],
  },
  {
    category: 'Images & Media',
    items: [
      'Every <img> has an alt attribute (even if empty)',
      'Decorative images have alt="" (not alt="decorative")',
      'Informative alt text describes the content, not the appearance',
      'Complex images (charts, graphs) have a long text description',
    ],
  },
  {
    category: 'Keyboard & Focus',
    items: [
      'All interactive elements reachable by Tab key',
      'Tab order matches the visual reading flow',
      'No positive tabindex values anywhere',
      'Skip to main content link is the first focusable element',
      ':focus-visible styles never removed without a visible alternative',
      'Modal dialogs trap focus while open and return it on close',
    ],
  },
  {
    category: 'Forms',
    items: [
      'Every input has an associated <label>, not just placeholder text',
      'Related radio/checkbox groups wrapped in <fieldset> + <legend>',
      'Error messages linked to inputs via aria-describedby',
      'Invalid fields carry aria-invalid="true"',
      'Errors announced immediately with role="alert" or aria-live="assertive"',
      'Required fields use the native required attribute',
    ],
  },
  {
    category: 'ARIA & Accessible Names',
    items: [
      'All interactive elements have an accessible name',
      'Icon-only buttons and links have aria-label',
      'aria-disabled used (not disabled) when focusability is intentional',
      'aria-disabled click handlers check state before acting',
    ],
  },
]

/* ═══════════════════════════════════════════════ */
export default function HtmlSemantics() {
  const { activeSection, navRef } = useActiveSection(MAIN_SECTIONS.map((i) => i.id))

  return (
    <main id="main-content" tabIndex={-1} className={pageStyles.main}>

      {/* ── Page header ─────────────────────────── */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <BackLink />
          <span className="section-label">01 — HTML & semantics</span>
          <h1 className={styles.pageTitle}>HTML & semantic structure</h1>
          <p className={styles.pageIntro}>
            HTML is the foundation of accessibility. The right element, in the right place,
            with the right name eliminates most barriers before you write a line of CSS or JavaScript.
          </p>
        </div>
      </div>

      {/* ── Mobile anchor nav (hidden ≥ 900px) ──── */}
      <div className={pageStyles.mobileNav}>
        <AnchorNav items={MAIN_SECTIONS} activeSection={activeSection} navRef={navRef} />
      </div>

      {/* ── Two-column layout ────────────────────── */}
      <div className={pageStyles.pageLayout}>

        {/* ── Sidebar (hidden < 900px) ────────────── */}
        <aside className={pageStyles.sidebar}>
          <nav aria-label="On this page">
            <p className={pageStyles.sidebarLabel} aria-hidden="true">On this page</p>
            <ul className={pageStyles.sidebarList} role="list">
              {MAIN_SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`${pageStyles.sidebarLink} ${activeSection === id ? pageStyles.sidebarLinkActive : ''}`}
                    aria-current={activeSection === id ? 'true' : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* ── Main content column ─────────────────── */}
        <div className={pageStyles.mainContent}>

          {/* ════════════════════════════════════════
              H2 — Key Concepts
          ════════════════════════════════════════ */}
          <section
            id="key-concepts"
            aria-labelledby="h2-key-concepts"
            className={pageStyles.section}
          >
            <h2 id="h2-key-concepts" className={pageStyles.sectionTitle}>Key Concepts</h2>
            <p className={pageStyles.sectionIntro}>
              The ideas that underpin every accessible HTML decision. Understand these,
              and the details follow naturally.
            </p>

            <div className={pageStyles.conceptGrid} role="list">
              {CONCEPTS.map(({ tag, title, desc }) => (
                <div key={title} className={pageStyles.conceptCard} role="listitem">
                  <span className={pageStyles.conceptTag}>{tag}</span>
                  <p className={pageStyles.conceptCardTitle}>{title}</p>
                  <p className={pageStyles.conceptCardDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* ════════════════════════════════════════
              H2 — Detailed Guidelines
          ════════════════════════════════════════ */}
          <section
            id="detailed-guidelines"
            aria-labelledby="h2-guidelines"
            className={pageStyles.section}
          >
            <h2 id="h2-guidelines" className={pageStyles.sectionTitle}>Detailed Guidelines</h2>
            <p className={pageStyles.sectionIntro}>
              Each topic expands to show the rule, the reasoning, and DO / DON'T code examples.
              Open what you need; collapse the rest to reduce noise.
            </p>

            <div className={pageStyles.detailsList}>
              {GUIDELINES.map(({ category, items }) => (
                <React.Fragment key={category}>
                  <p className={pageStyles.detailsCategoryLabel} aria-hidden="true">
                    {category}
                  </p>
                  {items.map(({ id, title, desc, doCode, dontCode }) => (
                    <details key={id} className={pageStyles.detailsItem}>
                      <summary className={pageStyles.detailsSummary}>
                        <span>{title}</span>
                        <span className={pageStyles.detailsChevron} aria-hidden="true">▼</span>
                      </summary>
                      <div className={pageStyles.detailsBody}>
                        <p className={pageStyles.detailsDesc}>{desc}</p>
                        <DoDont doCode={doCode} dontCode={dontCode} />
                      </div>
                    </details>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* ════════════════════════════════════════
              H2 — Examples
          ════════════════════════════════════════ */}
          <section
            id="examples"
            aria-labelledby="h2-examples"
            className={pageStyles.section}
          >
            <h2 id="h2-examples" className={pageStyles.sectionTitle}>Examples</h2>
            <p className={pageStyles.sectionIntro}>
              The most frequently misused patterns, shown side-by-side. Scan the DON'T column
              for anti-patterns you may recognise.
            </p>

            <div className={pageStyles.examplesGrid}>

              {/* ── Alt text by image type ── */}
              <article className={pageStyles.exampleBlock} aria-labelledby="ex-alt-title">
                <h3 id="ex-alt-title" className={pageStyles.exampleTitle}>
                  Alt text by image type
                </h3>
                <DoDont
                  doCode={`<!-- Decorative: empty alt, skipped by AT -->
<img src="banner-bg.jpg" alt="" />

<!-- Informative: what the image communicates -->
<img
  src="revenue-chart.png"
  alt="Revenue grew 40% from Q3 to Q4 2024"
/>

<!-- Complex: long description in figcaption -->
<figure>
  <img
    src="org-chart.png"
    alt="Company org chart"
    aria-describedby="org-desc"
  />
  <figcaption id="org-desc">
    CEO at top; three VPs (Engineering, Product,
    Design) each lead teams of 4–6 people.
  </figcaption>
</figure>`}
                  dontCode={`<!-- No alt: AT reads the filename -->
<img src="revenue-chart.png" />

<!-- "Image of" is redundant -->
<img src="dog.jpg" alt="Image of a dog" />

<!-- Filename as alt text -->
<img src="img_0234.jpg" alt="img_0234" />

<!-- Decorative with descriptive text -->
<img src="star.svg" alt="decorative star icon" />

<!-- Complex image with only a short alt -->
<img
  src="org-chart.png"
  alt="Org chart"
/> <!-- Where is the data? -->`}
                />
              </article>

              {/* ── Accessible table structure ── */}
              <article className={pageStyles.exampleBlock} aria-labelledby="ex-table-title">
                <h3 id="ex-table-title" className={pageStyles.exampleTitle}>
                  Accessible table structure
                </h3>
                <DoDont
                  doCode={`<table>
  <caption>Q4 revenue by region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$14,500</td>
      <td>+21%</td>
    </tr>
  </tbody>
</table>`}
                  dontCode={`<!-- No caption, no <th>, no scope -->
<table>
  <tr>
    <td>Region</td>   <!-- should be <th scope="col"> -->
    <td>Revenue</td>
  </tr>
  <tr>
    <td>North</td>
    <td>$14,500</td>
  </tr>
</table>

<!-- Layout table: use CSS Grid instead -->
<table>
  <tr>
    <td><img src="logo.png" /></td>
    <td><nav>...</nav></td>
  </tr>
</table>`}
                />
              </article>

              {/* ── Focus management in modals ── */}
              <article className={pageStyles.exampleBlock} aria-labelledby="ex-modal-title">
                <h3 id="ex-modal-title" className={pageStyles.exampleTitle}>
                  Focus management in modals
                </h3>
                <DoDont
                  doCode={`<!-- Native <dialog>: focus trap built-in -->
<dialog
  id="confirm"
  aria-labelledby="dlg-title"
  aria-modal="true"
>
  <h2 id="dlg-title">Confirm delete</h2>
  <p>This action cannot be undone.</p>

  <!-- autofocus: first element focused on open -->
  <button autofocus type="button"
    onclick="confirm.close()">
    Cancel
  </button>
  <button type="button">Delete</button>
</dialog>

<!-- showModal() activates built-in focus trap -->
<button onclick="confirm.showModal()">
  Delete item
</button>`}
                  dontCode={`<!-- No focus trap, no Escape handling -->
<div class="modal" role="dialog">
  <h2>Confirm delete</h2>
  <!-- Focus escapes to content behind modal -->
  <!-- Escape key does nothing -->
  <!-- Closing doesn't return focus to trigger -->
</div>

<script>
  /* Wrong: loses built-in focus trap */
  modal.style.display = 'block';
</script>`}
                />
              </article>

              {/* ── Icon button accessible names ── */}
              <article className={pageStyles.exampleBlock} aria-labelledby="ex-name-title">
                <h3 id="ex-name-title" className={pageStyles.exampleTitle}>
                  Icon button accessible names
                </h3>
                <DoDont
                  doCode={`<!-- Visible text: always best -->
<button type="button">Close</button>

<!-- Icon only: aria-label is required -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false">
    <!-- path data -->
  </svg>
</button>

<!-- Icon + text: hide icon from AT -->
<button type="button">
  <svg aria-hidden="true" focusable="false">
    ...
  </svg>
  Close
</button>`}
                  dontCode={`<!-- No name: AT announces "button" only -->
<button type="button">
  <svg><!-- no title, no aria-label --></svg>
</button>

<!-- Empty aria-label removes the name -->
<button aria-label="">Delete</button>

<!-- SVG <title> alone: unreliable across AT -->
<button type="button">
  <svg><title>Close</title></svg>
</button>`}
                />
              </article>

              {/* ── Form error announcement ── */}
              <article className={pageStyles.exampleBlock} aria-labelledby="ex-error-title">
                <h3 id="ex-error-title" className={pageStyles.exampleTitle}>
                  Form error announcement
                </h3>
                <DoDont
                  doCode={`<label for="email">Email address</label>

<!-- Hint before field: error prevention -->
<p id="email-hint">
  We'll use this to send your confirmation.
</p>

<input
  type="email"
  id="email"
  aria-describedby="email-hint email-error"
  aria-invalid="true"
  autocomplete="email"
/>

<!-- role="alert": announced immediately -->
<p id="email-error" role="alert">
  Enter a valid email (e.g. you@example.com).
</p>`}
                  dontCode={`<!-- Error not linked to field -->
<input type="email" style="border: 2px solid red" />
<span style="color:red">Invalid email</span>

<!-- Colour alone signals the error -->
<input type="email" class="input-error" />
<!-- No text error, just a red border -->

<!-- Error not announced to AT -->
<p class="error">Invalid email</p>
<input aria-describedby="non-existent-id" />

<!-- Placeholder as only instruction -->
<input type="email" placeholder="Email address" />`}
                />
              </article>

            </div>
          </section>

          <hr className="divider" />

          {/* ════════════════════════════════════════
              H2 — Checklist
          ════════════════════════════════════════ */}
          <section
            id="checklist"
            aria-labelledby="h2-checklist"
            className={pageStyles.section}
          >
            <h2 id="h2-checklist" className={pageStyles.sectionTitle}>Checklist</h2>
            <p className={pageStyles.sectionIntro}>
              A quick-scan reference for HTML accessibility reviews. Use this before committing
              or during code review. Each item maps to a guideline above.
            </p>

            <div className={pageStyles.checklistGroups}>
              {CHECKLIST.map(({ category, items }) => (
                <div key={category} className={pageStyles.checklistGroup}>
                  <h3 className={pageStyles.checklistGroupTitle}>{category}</h3>
                  <ul className={pageStyles.checklistItems} role="list">
                    {items.map((item) => (
                      <li key={item} className={pageStyles.checklistItem} role="listitem">
                        <span className={pageStyles.checkMark} aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <NextLink to="/code-patterns/aria" label="ARIA: when and how to use it" />

        </div>{/* end .mainContent */}
      </div>{/* end .pageLayout */}
    </main>
  )
}
