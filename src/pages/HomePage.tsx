import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CarCard } from '../components/CarCard'
import { FinanceCalculator } from '../components/FinanceCalculator'
import { FINANCE_DEPOSIT_RATE } from '../config/finance'
import { MOCK_CAR_IMAGES } from '../data/mockImages'
import { useCars } from '../context/CarContext'
import { formatKes } from '../utils/format'

export function HomePage() {
  const { cars } = useCars()
  const featured = cars.filter((c) => c.featured).slice(0, 4)
  const [showExitCta, setShowExitCta] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('home-scroll-active')
    const onScroll = () => {
      setShowExitCta(window.scrollY > window.innerHeight * 1.2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      document.documentElement.classList.remove('home-scroll-active')
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="home-experience">
      <a href="#featured" className="scroll-hint" aria-label="Scroll to explore">
        <span>Explore the showroom</span>
        <span className="scroll-hint__icon" aria-hidden>
          ↓
        </span>
      </a>

      <section className="home-panel hero hero--showcase">
        <div
          className="hero__bg hero__bg--mock"
          style={{ backgroundImage: `url(${MOCK_CAR_IMAGES.showroom})` }}
          aria-hidden
        />
        <div className="container hero__content">
          <div className="hero__panel">
            <p className="eyebrow">Showroom preview · Red &amp; black edition</p>
            <h1>Drive home the story before you open the catalogue.</h1>
            <p className="lead">
              Stay on this page to compare finance paths, inspect mock yard shots, and
              run real numbers. When you are ready, full inventory is one click away.
            </p>
            <div className="hero__actions">
              <a href="#finance-paths" className="btn btn--primary">
                Compare finance deposits
              </a>
              <a href="#calculator" className="btn btn--secondary">
                Monthly payment estimate
              </a>
            </div>
            <p className="mock-label">All vehicle photos on this preview use Facima mock imagery.</p>
          </div>
          <div className="hero__panel hero__panel--card">
            <h2 className="hero-card__title">Quick stock glance</h2>
            <ul className="hero-glance">
              {featured.slice(0, 3).map((car) => (
                <li key={car.id}>
                  <img src={car.images[0]} alt="" />
                  <div>
                    <strong>
                      {car.year} {car.make} {car.model}
                    </strong>
                    <span>{formatKes(car.price)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="hero-search__note">
              Scroll for finance terms, then{' '}
              <Link to="/inventory">view all {cars.length} listings</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="home-panel section--inset" id="finance-paths">
        <div className="container">
          <header className="section__head">
            <h2>Two finance doors — one yard</h2>
            <Link to="/finance/terms">Full terms &amp; bank steps →</Link>
          </header>
          <div className="finance-path-grid">
            <div className="finance-path finance-path--bank">
              <p className="finance-path__badge">Bank partner route</p>
              <p className="finance-path__deposit">
                From {Math.round(FINANCE_DEPOSIT_RATE.bank * 100)}% deposit
              </p>
              <p>
                Co-op, NCBA, and similar lenders may finance up to 80–90% of value.
                Facima&apos;s floor minimum is{' '}
                <strong>10%</strong> cash or trade-in top-up on approved profiles.
              </p>
              <a href="#calculator" className="btn btn--primary btn--sm">
                Estimate with 10% deposit
              </a>
            </div>
            <div className="finance-path finance-path--mfi">
              <p className="finance-path__badge">Microfinance / SACCO</p>
              <p className="finance-path__deposit">
                {Math.round(FINANCE_DEPOSIT_RATE.microfinance * 100)}% deposit
              </p>
              <p>
                Faster files for SMEs and informal income. Expect{' '}
                <strong>30%</strong> upfront before disbursement — ideal when you want
                speed over the lowest rate.
              </p>
              <Link to="/finance" className="btn btn--secondary btn--sm">
                Open full calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-panel section container" id="featured">
        <header className="section__head">
          <h2>Featured mock listings</h2>
          <span className="mock-label">Preview imagery only</span>
        </header>
        <div className="showcase-strip">
          <img src={MOCK_CAR_IMAGES.suvRed} alt="" className="showcase-strip__wide" />
          <img src={MOCK_CAR_IMAGES.luxuryBlack} alt="" />
          <img src={MOCK_CAR_IMAGES.pickupWhite} alt="" />
        </div>
        <div className="car-grid">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="home-panel section section--dark">
        <div className="container split">
          <div>
            <h2>Yard process</h2>
            <ol className="steps">
              <li>
                <strong>Walk the floor</strong> — every car on this site is photo-ready;
                live units mirror these mock angles until your shoot day.
              </li>
              <li>
                <strong>Pick bank or MFI path</strong> — deposits at 10% or 30% set how
                much you finance.
              </li>
              <li>
                <strong>Drive out</strong> — insurance, NTSA, and logbook handled with
                partner checklists (see finance terms).
              </li>
            </ol>
          </div>
          <div className="trust-card trust-card--red">
            <h3>Partners we mirror</h3>
            <ul>
              <li>Co-operative Bank asset finance (up to 80% bank financing)</li>
              <li>NCBA online asset finance workflow</li>
              <li>Microfinance &amp; SACCO channels at 30% deposit standard</li>
            </ul>
            <Link to="/finance/terms" className="btn btn--primary btn--sm">
              Read application instructions
            </Link>
          </div>
        </div>
      </section>

      <section className="home-panel section container" id="calculator">
        <FinanceCalculator compact showTermsLink />
      </section>

      <section className="home-panel section section--cta">
        <div className="container home-exit">
          <h2>Ready to leave the showroom?</h2>
          <p>
            You have seen deposits, mock stock, and repayment estimates. Continue to
            inventory, sell/trade-in, or speak to the desk.
          </p>
          <div className="hero__actions">
            <Link to="/inventory" className="btn btn--primary">
              Open full inventory
            </Link>
            <Link to="/sell" className="btn btn--secondary">
              Sell or trade-in
            </Link>
            <a href="tel:+254712345678" className="btn btn--ghost">
              Call the yard
            </a>
          </div>
        </div>
      </section>

      {showExitCta && (
        <aside className="home-floating-cta">
          <span>Finished browsing the home experience?</span>
          <Link to="/inventory" className="btn btn--primary btn--sm">
            Go to inventory
          </Link>
        </aside>
      )}
    </div>
  )
}