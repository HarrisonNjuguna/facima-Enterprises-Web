import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FINANCE_DEFAULT_RATE,
  FINANCE_DEPOSIT_RATE,
  type FinanceChannel,
} from '../config/finance'
import { calculateFinance } from '../utils/finance'
import { formatKes } from '../utils/format'

export function FinanceTeaser() {
  const [channel, setChannel] = useState<FinanceChannel>('bank')
  const [price, setPrice] = useState(2_000_000)

  const deposit = Math.round(price * FINANCE_DEPOSIT_RATE[channel])
  const result = useMemo(
    () =>
      calculateFinance({
        vehiclePrice: price,
        downPayment: deposit,
        tradeIn: 0,
        annualRate: FINANCE_DEFAULT_RATE[channel],
        termMonths: 48,
        registrationFees: 40_000,
        insuranceAnnual: 65_000,
      }),
    [price, deposit, channel],
  )

  return (
    <div className="finance-teaser" id="calculator">
      <div>
        <h2>Quick finance check</h2>
        <p className="muted">
          Bank from 10% deposit · Microfinance from 30%. Full calculator on the
          finance page.
        </p>
      </div>
      <div className="finance-teaser__controls">
        <div className="finance-teaser__channels">
          {(['bank', 'microfinance'] as const).map((key) => (
            <button
              key={key}
              type="button"
              className={channel === key ? 'is-active' : undefined}
              onClick={() => setChannel(key)}
            >
              {key === 'bank' ? 'Bank' : 'MFI'}
            </button>
          ))}
        </div>
        <label className="finance-teaser__price">
          <span>Vehicle price (KES)</span>
          <input
            type="number"
            min={0}
            step={50000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        {result && (
          <p className="finance-teaser__result">
            Est. <strong>{formatKes(result.monthlyPayment)}</strong>/mo · deposit{' '}
            <strong>{formatKes(deposit)}</strong>
          </p>
        )}
        <Link to="/finance" className="btn btn--primary btn--sm">
          Full calculator
        </Link>
      </div>
    </div>
  )
}