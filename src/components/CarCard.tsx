import { Link } from 'react-router-dom'
import type { CarListing } from '../types/car'
import { formatKes, formatMileage } from '../utils/format'

export function CarCard({ car }: { car: CarListing }) {
  const thumb = car.images[0] ?? '/placeholder-car.svg'

  return (
    <article className="car-card">
      <Link to={`/inventory/${car.id}`} className="car-card__media">
        <img src={thumb} alt={`${car.year} ${car.make} ${car.model}`} loading="lazy" />
        {car.featured && <span className="car-card__badge">Featured</span>}
        {car.financeEligible && (
          <span className="car-card__badge car-card__badge--finance">
            Finance OK
          </span>
        )}
      </Link>
      <div className="car-card__body">
        <p className="car-card__meta">
          {car.year} · {car.mileage ? formatMileage(car.mileage) : '—'} ·{' '}
          {car.transmission}
        </p>
        <h3>
          <Link to={`/inventory/${car.id}`}>
            {car.make} {car.model}
            {car.trim ? ` ${car.trim}` : ''}
          </Link>
        </h3>
        <p className="car-card__location">{car.location}</p>
        <div className="car-card__footer">
          <strong className="car-card__price">{formatKes(car.price)}</strong>
          <Link to={`/inventory/${car.id}`} className="car-card__link">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}