import { Link } from 'react-router-dom'
import { CONTACT, whatsappHref } from '../../config/contact'
import { PadlockAdminLink } from '../PadlockAdminLink'

export function DriveXFooter() {
  return (
    <footer className="drivex-footer" id="contact">
      <div className="container drivex-footer__grid">
        <div>
          <Link to="/" className="drivex-brand">
            <span className="drivex-brand__icon" aria-hidden>
              🚗
            </span>
            Facima
          </Link>
          <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.55 }}>
            Kenya&apos;s smart way to buy quality cars — Kenyan used, imports, and brand
            new stock at Astrol Ridgeways.
          </p>
          <p style={{ marginTop: '1rem', fontWeight: 600, color: '#fff' }}>WE ACCEPT</p>
          <div className="drivex-footer__pay">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>M-Pesa</span>
            <span>Bank transfer</span>
          </div>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/finance">Finance</Link>
            </li>
            <li>
              <Link to="/sell">Sell your car</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Our services</h3>
          <ul>
            <li>
              <Link to="/inventory?stockType=local">Kenyan used</Link>
            </li>
            <li>
              <Link to="/inventory?stockType=foreign">Foreign used</Link>
            </li>
            <li>
              <Link to="/inventory?stockType=new">Brand new</Link>
            </li>
            <li>
              <Link to="/finance/terms">Finance terms</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Contact us</h3>
          <ul>
            <li>{CONTACT.address}</li>
            <li>
              <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>{CONTACT.hours}</li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noreferrer">
                Chat with us here
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container drivex-footer__bar">
        <span>
          © {new Date().getFullYear()} {CONTACT.businessName}. Privacy · Terms
        </span>
        <PadlockAdminLink />
      </div>
    </footer>
  )
}