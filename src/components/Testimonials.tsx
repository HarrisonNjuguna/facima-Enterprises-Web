const REVIEWS = [
  {
    quote:
      'The process was straight on WhatsApp until I came to collect. Transparent pricing and the unit matched the listing.',
    name: 'Wanjiru K.',
    detail: 'Bought a Toyota Premio',
  },
  {
    quote:
      'Best price I found on Kiambu Road after weeks of searching. They helped with the finance paperwork too.',
    name: 'Brian O.',
    detail: 'Bought an SUV',
  },
  {
    quote:
      'Sold my hatchback and upgraded the same week. Fair valuation, zero pressure at the yard.',
    name: 'Aisha M.',
    detail: 'Trade-in customer',
  },
]

export function Testimonials() {
  return (
    <section className="band band--soft">
      <div className="container section-inner">
        <header className="section__head section__head--stacked">
          <div>
            <h2>What our customers say</h2>
            <p className="muted section__sub">Real feedback from Facima yard visitors.</p>
          </div>
        </header>
        <div className="testimonial-grid">
          {REVIEWS.map((r) => (
            <blockquote key={r.name} className="testimonial-card">
              <p>&ldquo;{r.quote}&rdquo;</p>
              <footer>
                <strong>{r.name}</strong>
                <span>{r.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}