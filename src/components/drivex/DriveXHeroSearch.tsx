import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { BodyType } from '../../types/car'
import { CONTACT } from '../../config/contact'

type SearchTab = 'buy' | 'finance' | 'trade'

const BODIES: BodyType[] = ['SUV', 'Sedan', 'Hatchback', 'Pickup', 'Van', 'Wagon']

export function DriveXHeroSearch() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<SearchTab>('buy')
  const [location, setLocation] = useState('Ridgeways, Kiambu Road')
  const [bodyType, setBodyType] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [stockType, setStockType] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (tab === 'finance') {
      navigate('/finance')
      return
    }
    if (tab === 'trade') {
      navigate('/sell')
      return
    }
    const params = new URLSearchParams()
    if (bodyType) params.set('bodyType', bodyType)
    if (stockType) params.set('stockType', stockType)
    if (maxPrice) params.set('q', `under ${maxPrice}`)
    navigate(`/inventory?${params.toString()}`)
  }

  return (
    <form className="drivex-search" onSubmit={onSubmit}>
      <div className="drivex-search__tabs" role="tablist">
        {(
          [
            ['buy', 'Buy a car'],
            ['finance', 'Finance'],
            ['trade', 'Trade-in'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? 'is-active' : undefined}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="drivex-search__grid">
        <label className="drivex-field">
          <span>Location</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={CONTACT.address}
          />
        </label>
        <label className="drivex-field">
          <span>Body type</span>
          <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
            <option value="">Any type</option>
            {BODIES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="drivex-field">
          <span>Max budget (KES)</span>
          <input
            type="number"
            min={0}
            step={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 3000000"
          />
        </label>
        <label className="drivex-field">
          <span>Stock type</span>
          <select value={stockType} onChange={(e) => setStockType(e.target.value)}>
            <option value="">All stock</option>
            <option value="local">Kenyan used</option>
            <option value="foreign">Foreign used</option>
            <option value="new">Brand new</option>
          </select>
        </label>
      </div>
      <div className="drivex-search__submit">
        <button type="submit" className="btn-dx">
          Search cars
        </button>
      </div>
    </form>
  )
}