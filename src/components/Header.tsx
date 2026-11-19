import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CONTACT } from '../config/contact'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__bar container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden>
            FM
          </span>
          <span className="brand__text">
            Facima <em>Enterprises</em>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <nav id="primary-nav" className={open ? 'primary-nav is-open' : 'primary-nav'}>
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/inventory" onClick={() => setOpen(false)}>
            Inventory
          </NavLink>
          <NavLink to="/finance" onClick={() => setOpen(false)}>
            Finance
          </NavLink>
          <NavLink to="/finance/terms" className="nav-link--minor" onClick={() => setOpen(false)}>
            Terms
          </NavLink>
          <NavLink to="/sell" onClick={() => setOpen(false)}>
            Sell your car
          </NavLink>
          <a href={`tel:${CONTACT.phoneTel}`} className="header-cta" onClick={() => setOpen(false)}>
            {CONTACT.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  )
}