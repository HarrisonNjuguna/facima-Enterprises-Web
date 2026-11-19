import { Link } from 'react-router-dom'
import { PadlockAdminLink } from './PadlockAdminLink'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid container">
        <div>
          <p className="footer-brand">Facima Motors</p>
          <p className="muted">
            Yard 14, Dunga Road Industrial Park, Nairobi. Open Mon–Sat 8:30–18:00.
          </p>
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
              <Link to="/finance/terms">Finance terms (Co-op / NCBA)</Link>
            </li>
            <li>
              <Link to="/sell">Sell / trade-in</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Contact</p>
          <ul className="footer-links">
            <li>
              <a href="mailto:hello@facimamotors.co.ke">hello@facimamotors.co.ke</a>
            </li>
            <li>
              <a href="tel:+254712345678">+254 712 345 678</a>
            </li>
            <li>Whistle-blow & feedback desk on request</li>
          </ul>
        </div>
      </div>
      <div className="site-footer__bar container">
        <p>© {new Date().getFullYear()} Facima Motors Ltd. Prices in KES unless stated.</p>
        <PadlockAdminLink />
      </div>
    </footer>
  )
}