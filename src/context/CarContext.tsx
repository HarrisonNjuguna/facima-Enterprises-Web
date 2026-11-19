import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { seedCars } from '../data/seedCars'
import type { CarListing } from '../types/car'

const STORAGE_KEY = 'facima_car_inventory'

function loadInventory(): CarListing[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CarListing[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
  }
  return seedCars
}

function persistInventory(cars: CarListing[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars))
  } catch (e) {
    console.warn('Could not save inventory (storage may be full):', e)
  }
}

function newCarId() {
  return `car-${crypto.randomUUID()}`
}

interface CarContextValue {
  cars: CarListing[]
  addCar: (car: Omit<CarListing, 'id' | 'createdAt'>) => void
  updateCar: (id: string, car: Partial<CarListing>) => void
  removeCar: (id: string) => void
  getCarById: (id: string) => CarListing | undefined
  resetToSeed: () => void
}

const CarContext = createContext<CarContextValue | null>(null)

export function CarProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<CarListing[]>(loadInventory)

  const commit = useCallback((next: CarListing[]) => {
    setCars(next)
    persistInventory(next)
  }, [])

  const addCar = useCallback(
    (car: Omit<CarListing, 'id' | 'createdAt'>) => {
      const listing: CarListing = {
        ...car,
        id: newCarId(),
        createdAt: new Date().toISOString(),
      }
      commit([listing, ...cars])
    },
    [cars, commit],
  )

  const updateCar = useCallback(
    (id: string, patch: Partial<CarListing>) => {
      commit(cars.map((c) => (c.id === id ? { ...c, ...patch, id: c.id } : c)))
    },
    [cars, commit],
  )

  const removeCar = useCallback(
    (id: string) => {
      commit(cars.filter((c) => c.id !== id))
    },
    [cars, commit],
  )

  const getCarById = useCallback(
    (id: string) => cars.find((c) => c.id === id),
    [cars],
  )

  const resetToSeed = useCallback(() => {
    commit(seedCars)
  }, [commit])

  const value = useMemo(
    () => ({
      cars,
      addCar,
      updateCar,
      removeCar,
      getCarById,
      resetToSeed,
    }),
    [cars, addCar, updateCar, removeCar, getCarById, resetToSeed],
  )

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>
}

export function useCars() {
  const ctx = useContext(CarContext)
  if (!ctx) throw new Error('useCars must be used within CarProvider')
  return ctx
}