import { Link, useSearchParams } from 'react-router-dom'
import { STOCK_TYPE_LABEL, type StockType } from '../types/car'

const CHIPS: { type: '' | StockType; label: string }[] = [
  { type: '', label: 'All stock' },
  { type: 'local', label: STOCK_TYPE_LABEL.local },
  { type: 'foreign', label: STOCK_TYPE_LABEL.foreign },
  { type: 'new', label: STOCK_TYPE_LABEL.new },
]

export function StockQuickFilters({ basePath = '/inventory' }: { basePath?: string }) {
  const [params] = useSearchParams()
  const active = params.get('stockType') ?? ''

  return (
    <div className="stock-chips" role="tablist" aria-label="Stock type">
      {CHIPS.map((chip) => {
        const isActive = chip.type === '' ? !active : active === chip.type
        const href =
          chip.type === ''
            ? basePath
            : `${basePath}?stockType=${encodeURIComponent(chip.type)}`
        return (
          <Link
            key={chip.label}
            to={href}
            role="tab"
            aria-selected={isActive}
            className={isActive ? 'stock-chip is-active' : 'stock-chip'}
          >
            {chip.label}
          </Link>
        )
      })}
    </div>
  )
}