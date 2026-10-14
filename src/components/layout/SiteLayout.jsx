import { useEffect, useState } from 'react'
import gykLogo from '../../assets/gyk-logo-transparent.png'
import vulcanLogo from '../../assets/vulcan-logo-white.png'
import { VULCAN_URL } from '../../data/siteContent'

const navItems = [
  { label: 'Hem', href: '/' },
  { label: 'Våra butiker', href: '/butiker' },
  { label: 'Event & fyrverkerishower', href: '/event' },
  { label: 'Om GYK', href: '/om-gyk' },
  { label: 'Kontakt', href: '/kontakt' },
]

export function Header({ path }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = path === '/'
  const [scrolled, setScrolled] = useState(!isHome || window.scrollY > 24)

  useEffect(() => {
    const onScroll = () => setScrolled(!isHome || window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="wordmark" href="/" aria-label="GYK Fireworks, startsida">
        <img className="brand-logo" src={gykLogo} alt="GYK Fireworks" />
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span />
      </button>
      <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Huvudmeny">
        {navItems.map((item) => {
          const isCurrentPage = path === item.href
          const isActive = isCurrentPage || (item.href !== '/' && path.startsWith(`${item.href}/`))
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isCurrentPage ? 'page' : isActive ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          )
        })}
        <a className="button button-gold nav-cta" href="/butiker" onClick={() => setMenuOpen(false)}>
          Hitta butik & beställ
        </a>
      </nav>
      <a className="header-partner" href={VULCAN_URL} target="_blank" rel="noreferrer" aria-label="Besök Vulcan Europe">
        <img className="header-partner-logo" src={vulcanLogo} alt="Vulcan" />
      </a>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-brand">
          <a className="wordmark" href="/" aria-label="GYK Fireworks, startsida">
            <img className="brand-logo brand-logo-footer" src={gykLogo} alt="GYK Fireworks" />
          </a>
          <p>Sveriges största återförsäljare för Vulcan Europe. Hitta din butik eller berätta om ditt nästa firande.</p>
        </div>
        <div className="footer-links">
          <h2>Utforska</h2>
          <a href="/butiker">Våra butiker</a>
          <a href="/event">Event & fyrverkerishower</a>
          <a href="/om-gyk">Om GYK</a>
          <a href="/kontakt">Kontakt</a>
        </div>
        <div className="footer-links">
          <h2>Vulcan Europe</h2>
          <p>Sortiment och beställning hanteras hos Vulcan.</p>
          <a className="partner-logo-link" href={VULCAN_URL} target="_blank" rel="noreferrer" aria-label="Besök Vulcan Europe">
            <img className="partner-logo" src={vulcanLogo} alt="Vulcan" />
          </a>
          <a className="footer-external" href={VULCAN_URL} target="_blank" rel="noreferrer">Besök Vulcan Europe <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} GYK Fireworks</span>
        <a href="/integritet">Integritetsinformation</a>
        <span className="footer-location">Sverige</span>
      </div>
    </footer>
  )
}