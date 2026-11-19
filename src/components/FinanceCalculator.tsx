import { useMemo, useState, type InputHTMLAttributes } from 'react'
import { calculateFinance } from '../utils/finance'
import { formatKes } from '../utils/format'

interface FinanceCalculatorProps {
  initialPrice?: number
  compact?: boolean
}

export function FinanceCalculator({
  initialPrice = 2_000_000,
  compact = false,
}: FinanceCalculatorProps) {
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice)
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.2))
  const [tradeIn, setTradeIn] = useState(0)
  const [annualRate, setAnnualRate] = useState(14.5)
  const [termMonths, setTermMonths] = useState(48)
  const [registrationFees, setRegistrationFees] = useState(45_000)
  const [insuranceAnnual, setInsuranceAnnual] = useState(72_000)

  const result = useMemo(
    () =>
      calculateFinance({
        vehiclePrice,
        downPayment,
        tradeIn,
        annualRate,
        termMonths,
        registrationFees,
        insuranceAnnual,
      }),
    [
      vehiclePrice,
      downPayment,
      tradeIn,
      annualRate,
      termMonths,
      registrationFees,
      insuranceAnnual,
    ],
  )

  return (
    <div className="finance-calc-wrap">
      <header className="finance-calc__header">
        <h2>Vehicle finance estimator</h2>
        <p>
          Illustration only — final rates depend on credit assessment, insurer
          quotes, and NTSA fees. Ask our desk for a formal offer letter.
        </p>
      </header>

      <div className={compact ? 'finance-calc finance-calc--compact' : 'finance-calc'}>
        <fieldset className="finance-calc__fields">
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
            min={0}
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
            Kenya market assumptions; not a binding quote under the CBK
            consumer protection rules.
          </p>
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