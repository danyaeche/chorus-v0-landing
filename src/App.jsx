import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import ChorusLogo from './components/ChorusLogo'
import GlobeCanvas from './components/GlobeCanvas'

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('chorus-theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('chorus-theme', theme)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff')
  }, [theme])

  return (
    <main className="landing" aria-label="Chorus">
      <header className="landing-header">
        <ChorusLogo />
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <Sun className="sun-icon" size={19} strokeWidth={1.5} />
          <Moon className="moon-icon" size={19} strokeWidth={1.5} />
        </button>
      </header>

      <div className="globe-wrap">
        <GlobeCanvas />
      </div>
    </main>
  )
}

export default App
