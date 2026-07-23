import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Menu,
  MessageSquareText,
  Moon,
  Play,
  Quote,
  Sparkles,
  Sun,
  Target,
  X,
  Zap,
} from 'lucide-react'
import ChorusLogo from './components/ChorusLogo'
import GlobeCanvas from './components/GlobeCanvas'

const insights = [
  { icon: MessageSquareText, value: '48k', label: 'conversations analyzed' },
  { icon: Target, value: '87%', label: 'forecast confidence' },
  { icon: Zap, value: '12h', label: 'saved per rep / month' },
]

const outcomes = [
  {
    number: '01',
    title: 'Know what moves buyers',
    copy: 'Surface the questions, objections, and moments that turn real conversations into repeatable wins.',
    stat: '+23%',
    statLabel: 'higher win rate',
  },
  {
    number: '02',
    title: 'Coach to the moments',
    copy: 'Give every manager the context to deliver focused coaching—without replaying an hour of every call.',
    stat: '5×',
    statLabel: 'faster call review',
  },
  {
    number: '03',
    title: 'Forecast with the truth',
    copy: 'Replace CRM guesswork with signals captured directly from every customer interaction.',
    stat: '91%',
    statLabel: 'forecast accuracy',
  },
]

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun size={17} className="sun-icon" />
      <Moon size={17} className="moon-icon" />
    </button>
  )
}

