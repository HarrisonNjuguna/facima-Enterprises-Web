import { Link } from 'react-router-dom'
import { CarCard } from '../components/CarCard'
import { FinanceCalculator } from '../components/FinanceCalculator'
import { useCars } from '../context/CarContext'

export function HomePage() {
  const { cars } = useCars()
  const featured = cars.filter((c) => c.featured).slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden />
        <div className="container hero__content">
          <div className="hero__panel">
            <p className="eyebrow">Nairobi · Inspected stock · In-house finance</p>
            <h1>Find a car you trust — without the runaround.</h1>
            <p className="lead">
              Facima Motors lists every unit with yard photos, mileage disclosure, and
              optional finance from partner lenders. Inspired by transparent marketplaces
              like CarDuka, built for buyers who read the fine print.
            </p>
            <div className="hero__actions">
              <Link to="/inventory" className="btn btn--primary">
                Browse {cars.length} vehicles
              </Link>
              <Link to="/finance" className="btn btn--secondary">
                Estimate repayments
              </Link>
            </div>
            <dl className="hero__stats">
              <div>
                <dt>48h</dt>
                <dd>Typical finance pre-approval</dd>
              </div>
              <div>
                <dt>120+ point</dt>
                <dd>Yard inspection checklist</dd>
              </div>
              <div>
                <dt>Trade-in</dt>
                <dd>Same-day valuation slots</dd>
              </div>
            </dl>
          </div>
          <div className="hero__panel">
            <form
              className="hero-search"
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const q = String(data.get('q') ?? '')
                window.location.href = `/inventory?q=${encodeURIComponent(q)}`
              }}
            >
              <label>
                <span className="visually-hidden">Search stock</span>
                <input
                  name="q"
                  type="search"
                  placeholder="Try “Toyota Premio” or “4x4 diesel”"
                />
              </label>
              <button type="submit" className="btn btn--primary">
                Search inventory
              </button>
            </form>
            <p className="hero-search__note">
              Or call <a href="tel:+254712345678">+254 712 345 678</a> for a
              curated shortlist.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <header className="section__head">
          <h2>Featured this week</h2>
          <Link to="/inventory">View full stock →</Link>
        </header>
        <div className="car-grid">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="section section--cream">
        <div className="container split">
          <div>
            <h2>How buying works</h2>
            <ol className="steps">
              <li>
                <strong>Reserve online or visit the yard</strong> — we hold the unit for
                24 hours with a refundable deposit.
              </li>
              <li>
                <strong>Independent inspection welcome</strong> — lift the car, scan OBD,
                review import / logbook docs.
              </li>
              <li>
                <strong>Finance & NTSA transfer</strong> — we coordinate insurer quotes,
                loan signing, and number plate collection.
              </li>
            </ol>
          </div>
          <div className="trust-card">
            <h3>Why Facima?</h3>
            <ul>
              <li>Every listing shows real yard photography (no stock renders).</li>
              <li>Finance estimator with insurance and registration line items.</li>
              <li>Sell or trade-in channel with transparent valuation notes.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section container">
        <FinanceCalculator compact />
      </section>
    </>
  )
}
