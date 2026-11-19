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

export type StockType = 'local' | 'foreign' | 'new'

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
  stockType: StockType
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
  stockType: string
  fuel: string
  transmission: string
  minPrice: number | ''
  maxPrice: number | ''
  maxMileage: number | ''
}

export const STOCK_TYPE_LABEL: Record<StockType, string> = {
  local: 'Kenyan Used',
  foreign: 'Foreign Used',
  new: 'Brand New',
}