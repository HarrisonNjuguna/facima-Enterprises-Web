import '../../styles/drivex-home.css'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CONTACT } from '../../config/contact'

export function DriveXHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="drivex-chrome">
      <div className="drivex-topbar">
        <div className="container drivex-topbar__inner">
          <ul>
            <li>{CONTACT.address}</li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
            </li>
          </ul>
          <span className="drivex-topbar__support">24/7 Customer Support</span>
        </div>
      </div>
      <div className="drivex-nav">
        <div className="container drivex-nav__inner">
          <Link to="/" className="drivex-brand" onClick={() => setOpen(false)}>
            <span className="drivex-brand__icon" aria-hidden>
              🚗
            </span>
            Facima
          </Link>
          <button
            type="button"
            className="drivex-nav-toggle"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
          <nav className={open ? 'drivex-menu is-open' : 'drivex-menu'}>
            <NavLink to="/" end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/inventory" onClick={() => setOpen(false)}>
              Browse cars
            </NavLink>
            <NavLink to="/finance" onClick={() => setOpen(false)}>
              Finance
            </NavLink>
            <a href="/#top-deals" onClick={() => setOpen(false)}>
              Deals
            </a>
            <NavLink to="/sell" onClick={() => setOpen(false)}>
              Sell / trade-in
            </NavLink>
            <a href="/#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </nav>
          <div className="drivex-nav__actions">
            <Link to="/finance" className="drivex-nav__signin" onClick={() => setOpen(false)}>
              Finance desk
            </Link>
            <Link to="/inventory" className="btn-dx" onClick={() => setOpen(false)}>
              My shortlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}