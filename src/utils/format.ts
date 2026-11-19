export function formatKes(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat('en-KE').format(km)} km`
}

export function slugifyCar(car: { make: string; model: string; year: number; id: string }) {
  const base = `${car.year}-${car.make}-${car.model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return `${base}-${car.id.slice(0, 8)}`
}