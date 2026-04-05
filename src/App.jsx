import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrolltoTop.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import SkipLink from './components/SkipLink.jsx'
import Home from './pages/Home.jsx'
import WCAG from './pages/WCAG.jsx'
import AssistiveTech from './pages/AssistiveTech.jsx'
import CodePatternsHub from './pages/code-patterns/CodePatternsHub.jsx'
import HtmlSemantics from './pages/code-patterns/HtmlSemantics.jsx'
import AriaGuide from './pages/code-patterns/AriaGuide.jsx'
import CssAccessibility from './pages/code-patterns/CssAccessibility.jsx'
import JavascriptState from './pages/code-patterns/JavascriptState.jsx'
import Testing from './pages/Testing.jsx'
import Tools from './pages/Tools.jsx'
import About from './pages/About.jsx'

export default function App() {
  const [colorMode, setColorMode] = useState(() => {
    const stored = localStorage.getItem('colorMode')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (colorMode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('colorMode', colorMode)
  }, [colorMode])

  function toggleMode() {
    setColorMode(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SkipLink />
      <Nav colorMode={colorMode} onToggleMode={toggleMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wcag" element={<WCAG />} />
        <Route path="/assistive-tech" element={<AssistiveTech />} />
        <Route path="/code-patterns">
          <Route index element={<CodePatternsHub />} />
          <Route path="html" element={<HtmlSemantics />} />
          <Route path="aria" element={<AriaGuide />} />
          <Route path="css" element={<CssAccessibility />} />
          <Route path="javascript" element={<JavascriptState />} />
        </Route>
        <Route path="/testing" element={<Testing />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
