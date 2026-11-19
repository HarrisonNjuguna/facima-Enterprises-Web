import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ImageUploader } from '../components/ImageUploader'
import { useAuth } from '../context/AuthContext'
import { useCars } from '../context/CarContext'
import type {
  BodyType,
  CarListing,
  FuelType,
  Transmission,
} from '../types/car'
import { formatKes } from '../utils/format'

const emptyForm = (): Omit<CarListing, 'id' | 'createdAt'> => ({
  make: '',
  model: '',
  trim: '',
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  fuel: 'Petrol',
  transmission: 'Automatic',
  bodyType: 'Sedan',
  color: '',
  location: 'Nairobi',
  description: '',
  features: [],
  images: [],
  featured: false,
  financeEligible: true,
})

export function AdminDashboardPage() {
  const { isAdmin, logout } = useAuth()
  const { cars, addCar, removeCar, resetToSeed } = useCars()
  const [form, setForm] = useState(emptyForm)
  const [featureText, setFeatureText] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  if (!isAdmin) {
    return <Navigate to="/gate" replace />
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.make.trim() || !form.model.trim()) {
      setMessage('Make and model are required.')
      return
    }
    if (!form.images.length) {
      setMessage('Add at least one photo.')
      return
    }
    const features = featureText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    addCar({ ...form, features })
    setForm(emptyForm())
    setFeatureText('')
    setMessage('Listing published to the public site.')
  }

  return (
    <section className="section container admin-dash">
      <header className="admin-dash__head">
        <div>
          <h1>Inventory dashboard</h1>
          <p className="muted">Upload yard photos and publish listings instantly.</p>
        </div>
        <div className="admin-dash__actions">
          <button type="button" className="btn btn--ghost" onClick={() => logout()}>
            Sign out
          </button>
          <Link to="/" className="btn btn--secondary">
            View website
          </Link>
        </div>
      </header>

      {message && <p className="admin-dash__toast">{message}</p>}

      <div className="admin-dash__grid">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Add vehicle</h2>
          <AdminFormFields
            form={form}
            setForm={setForm}
            featureText={featureText}
            setFeatureText={setFeatureText}
          />
          <button type="submit" className="btn btn--primary">
            Publish listing
          </button>
        </form>

        <aside className="admin-list">
          <div className="admin-list__head">
            <h2>Live stock ({cars.length})</h2>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                if (confirm('Restore demo seed data? This replaces current listings.')) {
                  resetToSeed()
                }
              }}
            >
              Restore demo data
            </button>
          </div>
          <ul>
            {cars.map((car) => (
              <li key={car.id}>
                <img src={car.images[0]} alt="" />
                <div className="admin-list__meta">
                  <strong>
                    {car.year} {car.make} {car.model}
                  </strong>
                  <span>{formatKes(car.price)}</span>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => {
                      if (confirm('Remove this listing from the website?')) {
                        removeCar(car.id)
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

function AdminFormFields({
  form,
  setForm,
  featureText,
  setFeatureText,
}: {
  form: Omit<CarListing, 'id' | 'createdAt'>
  setForm: Dispatch<SetStateAction<Omit<CarListing, 'id' | 'createdAt'>>>
  featureText: string
  setFeatureText: (v: string) => void
}) {
  return (
    <>
      <div className="admin-form__grid">
        <label className="field">
          <span>Make</span>
          <input
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
            required
          />
        </label>
        <label className="field">
          <span>Model</span>
          <input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            required
          />
        </label>
        <label className="field">
          <span>Trim</span>
          <input
            value={form.trim ?? ''}
            onChange={(e) => setForm({ ...form, trim: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Year</span>
          <input
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>Price (KES)</span>
          <input
            type="number"
            value={form.price || ''}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>Mileage (km)</span>
          <input
            type="number"
            value={form.mileage || ''}
            onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>Fuel</span>
          <select
            value={form.fuel}
            onChange={(e) => setForm({ ...form, fuel: e.target.value as FuelType })}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </label>
        <label className="field">
          <span>Transmission</span>
          <select
            value={form.transmission}
            onChange={(e) =>
              setForm({ ...form, transmission: e.target.value as Transmission })
            }
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </label>
        <label className="field">
          <span>Body type</span>
          <select
            value={form.bodyType}
            onChange={(e) =>
              setForm({ ...form, bodyType: e.target.value as BodyType })
            }
          >
            {(
              [
                'Sedan',
                'SUV',
                'Hatchback',
                'Pickup',
                'Van',
                'Coupe',
                'Wagon',
              ] as BodyType[]
            ).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Colour</span>
          <input
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Location</span>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </label>
      </div>
      <label className="field">
        <span>Description</span>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </label>
      <label className="field">
        <span>Features (comma-separated)</span>
        <input
          value={featureText}
          onChange={(e) => setFeatureText(e.target.value)}
          placeholder="Sunroof, Reverse camera, Leather"
        />
      </label>
      <label className="field field--checkbox">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
        />
        <span>Show in featured section</span>
      </label>
      <label className="field field--checkbox">
        <input
          type="checkbox"
          checked={form.financeEligible}
          onChange={(e) =>
            setForm({ ...form, financeEligible: e.target.checked })
          }
        />
        <span>Finance eligible</span>
      </label>

      <h3>Photos</h3>
      <ImageUploader
        images={form.images}
        onChange={(images) => setForm({ ...form, images })}
      />
    </>
  )
}