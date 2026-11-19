import type { StockType } from '../types/car'
import { STOCK_TYPE_LABEL } from '../types/car'

export function labelStockType(type: StockType): string {
  return STOCK_TYPE_LABEL[type]
}

export function normalizeStockType(value: unknown): StockType {
  if (value === 'local' || value === 'foreign' || value === 'new') return value
  return 'local'
}