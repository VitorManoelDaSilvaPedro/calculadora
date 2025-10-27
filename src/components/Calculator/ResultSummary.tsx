import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "@/components/ui/card"
import { PhaseChart } from "./PhaseChart"
import type { CalculatorResult } from "@/types/calculator.types"

interface ResultSummaryProps {
  result: CalculatorResult
}

export function ResultSummary({ result }: ResultSummaryProps) {
  const { totalInvested, totalInterest, finalAmount, totalYears } = result

  return (
    <Card className="bg-white">
      <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
        <h2 className="text-xl sm:text-2xl font-bold text-black text-center flex items-center justify-center gap-3">
          <FontAwesomeIcon icon="gem" className="text-primary-dark" />
          Seu Patrimônio Final
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center space-y-3">
            <FontAwesomeIcon icon="coins" className="text-4xl text-gray-400" />
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Investido</p>
            <p className="text-xl sm:text-2xl font-bold text-black">
              R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <FontAwesomeIcon icon="chart-line" className="text-4xl text-gray-400" />
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Juros Ganhos</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              R$ {totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <FontAwesomeIcon icon="clock" className="text-4xl text-gray-400" />
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tempo Total</p>
            <p className="text-xl sm:text-2xl font-bold text-black">
              {totalYears} anos
            </p>
          </div>
        </div>

        <div className="bg-primary-dark rounded-lg p-6 md:p-8">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Montante Final</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              R$ {finalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon="chart-pie" />
            Evolução por Fase
          </h3>
          <PhaseChart phases={result.phases} />
        </div>
      </div>
    </Card>
  )
}
