export type InterestType = 'annual' | 'monthly'

export type CareerPhase = {
  name: string
  icon: string
  salary: number
  years: number
  monthlyContribution: number
  initialInvested: number
  totalInvested: number
  interestEarned: number
  totalAccumulated: number
}

export type CalculatorConfig = {
  interestType: InterestType
  interestRate: number
  initialAmount: number
  savingsPercentage: number
  phases: {
    junior: number
    pleno: number
    senior: number
    techLead: number
  }
}

export type CalculatorResult = {
  phases: CareerPhase[]
  totalInvested: number
  totalInterest: number
  finalAmount: number
  totalYears: number
}

export type ValidationErrors = {
  interestRate?: string
  years?: string
}
