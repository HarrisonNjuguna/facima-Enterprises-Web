import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FinanceCalculator } from '../components/FinanceCalculator'
import { CONTACT } from '../config/contact'
import { useCars } from '../context/CarContext'
import { formatKes, formatMileage } from '../utils/format'

export function CarDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getCarById } = useCars()
  const car = id ? getCarById(id) : undefined
  const [activeImage, setActiveImage] = useState(0)

  if (!car) {
    return (
      <h1 className="container section">
        Listing not found.{' '}
        <Link to="/inventory">Back to inventory</Link>
      </h1>
    )
  }

  const images = car.images.length ? car.images : ['/placeholder-car.svg']

  return (
    <article className="section container car-detail">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden> / </span>
        <Link to="/inventory">Inventory</Link>
        <span aria-hidden> / </span>
        <span>
          {car.year} {car.make} {car.model}
        </span>
      </nav>

      <div className="car-detail__gallery">
        <img
          src={images[activeImage]}
          alt={`${car.year} ${car.make} ${car.model} — photo ${activeImage + 1}`}
          className="car-detail__hero-img"
        />
        {images.length > 1 && (
          <div className="car-detail__thumbs">
            {images.map((src, i) => (
              <button
                key={src.slice(0, 32) + i}
                type="button"
                className={i === activeImage ? 'is-active' : undefined}
                onClick={() => setActiveImage(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="car-detail__summary">
        <p className="eyebrow">{car.location}</p>
        <h1>
          {car.year} {car.make} {car.model}
          {car.trim ? ` ${car.trim}` : ''}
        </h1>
        <p className="car-detail__price">{formatKes(car.price)}</p>
        <ul className="spec-chips">
          <li>{formatMileage(car.mileage)}</li>
          <li>{car.fuel}</li>
          <li>{car.transmission}</li>
          <li>{car.bodyType}</li>
          <li>{car.color}</li>
        </ul>
        <p>{car.description}</p>
        {car.features.length > 0 && (
          <>
            <h2>Equipment</h2>
            <ul className="feature-list">
              {car.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        )}
        <div className="car-detail__cta">
          <a href={`tel:${CONTACT.phoneTel}`} className="btn btn--primary">
            Book viewing
          </a>
          <Link to="/finance" state={{ price: car.price }} className="btn btn--secondary">
            Finance this car
          </Link>
        </div>
      </div>

      <section className="car-detail__finance">
        <FinanceCalculator initialPrice={car.price} compact />
      </section>
    </article>
  )
}