export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
export type Transmission = 'Automatic' | 'Manual'
export type BodyType =
  | 'Sedan'
  | 'SUV'
  | 'Hatchback'
  | 'Pickup'
  | 'Van'
  | 'Coupe'
  | 'Wagon'

export interface CarListing {
  id: string
  make: string
  model: string
  trim?: string
  year: number
  price: number
  mileage: number
  fuel: FuelType
  transmission: Transmission
  bodyType: BodyType
  color: string
  location: string
  description: string
  features: string[]
  images: string[]
  featured: boolean
  financeEligible: boolean
  createdAt: string
}

export interface CarFilters {
  query: string
  make: string
  bodyType: string
  fuel: string
  transmission: string
  minPrice: number | ''
  maxPrice: number | ''
  maxMileage: number | ''
}