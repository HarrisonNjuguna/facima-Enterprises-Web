export interface FinanceInput {
  vehiclePrice: number
  downPayment: number
  tradeIn: number
  annualRate: number
  termMonths: number
  registrationFees: number
  insuranceAnnual: number
}

export interface FinanceResult {
  loanPrincipal: number
  monthlyPayment: number
  totalInterest: number
  totalPayable: number
  effectiveMonthlyWithInsurance: number
}

export function calculateFinance(input: FinanceInput): FinanceResult | null {
  const {
    vehiclePrice,
    downPayment,
    tradeIn,
    annualRate,
    termMonths,
    registrationFees,
    insuranceAnnual,
  } = input

  if (termMonths <= 0 || vehiclePrice <= 0) return null

  const loanPrincipal = Math.max(
    0,
    vehiclePrice - downPayment - tradeIn + registrationFees,
  )
  if (loanPrincipal <= 0) {
    return {
      loanPrincipal: 0,
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayable: vehiclePrice + registrationFees,
      effectiveMonthlyWithInsurance: insuranceAnnual / 12,
    }
  }

  const monthlyRate = annualRate / 100 / 12
  let monthlyPayment: number
  if (monthlyRate === 0) {
    monthlyPayment = loanPrincipal / termMonths
  } else {
    monthlyPayment =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1)
  }

  const totalPayable = monthlyPayment * termMonths
  const totalInterest = totalPayable - loanPrincipal
  const effectiveMonthlyWithInsurance = monthlyPayment + insuranceAnnual / 12

  return {
    loanPrincipal,
    monthlyPayment,
    totalInterest,
    totalPayable,
    effectiveMonthlyWithInsurance,
  }
}