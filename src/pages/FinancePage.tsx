import { Link, useLocation } from 'react-router-dom'
import { FinanceCalculator } from '../components/FinanceCalculator'

export function FinancePage() {
  const location = useLocation()
  const state = location.state as { price?: number } | null
  const initialPrice = state?.price ?? 2_500_000

  return (
    <div className="section container finance-page">
      <header className="page-header">
        <h1>Car finance calculator</h1>
        <p className="lead">
          Bank finance from <strong>10%</strong> deposit; microfinance from{' '}
          <strong>30%</strong>. Switch paths in the calculator, then read{' '}
          <Link to="/finance/terms">Co-op &amp; NCBA steps</Link>.
        </p>
      </header>
      <FinanceCalculator initialPrice={initialPrice} />
      <aside className="finance-page__notes">
        <h2>What happens next?</h2>
        <p>
          Submit payslips / bank statements for a provisional limit. Partner banks
          and SACCOs we work with typically respond within two business days. Final
          approval remains at the lender&apos;s discretion.
        </p>
      </aside>
    </div>
  )
}