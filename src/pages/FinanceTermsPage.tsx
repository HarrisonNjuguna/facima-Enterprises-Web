import { Link } from 'react-router-dom'
import { FINANCE_DEPOSIT_RATE } from '../config/finance'

export function FinanceTermsPage() {
  return (
    <article className="section container finance-terms">
      <header className="page-header">
        <p className="eyebrow">Facima · Partner lenders</p>
        <h1>Finance terms &amp; application guide</h1>
        <p className="lead">
          How we structure deposits at Facima, and what to expect when applying
          through{' '}
          <a
            href="https://www.co-opbank.co.ke/borrow/asset-finance/"
            target="_blank"
            rel="noreferrer"
          >
            Co-operative Bank
          </a>{' '}
          or{' '}
          <a
            href="https://ncbagroup.com/ke/asset-finance-application-form/"
            target="_blank"
            rel="noreferrer"
          >
            NCBA Group
          </a>{' '}
          asset finance. This is guidance for buyers — not legal advice or a bank
          offer.
        </p>
      </header>

      <section className="terms-block">
        <h2>Facima deposit policy</h2>
        <div className="terms-cards">
          <div className="terms-card">
            <h3>Bank finance</h3>
            <p className="terms-card__highlight">
              From {Math.round(FINANCE_DEPOSIT_RATE.bank * 100)}% deposit
            </p>
            <p>
              Facima works with banks that can finance up to 80–90% of vehicle
              value (subject to credit). Your minimum cash deposit starts at{' '}
              <strong>10%</strong> of the agreed price on qualifying profiles.
            </p>
            <ul>
              <li>Typical terms up to 60–72 months</li>
              <li>Lower effective rates for salaried applicants with clean CRB</li>
              <li>Asset held as security until loan closure</li>
            </ul>
          </div>
          <div className="terms-card">
            <h3>Microfinance &amp; SACCO</h3>
            <p className="terms-card__highlight">
              {Math.round(FINANCE_DEPOSIT_RATE.microfinance * 100)}% deposit
            </p>
            <p>
              Faster turnaround and flexible profiling, with a higher upfront
              contribution. Expect at least{' '}
              <strong>30%</strong> of vehicle value as deposit before disbursement.
            </p>
            <ul>
              <li>Shorter approval cycles for self-employed buyers</li>
              <li>Higher interest bands; read summary schedules carefully</li>
              <li>May combine deposit + trade-in toward the 30% threshold</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="terms-block">
        <h2>Co-operative Bank — asset finance (summary)</h2>
        <p className="muted">
          Based on publicly published Co-op Bank asset finance product information.
        </p>
        <ol className="terms-steps">
          <li>
            <strong>Choose your vehicle</strong> at Facima and obtain a pro-forma
            invoice or sale agreement showing price, chassis details, and dealer
            KRA PIN where applicable.
          </li>
          <li>
            <strong>Visit a Co-op Bank branch</strong> (or complete the online asset
            finance journey where available) and select asset finance for motor
            vehicles.
          </li>
          <li>
            <strong>Submit documents:</strong> national ID (or passport), KRA PIN
            certificate, and invoices / importation documents for the unit.
          </li>
          <li>
            <strong>Credit assessment</strong> — Co-op may finance up to 80% for
            new and used movable assets; repayment can stretch up to 72 months at
            pricing set by the bank.
          </li>
          <li>
            <strong>Insurance</strong> — Co-op Insurance financing may be arranged for
            the asset; renewals are tracked with expiry reminders.
          </li>
          <li>
            <strong>Disbursement &amp; transfer</strong> — after approval, the bank
            pays the dealer or facilitates hire-purchase signing; NTSA logbook and
            joint registration follow lender rules.
          </li>
        </ol>
        <p>
          Support: Call Centre{' '}
          <a href="tel:0202776000">020-2776000</a> /{' '}
          <a href="tel:0703027000">0703027000</a> · Email{' '}
          <a href="mailto:customerservice@co-opbank.co.ke">
            customerservice@co-opbank.co.ke
          </a>
        </p>
      </section>

      <section className="terms-block">
        <h2>NCBA Group — asset finance (summary)</h2>
        <p className="muted">
          Based on NCBA key facts and online application guidance for Kenya asset
          finance.
        </p>
        <ol className="terms-steps">
          <li>
            <strong>Apply online</strong> via the NCBA asset finance form (4 steps:
            applicant details → vehicle &amp; loan details → attachments →
            confirmation).
          </li>
          <li>
            <strong>Upload KYC &amp; statements:</strong> KRA certificate, national ID,
            recent bank or M-Pesa statements, logbook (if refinancing), and car
            payment invoices showing deposit already paid to the dealer.
          </li>
          <li>
            <strong>Used vehicles:</strong> registration or import papers, valuation
            from an approved valuer (usually not older than two months), and odometer
            photo on the valuation where mileage is material.
          </li>
          <li>
            <strong>Appraisal</strong> — NCBA advertises turnaround in under 24 hours
            for complete files; interest follows CBK pricing and internal models.
          </li>
          <li>
            <strong>Fees to expect</strong> — account service fee (often around 3% of
            approved amount on standard tariffs), option-to-purchase fee on hire
            purchase, insurance via integrated channels, and penalties for late
            payment.
          </li>
          <li>
            <strong>Completion</strong> — asset registered in joint names until the
            loan is cleared; ownership reverts after final instalment and option fee.
          </li>
        </ol>
      </section>

      <section className="terms-block terms-block--dark">
        <h2>Before you sign</h2>
        <ul className="terms-checklist">
          <li>Compare total cost of credit, not just monthly instalment.</li>
          <li>Confirm whether the rate is fixed or variable for the full term.</li>
          <li>Budget NTSA, tracking, tracker fees, and comprehensive insurance.</li>
          <li>Keep copies of every document you sign at the yard and at the bank.</li>
          <li>
            Ask Facima finance desk to reconcile your calculator result with the
            lender&apos;s formal offer letter.
          </li>
        </ul>
        <div className="terms-cta">
          <Link to="/finance" className="btn btn--primary">
            Back to calculator
          </Link>
          <Link to="/inventory" className="btn btn--secondary">
            Browse stock
          </Link>
        </div>
      </section>
    </article>
  )
}