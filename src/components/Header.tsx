import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

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
            Facima <em>Motors</em>
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
          <a href="tel:+254712345678" className="header-cta" onClick={() => setOpen(false)}>
            +254 712 345 678
          </a>
        </nav>
      </div>
    </header>
  )
}