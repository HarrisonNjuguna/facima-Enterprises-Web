export type FinanceChannel = 'bank' | 'microfinance'

export const FINANCE_DEPOSIT_RATE: Record<FinanceChannel, number> = {
  bank: 0.1,
  microfinance: 0.3,
}

export const FINANCE_CHANNEL_LABEL: Record<FinanceChannel, string> = {
  bank: 'Bank & tier-1 lender',
  microfinance: 'Microfinance & SACCO',
}

export const FINANCE_DEFAULT_RATE: Record<FinanceChannel, number> = {
  bank: 13.5,
  microfinance: 18.5,
}