import { Link } from 'react-router-dom'
import type { CarListing } from '../types/car'
import { STOCK_TYPE_LABEL } from '../types/car'
import { formatKes, formatMileage } from '../utils/format'

export function CarCard({ car }: { car: CarListing }) {
  const thumb = car.images[0] ?? '/placeholder-car.svg'
  const stockLabel = STOCK_TYPE_LABEL[car.stockType ?? 'local']

  return (
    <article className="car-card car-card--market">
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
        <span className="car-card__price-tag">{formatKes(car.price)}</span>
      </Link>
      <div className="car-card__body">
        <div className="car-card__topline">
          <span className="car-card__body-label">{car.bodyType}</span>
          <span className="car-card__fuel">{car.fuel}</span>
        </div>
        <h3>
          <Link to={`/inventory/${car.id}`}>
            {car.year} {car.make} {car.model}
            {car.trim ? ` ${car.trim}` : ''}
          </Link>
        </h3>
        <ul className="car-card__specs">
          <li>{formatMileage(car.mileage)}</li>
          <li>{car.transmission}</li>
          <li>{car.color}</li>
        </ul>
        <p className="car-card__location">{car.location}</p>
        <div className="car-card__footer">
          {car.financeEligible && (
            <span className="car-card__finance">Finance available</span>
          )}
          <Link to={`/inventory/${car.id}`} className="btn btn--primary btn--sm car-card__cta">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}