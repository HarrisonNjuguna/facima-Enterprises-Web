import { Link } from 'react-router-dom'
import { BodyTypeBrowse } from '../components/BodyTypeBrowse'
import { CarCard } from '../components/CarCard'
import { FinanceTeaser } from '../components/FinanceTeaser'
import { FINANCE_DEPOSIT_RATE } from '../config/finance'
import { useCars } from '../context/CarContext'

export function HomePage() {
  const { cars } = useCars()
  const featured = cars.filter((c) => c.featured).slice(0, 6)
  const localUsed = cars.filter((c) => c.stockType === 'local').slice(0, 4)
  const foreignNew = cars
    .filter((c) => c.stockType === 'foreign' || c.stockType === 'new')
    .slice(0, 4)

  return (
    <div className="home-experience home-experience--light">
      <section className="hero hero--pro">
        <div className="container hero-pro">
          <div className="hero-pro__copy">
            <p className="eyebrow">Facima Motors · Nairobi</p>
            <h1>Find your next car the smart way.</h1>
            <p className="lead">
              Handpicked Kenyan used, foreign used, and brand new units — inspected,
              honestly priced, and ready for bank or microfinance from{' '}
              {Math.round(FINANCE_DEPOSIT_RATE.bank * 100)}% deposit.
            </p>
            <div className="hero__actions">
              <Link to="/inventory" className="btn btn--primary">
                Browse {cars.length} vehicles
              </Link>
              <a href="tel:+254712345678" className="btn btn--secondary">
                Call the yard
              </a>
            </div>
          </div>
          <dl className="stat-pills">
            <div>
              <dt>{cars.length}+</dt>
              <dd>Cars in stock</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>Inspected listings</dd>
            </div>
            <div>
              <dt>Same-day</dt>
              <dd>Finance estimates</dd>
            </div>
            <div>
              <dt>Free</dt>
              <dd>Pre-purchase advice</dd>
            </div>
          </dl>
        </div>
      </section>

      <BodyTypeBrowse />

      <section className="section container">
        <header className="section__head">
          <div>
            <h2>Featured vehicles</h2>
            <p className="muted section__sub">Verified mock photos until your yard shoot.</p>
          </div>
          <Link to="/inventory">View all →</Link>
        </header>
        <div className="car-grid">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="section section--muted container" id="local-used">
        <header className="section__head">
          <div>
            <h2>Kenyan used</h2>
            <p className="muted section__sub">
              Locally sourced and duty-paid units on Kenyan roads.
            </p>
          </div>
          <Link to="/inventory?stockType=local">See all local →</Link>
        </header>
        <div className="car-grid">
          {localUsed.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="section container" id="foreign-new">
        <header className="section__head">
          <div>
            <h2>Foreign used &amp; brand new</h2>
            <p className="muted section__sub">
              Imports and zero-mile showroom stock with finance options.
            </p>
          </div>
          <Link to="/inventory?stockType=foreign">Browse imports →</Link>
        </header>
        <div className="car-grid">
          {foreignNew.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="section section--muted container">
        <div className="value-grid">
          <div className="value-card">
            <h3>Inspected &amp; verified</h3>
            <p>Mechanical checks and logbook review before each listing goes live.</p>
          </div>
          <div className="value-card">
            <h3>Honest pricing</h3>
            <p>Fixed KES prices — no surprise yard fees on the units we advertise.</p>
          </div>
          <div className="value-card">
            <h3>Flexible finance</h3>
            <p>
              Bank from {Math.round(FINANCE_DEPOSIT_RATE.bank * 100)}% deposit · MFI from{' '}
              {Math.round(FINANCE_DEPOSIT_RATE.microfinance * 100)}%.
            </p>
          </div>
          <div className="value-card">
            <h3>Trade-in welcome</h3>
            <p>Fair valuations when you upgrade from your current car.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <FinanceTeaser />
      </section>

      <section className="section container home-exit home-exit--inline">
        <h2>Ready to visit the yard?</h2>
        <p className="muted">
          Chat on the phone, book a viewing, or sell your car the same week.
        </p>
        <div className="hero__actions">
          <Link to="/inventory" className="btn btn--primary">
            Open inventory
          </Link>
          <Link to="/sell" className="btn btn--secondary">
            Sell / trade-in
          </Link>
        </div>
      </section>
    </div>
  )
}