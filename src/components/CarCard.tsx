import { Link } from 'react-router-dom'
import type { CarListing } from '../types/car'
import { STOCK_TYPE_LABEL } from '../types/car'
import { formatKes, formatMileage } from '../utils/format'

export function CarCard({ car }: { car: CarListing }) {
  const thumb = car.images[0] ?? '/placeholder-car.svg'
  const stockLabel = STOCK_TYPE_LABEL[car.stockType ?? 'local']

  return (
    <article className="car-card">
      <Link to={`/inventory/${car.id}`} className="car-card__media">
        <img src={thumb} alt={`${car.year} ${car.make} ${car.model}`} loading="lazy" />
        <span
          className={`car-card__badge car-card__badge--stock car-card__badge--${car.stockType ?? 'local'}`}
        >
          {stockLabel}
        </span>
        {car.featured && (
          <span className="car-card__badge car-card__badge--featured">Featured</span>
        )}
      </Link>
      <div className="car-card__body">
        <p className="car-card__meta">
          {car.year} · {formatMileage(car.mileage)} · {car.transmission} · {car.bodyType}
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