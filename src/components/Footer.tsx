import { Link } from 'react-router-dom'
import { CONTACT, whatsappHref } from '../config/contact'
import { PadlockAdminLink } from './PadlockAdminLink'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid container">
        <div>
          <p className="footer-brand">{CONTACT.businessName}</p>
          <p className="footer-muted">{CONTACT.address}</p>
          <p className="footer-muted">{CONTACT.hours}</p>
        </div>
        <div>
          <p className="footer-heading">Browse</p>
          <ul className="footer-links">
            <li>
              <Link to="/inventory">All stock</Link>
            </li>
            <li>
              <Link to="/finance">Finance calculator</Link>
            </li>
            <li>
              <Link to="/finance/terms">Finance terms</Link>
            </li>
            <li>
              <Link to="/sell">Sell / trade-in</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Get in touch</p>
          <ul className="footer-links">
            <li>
              <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noreferrer">
                Chat with us on WhatsApp
              </a>
            </li>
            <li>
              <Link to="/#contact">Directions &amp; hours</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__bar container">
        <p>
          © {new Date().getFullYear()} {CONTACT.businessName}. Prices in KES unless stated.
        </p>
        <PadlockAdminLink />
      </div>
    </footer>
  )
}