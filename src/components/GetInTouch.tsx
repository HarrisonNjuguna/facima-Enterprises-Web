import { CONTACT, whatsappHref } from '../config/contact'

interface GetInTouchProps {
  compact?: boolean
}

export function GetInTouch({ compact = false }: GetInTouchProps) {
  return (
    <section
      className={compact ? 'get-in-touch get-in-touch--compact' : 'get-in-touch band band--dark'}
      id="contact"
    >
      <div className="container">
        <header className="get-in-touch__head">
          <h2>Get in touch</h2>
          {!compact && (
            <p className="section__sub get-in-touch__intro">
              Visit the yard or message us — we respond the same day during opening hours.
            </p>
          )}
        </header>
        <ul className="get-in-touch__list">
          <li>
            <span className="get-in-touch__label">Location</span>
            <p>{CONTACT.address}</p>
          </li>
          <li>
            <span className="get-in-touch__label">Phone</span>
            <p>
              <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
              <span className="get-in-touch__sep"> · </span>
              <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneLocal}</a>
            </p>
          </li>
          <li>
            <span className="get-in-touch__label">Email</span>
            <p>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </li>
          <li>
            <span className="get-in-touch__label">Hours</span>
            <p>{CONTACT.hours}</p>
          </li>
        </ul>
        <div className="get-in-touch__actions">
          <a
            href={whatsappHref()}
            className="btn btn--whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            Chat with us here
          </a>
          <a href={`tel:${CONTACT.phoneTel}`} className="btn btn--secondary">
            Call {CONTACT.phoneLocal}
          </a>
        </div>
      </div>
    </section>
  )
}