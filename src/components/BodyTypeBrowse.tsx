import { Link } from 'react-router-dom'
import type { BodyType } from '../types/car'

const TYPES: { type: BodyType; label: string }[] = [
  { type: 'SUV', label: 'SUV' },
  { type: 'Sedan', label: 'Sedan' },
  { type: 'Hatchback', label: 'Hatchback' },
  { type: 'Pickup', label: 'Pickup' },
  { type: 'Van', label: 'Van' },
  { type: 'Wagon', label: 'Wagon' },
]

export function BodyTypeBrowse() {
  return (
    <section className="section section--muted container">
      <header className="section__head section__head--stacked">
        <div>
          <h2>Browse by body type</h2>
          <p className="muted section__sub">Pick the shape that fits your life.</p>
        </div>
      </header>
      <div className="body-type-grid">
        {TYPES.map(({ type, label }) => (
          <Link
            key={type}
            to={`/inventory?bodyType=${encodeURIComponent(type)}`}
            className="body-type-chip"
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  )
}