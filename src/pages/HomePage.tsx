import { Link } from 'react-router-dom'
import { DriveXHeroSearch } from '../components/drivex/DriveXHeroSearch'
import { CONTACT, whatsappHref } from '../config/contact'
import { MOCK_CAR_IMAGES } from '../data/mockImages'
import { useCars } from '../context/CarContext'
import { formatKes } from '../utils/format'
import '../styles/drivex-home.css'

const CATEGORIES = [
  { label: 'SUV', body: 'SUV', img: MOCK_CAR_IMAGES.suvRed },
  { label: 'Sedans', body: 'Sedan', img: MOCK_CAR_IMAGES.sedanSilver },
  { label: 'Hatchback', body: 'Hatchback', img: MOCK_CAR_IMAGES.hatchWhite },
  { label: 'Pickup', body: 'Pickup', img: MOCK_CAR_IMAGES.pickupWhite },
  { label: 'Luxury', body: 'Sedan', img: MOCK_CAR_IMAGES.luxuryBlack },
] as const

const STEPS = [
  { n: '1', title: 'Search', text: 'Filter stock by type, budget, and location.' },
  { n: '2', title: 'Book', text: 'Reserve or book a yard viewing on WhatsApp.' },
  { n: '3', title: 'Inspect', text: 'Independent inspection welcome at Ridgeways.' },
  { n: '4', title: 'Finance', text: 'Bank or MFI paperwork with our desk.' },
  { n: '5', title: 'Drive home', text: 'NTSA transfer and insurance coordination.' },
]

const REVIEWS = [
  {
    initial: 'W',
    name: 'Wanjiru K.',
    quote: 'Super transparent process — the car matched the listing perfectly.',
  },
  {
    initial: 'B',
    name: 'Brian O.',
    quote: 'Best price on Kiambu Road and they helped sort financing.',
  },
  {
    initial: 'A',
    name: 'Aisha M.',
    quote: 'Traded in my old car the same week. Zero pressure.',
  },
]

export function HomePage() {
  const { cars } = useCars()
  const featured = cars.filter((c) => c.featured).slice(0, 5)
  const heroBg = '/mock/drivex-hero.jpg'

  function minPriceForBody(body: string) {
    const list = cars.filter((c) => c.bodyType === body)
    if (!list.length) return null
    return Math.min(...list.map((c) => c.price))
  }

  return (
    <div className="drivex-page">
      <section className="drivex-hero">
        <div
          className="drivex-hero__bg"
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-hidden
        />
        <div className="drivex-hero__shade" aria-hidden />
        <div className="container drivex-hero__content">
          <h1>
            Drive your journey, <em>your way.</em>
          </h1>
          <p className="drivex-hero__lead">
            {CONTACT.businessName} — handpicked Kenyan used, foreign &amp; brand new
            vehicles. Browse online, chat on WhatsApp, drive home with confidence.
          </p>
        </div>
      </section>

      <div className="drivex-search-dock container">
        <DriveXHeroSearch />
      </div>

      <section className="drivex-section drivex-section--grey">
        <div className="container">
          <header className="drivex-section__title">
            <h2>Choose your ride</h2>
            <p>Pick a category to browse verified stock.</p>
          </header>
          <div className="drivex-categories">
            {CATEGORIES.map((cat) => {
              const from = minPriceForBody(cat.body)
              return (
                <Link
                  key={cat.label}
                  to={`/inventory?bodyType=${encodeURIComponent(cat.body)}`}
                  className="drivex-cat"
                >
                  <img src={cat.img} alt="" />
                  <strong>{cat.label}</strong>
                  <span>{from ? `From ${formatKes(from)}` : 'View stock'}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="drivex-section">
        <div className="container">
          <div className="drivex-promos">
            <Link to="/inventory?stockType=foreign" className="drivex-promo drivex-promo--yellow">
              <div className="drivex-promo__copy">
                <h3>Import special</h3>
                <p>Fresh foreign used units — finance from 10% deposit.</p>
                <span className="btn-dx" style={{ display: 'inline-block', width: 'auto' }}>
                  Shop imports
                </span>
              </div>
              <img src={MOCK_CAR_IMAGES.suvRed} alt="" className="drivex-promo__img" />
            </Link>
            <Link to="/sell" className="drivex-promo drivex-promo--dark">
              <div className="drivex-promo__copy">
                <h3>Trade-in welcome</h3>
                <p>Send photos on WhatsApp — fair valuation on the spot.</p>
                <span className="btn-dx" style={{ display: 'inline-block', width: 'auto' }}>
                  Value my car
                </span>
              </div>
              <img src={MOCK_CAR_IMAGES.sedanBlack} alt="" className="drivex-promo__img" />
            </Link>
          </div>
        </div>
      </section>

      <section className="drivex-section drivex-section--grey" id="top-deals">
        <div className="container">
          <header className="drivex-section__title">
            <h2>Top deals</h2>
            <p>Featured vehicles at Facima Ridgeways.</p>
          </header>
          <div className="drivex-deals">
            {featured.map((car, i) => (
              <Link key={car.id} to={`/inventory/${car.id}`} className="drivex-deal">
                <div className="drivex-deal__media">
                  <img src={car.images[0]} alt="" />
                  {i < 3 && <span className="drivex-deal__off">HOT</span>}
                </div>
                <div className="drivex-deal__body">
                  <h3>
                    {car.year} {car.make} {car.model}
                  </h3>
                  <p className="drivex-deal__price">{formatKes(car.price)}</p>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/inventory" className="btn-dx">
              View all {cars.length} cars
            </Link>
          </p>
        </div>
      </section>

      <section className="drivex-section">
        <div className="container">
          <header className="drivex-section__title">
            <h2>How it works</h2>
            <p>Five simple steps from search to keys.</p>
          </header>
          <div className="drivex-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="drivex-step">
                <div className="drivex-step__icon">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="drivex-section drivex-section--grey">
        <div className="container">
          <header className="drivex-section__title">
            <h2>What our customers say</h2>
          </header>
          <div className="drivex-reviews">
            {REVIEWS.map((r) => (
              <blockquote key={r.name} className="drivex-review">
                <div className="drivex-review__avatar">{r.initial}</div>
                <p className="drivex-review__stars">★★★★★</p>
                <p>&ldquo;{r.quote}&rdquo;</p>
                <footer>
                  <strong>{r.name}</strong>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="drivex-section">
        <div className="container drivex-app-row">
          <div className="drivex-app-card">
            <h2>Install the Facima app</h2>
            <p>
              Save Facima to your home screen — browse stock, estimate finance, and
              message us on WhatsApp anytime.
            </p>
            <div className="drivex-app-badges">
              <span>Add to Home Screen</span>
              <a href={whatsappHref()} target="_blank" rel="noreferrer" className="btn-dx">
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="drivex-phone-mock" aria-hidden>
            Facima
            <br />
            {cars.length} cars live
          </div>
        </div>
      </section>
    </div>
  )
}