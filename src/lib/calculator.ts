import type { InterestType, CareerPhase, CalculatorResult } from '@/types/calculator.types'

interface CalculateParams {
  initialAmount: number
  interestRate: number
  interestType: InterestType
  months: number
  monthlyContribution: number
  previousAccumulated?: number
}

export function calculateCompoundInterest({
  initialAmount,
  interestRate,
  interestType,
  months,
  monthlyContribution,
  previousAccumulated = 0
}: CalculateParams) {
  const principal = initialAmount + previousAccumulated
  const monthlyRate = interestType === 'annual' 
    ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
    : interestRate / 100

  if (monthlyRate === 0) {
    const totalInvested = monthlyContribution * months
    return {
      totalAccumulated: principal + totalInvested,
      totalInvested,
      interestEarned: 0
    }
  }

  const futureValuePrincipal = principal * Math.pow(1 + monthlyRate, months)
  const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  
  const totalAccumulated = futureValuePrincipal + futureValueContributions
  const totalInvested = monthlyContribution * months
  const interestEarned = totalAccumulated - principal - totalInvested

  return {
    totalAccumulated,
    totalInvested,
    interestEarned
  }
}

interface PhaseInput {
  name: string
  icon: string
  salary: number
  years: number
  savingsPercentage: number
}

export function calculatePhaseResults(
  phases: PhaseInput[],
  initialAmount: number,
  interestRate: number,
  interestType: InterestType
): CalculatorResult {
  let previousAccumulated = 0
  const phaseResults: CareerPhase[] = []
  let totalInvestedSum = initialAmount
  let totalInterestSum = 0
  let totalYearsSum = 0

  phases.forEach((phase) => {
    if (phase.years <= 0) return

    const months = phase.years * 12
    const monthlyContribution = phase.salary * (phase.savingsPercentage / 100)
    const initialInvested = previousAccumulated === 0 ? initialAmount : previousAccumulated

    const result = calculateCompoundInterest({
      initialAmount: previousAccumulated === 0 ? initialAmount : 0,
      interestRate,
      interestType,
      months,
      monthlyContribution,
      previousAccumulated
    })

    totalInvestedSum += result.totalInvested
    totalInterestSum += result.interestEarned
    totalYearsSum += phase.years

    phaseResults.push({
      name: phase.name,
      icon: phase.icon,
      salary: phase.salary,
      years: phase.years,
      monthlyContribution,
      initialInvested,
      totalInvested: result.totalInvested,
      interestEarned: result.interestEarned,
      totalAccumulated: result.totalAccumulated
    })

    previousAccumulated = result.totalAccumulated
  })

  return {
    phases: phaseResults,
    totalInvested: totalInvestedSum,
    totalInterest: totalInterestSum,
    finalAmount: previousAccumulated,
    totalYears: totalYearsSum
  }
}
