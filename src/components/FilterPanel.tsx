import type { CarFilters } from '../types/car'

const makes = ['', 'Toyota', 'Mazda', 'Subaru', 'Isuzu', 'Honda', 'Mercedes-Benz']
const bodies = ['', 'Sedan', 'SUV', 'Hatchback', 'Pickup', 'Van', 'Coupe', 'Wagon']
const fuels = ['', 'Petrol', 'Diesel', 'Hybrid', 'Electric']
const transmissions = ['', 'Automatic', 'Manual']

export function FilterPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: CarFilters
  onChange: (patch: Partial<CarFilters>) => void
  onReset: () => void
}) {
  return (
    <aside className="filter-panel" aria-label="Filter inventory">
      <FilterFields
        filters={filters}
        onChange={onChange}
        onReset={onReset}
        makes={makes}
        bodies={bodies}
        fuels={fuels}
        transmissions={transmissions}
      />
    </aside>
  )
}

function FilterFields({
  filters,
  onChange,
  onReset,
  makes,
  bodies,
  fuels,
  transmissions,
}: {
  filters: CarFilters
  onChange: (patch: Partial<CarFilters>) => void
  onReset: () => void
  makes: string[]
  bodies: string[]
  fuels: string[]
  transmissions: string[]
}) {
  return (
    <>
      <div className="filter-panel__head">
        <h2>Refine search</h2>
        <button type="button" className="btn btn--ghost btn--sm" onClick={onReset}>
          Clear all
        </button>
      </div>
      <label className="field">
        <span>Keyword</span>
        <input
          type="search"
          placeholder="Model, trim, feature…"
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
        />
      </label>
      <label className="field">
        <span>Make</span>
        <select
          value={filters.make}
          onChange={(e) => onChange({ make: e.target.value })}
        >
          <option value="">Any make</option>
          {makes.filter(Boolean).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Body type</span>
        <select
          value={filters.bodyType}
          onChange={(e) => onChange({ bodyType: e.target.value })}
        >
          <option value="">Any body</option>
          {bodies.filter(Boolean).map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Fuel</span>
        <select
          value={filters.fuel}
          onChange={(e) => onChange({ fuel: e.target.value })}
        >
          <option value="">Any fuel</option>
          {fuels.filter(Boolean).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Transmission</span>
        <select
          value={filters.transmission}
          onChange={(e) => onChange({ transmission: e.target.value })}
        >
          <option value="">Any</option>
          {transmissions.filter(Boolean).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <div className="filter-panel__range">
        <label className="field">
          <span>Min price (KES)</span>
          <input
            type="number"
            min={0}
            step={50000}
            value={filters.minPrice}
            onChange={(e) =>
              onChange({
                minPrice: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
          />
        </label>
        <label className="field">
          <span>Max price (KES)</span>
          <input
            type="number"
            min={0}
            step={50000}
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({
                maxPrice: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
          />
        </label>
      </div>
      <label className="field">
        <span>Max mileage (km)</span>
        <input
          type="number"
          min={0}
          step={5000}
          value={filters.maxMileage}
          onChange={(e) =>
            onChange({
              maxMileage: e.target.value === '' ? '' : Number(e.target.value),
            })
          }
        />
      </label>
    </>
  )
}