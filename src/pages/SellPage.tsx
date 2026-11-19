export function SellPage() {
  return (
    <section className="section container sell-page">
      <header className="page-header">
        <h1>Sell or trade-in</h1>
        <p className="lead">
          Send photos, mileage, and your logbook status — we reply with a yard
          valuation band within one business day.
        </p>
      </header>
      <form
        className="sell-form"
        onSubmit={(e) => {
          e.preventDefault()
          alert(
            'Thanks — in production this form would reach our sales desk. Call +254 712 345 678 to continue.',
          )
        }}
      >
        <div className="sell-form__grid">
          <label className="field">
            <span>Your name</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label className="field">
            <span>Phone</span>
            <input name="phone" type="tel" required autoComplete="tel" />
          </label>
          <label className="field">
            <span>Vehicle (make / model / year)</span>
            <input name="vehicle" required />
          </label>
          <label className="field">
            <span>Asking price (KES)</span>
            <input name="price" type="number" min={0} step={10000} />
          </label>
        </div>
        <label className="field">
          <span>Notes — accidents, service history, urgent sale</span>
          <textarea name="notes" rows={5} />
        </label>
        <button type="submit" className="btn btn--primary">
          Request valuation
        </button>
      </form>
    </section>
  )
}