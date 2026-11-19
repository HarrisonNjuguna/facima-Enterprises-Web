import { Link } from 'react-router-dom'
import { BodyTypeBrowse } from '../components/BodyTypeBrowse'
import { CarCard } from '../components/CarCard'
import { FinanceTeaser } from '../components/FinanceTeaser'
import { GetInTouch } from '../components/GetInTouch'
import { Testimonials } from '../components/Testimonials'
import { CONTACT } from '../config/contact'
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
    <div className="home-experience home-karuri">
      <section className="hero-glass" aria-label="Welcome">
        <div
          className="hero-glass__photo"
          style={{ backgroundImage: `url(${CONTACT.heroImage})` }}
          aria-hidden
        />
        <div className="hero-glass__scrim" aria-hidden />
        <div className="container hero-glass__layout">
          <div className="glass-panel hero-glass__copy">
            <p className="eyebrow">{CONTACT.businessName} · Ridgeways</p>
            <h1>Find your next car the smart way.</h1>
            <p className="lead">
              Handpicked brand new, foreign and Kenyan used vehicles. Browse online,
              chat on WhatsApp, drive home with confidence.
            </p>
            <div className="hero__actions">
              <Link to="/inventory" className="btn btn--primary">
                Browse {cars.length} vehicles
              </Link>
              <a href="#contact" className="btn btn--secondary">
                Get in touch
              </a>
            </div>
          </div>
          <dl className="glass-panel stat-pills stat-pills--glass">
            <div>
              <dt>{cars.length}+</dt>
              <dd>Cars in stock</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>Inspected &amp; verified</dd>
            </div>
            <div>
              <dt>Same-day</dt>
              <dd>WhatsApp response</dd>
            </div>
            <div>
              <dt>Free</dt>
              <dd>Pre-purchase advice</dd>
            </div>
          </dl>
        </div>
      </section>

      <BodyTypeBrowse />

      <section className="band band--white">
        <div className="container section-inner">
          <header className="section__head">
            <div>
              <h2>Featured vehicles</h2>
              <p className="muted section__sub">Our top picks this week at the yard.</p>
            </div>
            <Link to="/inventory" className="section__link">
              View all →
            </Link>
          </header>
          <div className="car-grid">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band--soft" id="local-used">
        <div className="container section-inner">
          <header className="section__head">
            <div>
              <h2>Kenyan used</h2>
              <p className="muted section__sub">
                Locally sourced, duty-paid units already on Kenyan roads.
              </p>
            </div>
            <Link to="/inventory?stockType=local" className="section__link">
              See all →
            </Link>
          </header>
          <div className="car-grid">
            {localUsed.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band--white" id="foreign-new">
        <div className="container section-inner">
          <header className="section__head">
            <div>
              <h2>Foreign used &amp; brand new</h2>
              <p className="muted section__sub">Imports and showroom-fresh stock.</p>
            </div>
            <Link to="/inventory?stockType=foreign" className="section__link">
              Browse imports →
            </Link>
          </header>
          <div className="car-grid">
            {foreignNew.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band--soft">
        <div className="container section-inner">
          <header className="section__head section__head--stacked">
            <h2>Buying a car shouldn&apos;t be a gamble.</h2>
            <p className="muted section__sub section__sub--wide">
              Transparent pricing, verified logbooks, and finance from{' '}
              {Math.round(FINANCE_DEPOSIT_RATE.bank * 100)}% bank deposit or{' '}
              {Math.round(FINANCE_DEPOSIT_RATE.microfinance * 100)}% microfinance.
            </p>
          </header>
          <div className="value-grid">
            <div className="value-card">
              <h3>Inspected &amp; verified</h3>
              <p>Mechanical checks and logbook review before listing.</p>
            </div>
            <div className="value-card">
              <h3>Honest, fixed pricing</h3>
              <p>What you see is what you negotiate at the yard.</p>
            </div>
            <div className="value-card">
              <h3>Flexible financing</h3>
              <p>Banks and SACCO partners from a low deposit.</p>
            </div>
            <div className="value-card">
              <h3>Trade-in welcome</h3>
              <p>Fair on-the-spot valuations when you upgrade.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--white">
        <div className="container section-inner">
          <FinanceTeaser />
        </div>
      </section>

      <Testimonials />

      <GetInTouch />
    </div>
  )
}