function DemoDialog({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const submit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="demo-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close icon-button" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>
        {submitted ? (
          <div className="success-state">
            <span className="success-icon"><Check size={22} /></span>
            <p className="eyebrow">You’re all set</p>
            <h2 id="demo-title">We’ll be in touch.</h2>
            <p>Thanks for reaching out. A Chorus specialist will contact you shortly.</p>
            <button className="button button-dark" type="button" onClick={onClose}>
              Back to Chorus
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">See Chorus in action</p>
            <h2 id="demo-title">Turn conversations into your advantage.</h2>
            <p>Tell us a little about yourself and we’ll tailor the demo to your team.</p>
            <form onSubmit={submit}>
              <label>
                Work email
                <input required type="email" placeholder="you@company.com" autoFocus />
              </label>
              <label>
                Company
                <input required type="text" placeholder="Company name" />
              </label>
              <button className="button button-accent form-submit" type="submit">
                Book my demo <ArrowRight size={17} />
              </button>
            </form>
            <small>By continuing, you agree to receive communications from Chorus.</small>
          </>
        )}
      </div>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('chorus-theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('chorus-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#0b0b0c' : '#f3f1eb',
    )
  }, [theme])

  const openDialog = () => {
    setDialogOpen(true)
    setMobileOpen(false)
  }

  return (
    <>
      <div className="site-shell" id="top">
        <header className="site-header">
          <ChorusLogo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#platform">Platform</a>
            <a href="#outcomes">Solutions</a>
            <a href="#customers">Customers</a>
            <a href="#resources">Resources</a>
          </nav>
          <div className="header-actions">
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            <button className="button button-small button-outline desktop-cta" onClick={openDialog}>
              Get a demo <ArrowRight size={15} />
            </button>
            <button
              className="icon-button menu-button"
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {mobileOpen && (
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <a href="#platform" onClick={() => setMobileOpen(false)}>Platform <ArrowRight size={16} /></a>
              <a href="#outcomes" onClick={() => setMobileOpen(false)}>Solutions <ArrowRight size={16} /></a>
              <a href="#customers" onClick={() => setMobileOpen(false)}>Customers <ArrowRight size={16} /></a>
              <a href="#resources" onClick={() => setMobileOpen(false)}>Resources <ArrowRight size={16} /></a>
              <button className="button button-accent" onClick={openDialog}>Get a demo</button>
            </nav>
          )}
        </header>

        <main>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-content">
              <p className="eyebrow"><Sparkles size={13} /> Revenue intelligence, in focus</p>
              <h1 id="hero-title">
                Turn every<br />
                conversation into <span className="accent-word">revenue.</span>
              </h1>
              <p className="hero-copy">
                Chorus captures and analyzes every customer interaction—so your team can win more,
                coach better, and forecast with confidence.
              </p>
              <div className="hero-actions">
                <button className="button button-accent" onClick={openDialog}>
                  Get a personalized demo <ArrowRight size={17} />
                </button>
                <a className="text-link" href="#platform">
                  <span className="play-icon"><Play size={12} fill="currentColor" /></span>
                  See how it works
                </a>
              </div>
            </div>

            <div className="globe-stage">
              <div className="globe-status status-top">
                <span className="status-pulse" />
                <span>LIVE SIGNAL</span>
                <strong>EMEA · 08:42</strong>
              </div>
              <GlobeCanvas />
              <div className="signal-card signal-card-main">
                <span className="signal-label"><BarChart3 size={14} /> MOMENTUM SIGNAL</span>
                <strong>Pricing conversation detected</strong>
                <div className="signal-bar"><span /></div>
                <div className="signal-meta"><span>Deal confidence</span><b>+18%</b></div>
              </div>
              <div className="globe-caption">
                <span>DRAG TO EXPLORE</span>
                <span>CONVERSATIONS · GLOBAL</span>
              </div>
            </div>

            <div className="hero-stats">
              {insights.map(({ icon: Icon, value, label }) => (
                <div className="hero-stat" key={label}>
                  <Icon size={16} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="trust-strip" id="customers" aria-label="Customer logos">
            <p>Trusted by teams who never stop listening</p>
            <div className="logo-row">
              <span>ADOBE</span>
              <span>DATADOG</span>
              <span>QUALTRICS</span>
              <span>ASANA</span>
              <span>DOORDASH</span>
              <span>ZENDESK</span>
            </div>
          </section>

          <section className="platform-section section-pad" id="platform">
            <div className="section-heading">
              <p className="eyebrow">One platform. Every conversation.</p>
              <h2>Your buyers are already telling you what comes next.</h2>
              <p>Chorus makes sure the whole revenue organization can hear it.</p>
            </div>

            <div className="insight-console">
              <div className="console-topbar">
                <div>
                  <span className="console-dot red" />
                  <span className="console-dot amber" />
                  <span className="console-dot green" />
                </div>
                <span>LIVE CALL · ACME / DISCOVERY</span>
                <span>24:18</span>
              </div>
              <div className="console-grid">
                <div className="transcript-panel">
                  <p className="panel-label">Live transcript</p>
                  <div className="transcript-line">
                    <span className="avatar buyer">KS</span>
                    <div><b>Kim · Buyer</b><p>We need to solve this before our next planning cycle.</p></div>
                    <time>23:42</time>
                  </div>
                  <div className="transcript-line active">
                    <span className="avatar rep">JL</span>
                    <div><b>Jamie · Chorus</b><p>What would a successful rollout look like across the team?</p></div>
                    <time>24:06</time>
                  </div>
                  <div className="waveform" aria-hidden="true">
                    {Array.from({ length: 46 }, (_, index) => (
                      <i key={index} style={{ '--height': `${18 + ((index * 17) % 54)}%` }} />
                    ))}
                  </div>
                </div>
                <aside className="intelligence-panel">
                  <div className="panel-heading">
                    <p className="panel-label">Chorus intelligence</p>
                    <span className="live-pill">Live</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-icon"><Target size={16} /></span>
                    <div><b>Decision criteria</b><p>Planning cycle · team rollout</p></div>
                    <Check size={16} />
                  </div>
                  <div className="insight-item">
                    <span className="insight-icon"><Zap size={16} /></span>
                    <div><b>Suggested follow-up</b><p>Ask about timeline and stakeholders</p></div>
                    <ArrowRight size={16} />
                  </div>
                  <div className="talk-ratio">
                    <div><span>Talk ratio</span><b>42 / 58</b></div>
                    <div className="ratio-bar"><span /><i /></div>
                    <small>Rep&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Buyer</small>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          <section className="outcomes-section section-pad" id="outcomes">
            <div className="outcomes-intro">
              <p className="eyebrow">From conversation to action</p>
              <h2>See the signal.<br />Move as one.</h2>
            </div>
            <div className="outcomes-list">
              {outcomes.map((outcome) => (
                <article className="outcome-row" key={outcome.number}>
                  <span className="outcome-number">{outcome.number}</span>
                  <div className="outcome-copy">
                    <h3>{outcome.title}</h3>
                    <p>{outcome.copy}</p>
                  </div>
                  <div className="outcome-stat">
                    <strong>{outcome.stat}</strong>
                    <span>{outcome.statLabel}</span>
                  </div>
                  <ArrowRight className="outcome-arrow" size={20} />
                </article>
              ))}
            </div>
          </section>

          <section className="testimonial-section section-pad" id="resources">
            <div className="testimonial-visual">
              <div className="sound-rings">
                <span />
                <span />
                <span />
                <Quote size={34} fill="currentColor" />
              </div>
              <div className="floating-tag tag-one">CUSTOMER SIGNAL</div>
              <div className="floating-tag tag-two">WIN THE MOMENT</div>
            </div>
            <blockquote>
              <p>“Chorus doesn’t just show us what happened. It shows our entire revenue team what to do next.”</p>
              <footer>
                <div className="quote-avatar">AM</div>
                <div><strong>Alex Morgan</strong><span>VP, Revenue Operations</span></div>
              </footer>
            </blockquote>
          </section>

          <section className="cta-section section-pad">
            <div className="cta-glow" />
            <p className="eyebrow">Your next best conversation starts here</p>
            <h2>Ready to hear what<br />you’ve been missing?</h2>
            <button className="button button-light" onClick={openDialog}>
              Get a personalized demo <ArrowRight size={17} />
            </button>
          </section>
        </main>

        <footer className="site-footer">
          <ChorusLogo />
          <div className="footer-links">
            <a href="#platform">Platform</a>
            <a href="#outcomes">Solutions</a>
            <a href="#customers">Customers</a>
            <a href="#resources">Resources</a>
          </div>
          <div className="footer-meta">
            <span>© 2026 Chorus.ai</span>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </footer>
      </div>
      <DemoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}

export default App
