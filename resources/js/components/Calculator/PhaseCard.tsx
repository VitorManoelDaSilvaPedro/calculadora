import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "@/components/ui/card"

interface PhaseCardProps {
  name: string
  icon: string
  salary: number
  monthlyContribution: number
  years: number
  initialInvested: number
  totalInvested: number
  interestEarned: number
  totalAccumulated: number
}

export function PhaseCard({ name, icon, salary, monthlyContribution, years, initialInvested, totalInvested, interestEarned, totalAccumulated }: PhaseCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="bg-primary-dark px-4 sm:px-6 py-2 sm:py-3 rounded-t-lg">
        <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
          <FontAwesomeIcon icon={icon as any} />
          {name}
        </h3>
      </div>
      <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <span className="text-xs sm:text-sm text-gray-600">Salário Mensal</span>
          <span className="text-base sm:text-lg font-semibold text-primary-dark">
            R$ {salary.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <span className="text-xs sm:text-sm text-gray-600">Aporte Mensal</span>
          <span className="text-sm sm:text-base font-medium text-primary-dark">
            R$ {monthlyContribution.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <span className="text-xs sm:text-sm text-gray-600">Duração</span>
          <span className="text-sm sm:text-base font-medium">{years} {years === 1 ? 'ano' : 'anos'}</span>
        </div>
        <div className="border-t pt-2 sm:pt-3 mt-2 sm:mt-3 space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-xs sm:text-sm text-gray-600">Valor Inicial</span>
            <span className="text-sm sm:text-base font-medium text-gray-700">
              R$ {initialInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-xs sm:text-sm text-gray-600">Total Investido</span>
            <span className="text-sm sm:text-base font-medium text-gray-700">
              R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-xs sm:text-sm text-gray-600">Juros do Período</span>
            <span className="text-sm sm:text-base font-medium text-green-600">
              R$ {interestEarned.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pt-2 border-t">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Total Acumulado</span>
            <span className="text-sm sm:text-base font-bold text-primary-dark">
              R$ {totalAccumulated.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
