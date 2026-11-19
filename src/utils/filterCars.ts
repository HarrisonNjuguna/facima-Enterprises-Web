import type { CarFilters, CarListing } from '../types/car'

export function filterCars(cars: CarListing[], filters: CarFilters): CarListing[] {
  const q = filters.query.trim().toLowerCase()

  return cars.filter((car) => {
    if (q) {
      const haystack = [
        car.make,
        car.model,
        car.trim ?? '',
        car.description,
        car.location,
        car.features.join(' '),
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    if (filters.make && car.make !== filters.make) return false
    if (filters.bodyType && car.bodyType !== filters.bodyType) return false
    if (filters.fuel && car.fuel !== filters.fuel) return false
    if (filters.transmission && car.transmission !== filters.transmission)
      return false
    if (filters.minPrice !== '' && car.price < filters.minPrice) return false
    if (filters.maxPrice !== '' && car.price > filters.maxPrice) return false
    if (filters.maxMileage !== '' && car.mileage > filters.maxMileage) return false
    return true
  })
}

export const defaultFilters: CarFilters = {
  query: '',
  make: '',
  bodyType: '',
  fuel: '',
  transmission: '',
  minPrice: '',
  maxPrice: '',
  maxMileage: '',
}