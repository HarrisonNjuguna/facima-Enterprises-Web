import { useEffect, useMemo, useState, type InputHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import {
  FINANCE_CHANNEL_LABEL,
  FINANCE_DEFAULT_RATE,
  FINANCE_DEPOSIT_RATE,
  type FinanceChannel,
} from '../config/finance'
import { calculateFinance } from '../utils/finance'
import { formatKes } from '../utils/format'

interface FinanceCalculatorProps {
  initialPrice?: number
  compact?: boolean
  defaultChannel?: FinanceChannel
  showTermsLink?: boolean
}

export function FinanceCalculator({
  initialPrice = 2_000_000,
  compact = false,
  defaultChannel = 'bank',
  showTermsLink = true,
}: FinanceCalculatorProps) {
  const [channel, setChannel] = useState<FinanceChannel>(defaultChannel)
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice)
  const [downPayment, setDownPayment] = useState(
    Math.round(initialPrice * FINANCE_DEPOSIT_RATE[defaultChannel]),
  )
  const [tradeIn, setTradeIn] = useState(0)
  const [annualRate, setAnnualRate] = useState(FINANCE_DEFAULT_RATE[defaultChannel])
  const [termMonths, setTermMonths] = useState(48)
  const [registrationFees, setRegistrationFees] = useState(45_000)
  const [insuranceAnnual, setInsuranceAnnual] = useState(72_000)

  const minDeposit = Math.round(vehiclePrice * FINANCE_DEPOSIT_RATE[channel])
  const maxFinancePct =
    channel === 'bank' ? '90%' : '70%'

  useEffect(() => {
    setAnnualRate(FINANCE_DEFAULT_RATE[channel])
  }, [channel])

  useEffect(() => {
    setVehiclePrice(initialPrice)
    setDownPayment(Math.round(initialPrice * FINANCE_DEPOSIT_RATE[channel]))
  }, [initialPrice, channel])

  function selectChannel(key: FinanceChannel) {
    setChannel(key)
    setDownPayment(Math.round(vehiclePrice * FINANCE_DEPOSIT_RATE[key]))
    setAnnualRate(FINANCE_DEFAULT_RATE[key])
  }

  const result = useMemo(
    () =>
      calculateFinance({
        vehiclePrice,
        downPayment: Math.max(downPayment, minDeposit),
        tradeIn,
        annualRate,
        termMonths,
        registrationFees,
        insuranceAnnual,
      }),
    [
      vehiclePrice,
      downPayment,
      minDeposit,
      tradeIn,
      annualRate,
      termMonths,
      registrationFees,
      insuranceAnnual,
    ],
  )

  return (
    <div className="finance-calc-wrap" id="finance-calculator">
      <header className="finance-calc__header">
        <h2>Vehicle finance estimator</h2>
        <p>
          Choose bank or microfinance/SACCO path. Minimum deposit for bank partners
          is <strong>10%</strong> of vehicle value; microfinance routes typically
          require <strong>30%</strong> upfront. Figures are illustrative only.
        </p>
      </header>

      {!compact && (
        <img
          className="finance-mock-banner"
          src="/mock/showroom-hero.svg"
          alt=""
          aria-hidden
        />
      )}

      <div className="finance-channel-toggle" role="tablist" aria-label="Finance type">
        {(['bank', 'microfinance'] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={channel === key}
            className={channel === key ? 'is-active' : undefined}
            onClick={() => selectChannel(key)}
          >
            <span>{FINANCE_CHANNEL_LABEL[key]}</span>
            <small>
              {Math.round(FINANCE_DEPOSIT_RATE[key] * 100)}% min. deposit · finance
              up to {key === 'bank' ? '90%' : '70%'}
            </small>
          </button>
        ))}
      </div>

      <div className={compact ? 'finance-calc finance-calc--compact' : 'finance-calc'}>
        <fieldset className="finance-calc__fields">
          <div className="deposit-hint">
            Minimum deposit for this vehicle:{' '}
            <strong>{formatKes(minDeposit)}</strong> ({maxFinancePct} max. finance)
          </div>
          <Field
            label="Vehicle price (KES)"
            type="number"
            value={vehiclePrice}
            onChange={(v) => setVehiclePrice(Number(v))}
            min={0}
            step={10000}
          />
          <Field
            label="Deposit / down payment"
            type="number"
            value={downPayment}
            onChange={(v) => setDownPayment(Number(v))}
            min={minDeposit}
            step={5000}
          />
          <Field
            label="Trade-in value"
            type="number"
            value={tradeIn}
            onChange={(v) => setTradeIn(Number(v))}
            min={0}
            step={5000}
          />
          <Field
            label="Interest rate (% p.a.)"
            type="number"
            value={annualRate}
            onChange={(v) => setAnnualRate(Number(v))}
            min={0}
            max={40}
            step={0.1}
          />
          <label className="field">
            <span>Loan term</span>
            <select
              value={termMonths}
              onChange={(e) => setTermMonths(Number(e.target.value))}
            >
              <option value={12}>12 months</option>
              <option value={24}>24 months</option>
              <option value={36}>36 months</option>
              <option value={48}>48 months</option>
              <option value={60}>60 months</option>
              <option value={72}>72 months</option>
            </select>
          </label>
          <Field
            label="Registration & incidentals"
            type="number"
            value={registrationFees}
            onChange={(v) => setRegistrationFees(Number(v))}
            min={0}
            step={1000}
          />
          <Field
            label="Insurance (annual)"
            type="number"
            value={insuranceAnnual}
            onChange={(v) => setInsuranceAnnual(Number(v))}
            min={0}
            step={1000}
          />
        </fieldset>

        <aside className="finance-calc__summary" aria-live="polite">
          {result ? (
            <>
              <div className="summary-row summary-row--hero">
                <span>Estimated monthly instalment</span>
                <strong>{formatKes(result.monthlyPayment)}</strong>
              </div>
              <div className="summary-row">
                <span>Incl. insurance (monthly)</span>
                <strong>
                  {formatKes(result.effectiveMonthlyWithInsurance)}
                </strong>
              </div>
              <div className="summary-row">
                <span>Amount financed</span>
                <strong>{formatKes(result.loanPrincipal)}</strong>
              </div>
              <div className="summary-row">
                <span>Total interest</span>
                <strong>{formatKes(result.totalInterest)}</strong>
              </div>
              <div className="summary-row">
                <span>Total payable over term</span>
                <strong>{formatKes(result.totalPayable)}</strong>
              </div>
            </>
          ) : (
            <p className="muted">Enter valid amounts to see estimates.</p>
          )}
          <p className="finance-disclaimer">
            Kenya market assumptions; not a binding quote. Partner banks (e.g. Co-op
            up to 80% finance) may differ from microfinance rules.
          </p>
          {showTermsLink && (
            <Link to="/finance/terms" className="btn btn--secondary btn--sm">
              Read finance terms &amp; bank steps
            </Link>
          )}
        </aside>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  ...rest
}: {
  label: string
  value: string | number
  onChange: (v: string) => void
  type?: string
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </label>
  )
}