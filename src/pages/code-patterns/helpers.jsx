/**
 * Shared components and hooks for Code Patterns sub-pages.
 * All helpers import from SubPage.module.css so sub-pages
 * only need to import the helpers — styles come along for free.
 */
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './SubPage.module.css'

/* ── Custom hook — active anchor nav section ───────────────── */
export function useActiveSection(ids) {
  const [activeSection, setActiveSection] = useState(ids[0])
  const navRef = useRef(null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* Keep active pill scrolled into view in the nav strip */
  useEffect(() => {
    if (!navRef.current) return
    const activePill = navRef.current.querySelector('[aria-current="true"]')
    activePill?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [activeSection])

  return { activeSection, navRef }
}

/* ── Anchor nav ────────────────────────────────────────────── */
export function AnchorNav({ items, activeSection, navRef }) {
  return (
    <div className={styles.anchorNavWrap}>
      <nav
        className={styles.anchorNavInner}
        ref={navRef}
        aria-label="Page sections"
      >
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`${styles.pill} ${activeSection === id ? styles.pillActive : ''}`}
            aria-current={activeSection === id ? 'true' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}

/* ── Breadcrumb ────────────────────────────────────────────── */
export function Breadcrumb({ currentPage }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
      <ol className={styles.breadcrumbList}>
        <li className={styles.breadcrumbItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.breadcrumbSep} aria-hidden="true">{'>'}</li>
        <li className={styles.breadcrumbItem}>
          <Link to="/code-patterns">Code patterns</Link>
        </li>
        <li className={styles.breadcrumbSep} aria-hidden="true">{'>'}</li>
        <li className={styles.breadcrumbItem} aria-current="page">
          {currentPage}
        </li>
      </ol>
    </nav>
  )
}

/* ── Back link ─────────────────────────────────────────────── */
export function BackLink() {
  return (
    <Link
      to="/code-patterns"
      className={styles.backLink}
      aria-label="Back to Code patterns overview"
    >
      ← Code patterns
    </Link>
  )
}

/* ── Next topic link ───────────────────────────────────────── */
export function NextLink({ to, label }) {
  return (
    <div className={styles.nextLinkWrap}>
      <hr className="divider" style={{ margin: '0 0 var(--space-8)' }} />
      <div className={styles.nextLinkRow}>
        <span className={styles.nextLinkLabel}>Next topic</span>
        <Link
          to={to}
          className={styles.nextLink}
          aria-label={`Next topic: ${label}`}
        >
          {label} →
        </Link>
      </div>
    </div>
  )
}

/* ── Content block wrapper ─────────────────────────────────── */
export function Block({ title, id, children }) {
  return (
    <article className={styles.block} aria-labelledby={id}>
      <h3 id={id} className={styles.blockTitle}>{title}</h3>
      <div className={styles.blockBody}>{children}</div>
    </article>
  )
}

/* ── Code examples ─────────────────────────────────────────── */
export function CodeBlock({ srLabel = 'Code example:', code }) {
  return (
    <pre className={styles.codeBlock}>
      <span className="sr-only">{srLabel}</span>
      <code>{code}</code>
    </pre>
  )
}

export function DoBlock({ code }) {
  return (
    <div className={styles.doDontItem}>
      <span className={styles.doLabel} aria-label="Recommended pattern">DO</span>
      <CodeBlock code={code} srLabel="Recommended code example:" />
    </div>
  )
}

export function DontBlock({ code }) {
  return (
    <div className={styles.doDontItem}>
      <span className={styles.dontLabel} aria-label="Avoid this pattern">DON'T</span>
      <CodeBlock code={code} srLabel="Pattern to avoid:" />
    </div>
  )
}

export function DoDont({ doCode, dontCode }) {
  return (
    <div className={styles.doDontPair}>
      <DoBlock code={doCode} />
      <DontBlock code={dontCode} />
    </div>
  )
}

/* ── ARIA / definition rows ────────────────────────────────── */
export function DefList({ label, rows }) {
  return (
    <div
      className={styles.defList}
      role="list"
      aria-label={label}
    >
      {rows.map(([key, def]) => (
        <div key={key} className={styles.defItem} role="listitem">
          <code className={styles.defKey}>{key}</code>
          <span className={styles.defVal}>{def}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Callout box ───────────────────────────────────────────── */
export function Callout({ label, children }) {
  return (
    <aside className={styles.callout} aria-label={label}>
      <span className="section-label">{label}</span>
      {children}
    </aside>
  )
}

/* ── Mistake list ──────────────────────────────────────────── */
export function MistakeList({ items }) {
  return (
    <ul className={styles.mistakeList} role="list">
      {items.map((item) => (
        <li key={item} className={styles.mistakeItem}>
          <span className={styles.mistakeMark} aria-hidden="true">✕</span>
          {item}
        </li>
      ))}
    </ul>
  )
}
