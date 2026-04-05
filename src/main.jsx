import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// Apply dark/light mode before first render to avoid flash
const stored = localStorage.getItem('colorMode')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (stored === 'light' || (!stored && !prefersDark)) {
  document.documentElement.classList.add('light')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
