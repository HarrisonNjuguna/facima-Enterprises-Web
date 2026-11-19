import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CarCard } from '../components/CarCard'
import { FilterPanel } from '../components/FilterPanel'
import { useCars } from '../context/CarContext'
import { defaultFilters, filterCars } from '../utils/filterCars'
import type { CarFilters } from '../types/car'

export function InventoryPage() {
  const { cars } = useCars()
  const [params] = useSearchParams()
  const [filters, setFilters] = useState<CarFilters>(() => ({
    ...defaultFilters,
    query: params.get('q') ?? '',
    bodyType: params.get('bodyType') ?? '',
    stockType: params.get('stockType') ?? '',
  }))

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      query: params.get('q') ?? '',
      bodyType: params.get('bodyType') ?? '',
      stockType: params.get('stockType') ?? '',
    }))
  }, [params])
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc' | 'mileage'>(
    'newest',
  )

  const filtered = useMemo(() => filterCars(cars, filters), [cars, filters])

  const sorted = useMemo(() => {
    const list = [...filtered]
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'mileage':
        return list.sort((a, b) => a.mileage - b.mileage)
      default:
        return list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
    }
  }, [filtered, sort])

  return (
    <div className="section container inventory-layout">
      <header className="page-header">
        <h1>Vehicle inventory</h1>
        <p className="muted">
          {sorted.length} listing{sorted.length === 1 ? '' : 's'} — updated from
          the Facima yard and admin uploads.
        </p>
      </header>
      <FilterPanel
        filters={filters}
        onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
        onReset={() => setFilters(defaultFilters)}
      />
      <div className="inventory-main">
        <div className="inventory-toolbar">
          <label className="field field--inline">
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
              <option value="newest">Newest listed</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="mileage">Lowest mileage</option>
            </select>
          </label>
        </div>
        {sorted.length === 0 ? (
          <p className="empty-state">
            No vehicles match your filters.{' '}
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setFilters(defaultFilters)}
            >
              Reset filters
            </button>
          </p>
        ) : (
          <div className="car-grid">
            {sorted.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}