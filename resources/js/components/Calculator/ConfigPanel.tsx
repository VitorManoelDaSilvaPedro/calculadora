import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CurrencyInput from "react-currency-input-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { InterestType, ValidationErrors, CalculatorResult } from "@/types/calculator.types"
import { calculatePhaseResults } from "@/lib/calculator"

interface ConfigPanelProps {
  onCalculate: (result: CalculatorResult) => void
}

export function ConfigPanel({ onCalculate }: ConfigPanelProps) {
  const [interestType, setInterestType] = useState<InterestType>('annual')
  const [interestRate, setInterestRate] = useState(10)
  const [initialAmount, setInitialAmount] = useState(0)
  const [savingsPercentage, setSavingsPercentage] = useState(30)
  const [years, setYears] = useState({ junior: 3, pleno: 4, senior: 5, techLead: 3 })
  const [showSalaries, setShowSalaries] = useState(false)
  const [salaries, setSalaries] = useState({ junior: 4500, pleno: 8000, senior: 14000, techLead: 17000 })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isCalculating, setIsCalculating] = useState(false)

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!interestRate || interestRate <= 0) {
      newErrors.interestRate = 'Taxa de juros deve ser maior que 0'
    }

    const hasAtLeastOnePhase = Object.values(years).some(y => y > 0)
    if (!hasAtLeastOnePhase) {
      newErrors.years = 'Pelo menos uma fase deve ter anos maior que 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = () => {
    if (!validateInputs()) return

    setIsCalculating(true)

    const phases = [
      { name: 'Júnior', icon: 'graduation-cap', salary: salaries.junior, years: years.junior, savingsPercentage },
      { name: 'Pleno', icon: 'briefcase', salary: salaries.pleno, years: years.pleno, savingsPercentage },
      { name: 'Sênior', icon: 'rocket', salary: salaries.senior, years: years.senior, savingsPercentage },
      { name: 'Líder', icon: 'crown', salary: salaries.techLead, years: years.techLead, savingsPercentage }
    ]

    const result = calculatePhaseResults(phases, initialAmount, interestRate, interestType)
    onCalculate(result)

    setIsCalculating(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary-dark">Configure as informações principais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs>
          <TabsList className="w-full">
            <TabsTrigger 
              active={interestType === 'annual'} 
              onClick={() => setInterestType('annual')}
              className="flex-1"
            >
              Juros Anuais
            </TabsTrigger>
            <TabsTrigger 
              active={interestType === 'monthly'} 
              onClick={() => setInterestType('monthly')}
              className="flex-1"
            >
              Juros Mensais
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label><FontAwesomeIcon icon="chart-line" className="mr-2" />Taxa de Juros (%)</Label>
            <Input 
              type="number" 
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value))
                setErrors(prev => ({ ...prev, interestRate: undefined }))
              }}
              placeholder="10"
              className={errors.interestRate ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.interestRate && (
              <p className="text-xs text-red-500">{errors.interestRate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label><FontAwesomeIcon icon="money-bill" className="mr-2" />Aporte Inicial (R$)</Label>
            <Input 
              type="number" 
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Quantos % você guardará do salário?</Label>
            <span className="text-sm font-semibold text-primary-dark">{savingsPercentage}%</span>
          </div>
          <Slider 
            min={10} 
            max={50} 
            value={savingsPercentage}
            onChange={(e) => setSavingsPercentage(Number(e.target.value))}
          />
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-primary-dark">Tempo em cada fase (em anos)</h3>
            {errors.years && (
              <p className="text-xs text-red-500">{errors.years}</p>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label><FontAwesomeIcon icon="graduation-cap" className="mr-2" />Júnior</Label>
              <Input 
                type="number" 
                value={years.junior}
                onChange={(e) => setYears({...years, junior: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label><FontAwesomeIcon icon="briefcase" className="mr-2" />Pleno</Label>
              <Input 
                type="number" 
                value={years.pleno}
                onChange={(e) => setYears({...years, pleno: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label><FontAwesomeIcon icon="rocket" className="mr-2" />Sênior</Label>
              <Input 
                type="number" 
                value={years.senior}
                onChange={(e) => setYears({...years, senior: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label><FontAwesomeIcon icon="crown" className="mr-2" />Líder</Label>
              <Input 
                type="number" 
                value={years.techLead}
                onChange={(e) => setYears({...years, techLead: Number(e.target.value)})}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <button
            type="button"
            onClick={() => setShowSalaries(!showSalaries)}
            className="text-sm text-primary-dark hover:text-black transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={showSalaries ? "chevron-up" : "chevron-down"} />
            Configure seu salário em cada fase
          </button>
          <p className="text-xs text-gray-500">
            Caso não configurar, usaremos pesquisas salariais recentes para definição
          </p>
          
          {showSalaries && (
            <div className="grid grid-cols-4 gap-4 pt-2">
              <div className="space-y-2">
                <Label><FontAwesomeIcon icon="graduation-cap" className="mr-2" />Júnior</Label>
                <CurrencyInput
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  prefix="R$ "
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  value={salaries.junior}
                  onValueChange={(value) => setSalaries({...salaries, junior: Number(value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label><FontAwesomeIcon icon="briefcase" className="mr-2" />Pleno</Label>
                <CurrencyInput
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  prefix="R$ "
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  value={salaries.pleno}
                  onValueChange={(value) => setSalaries({...salaries, pleno: Number(value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label><FontAwesomeIcon icon="rocket" className="mr-2" />Sênior</Label>
                <CurrencyInput
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  prefix="R$ "
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  value={salaries.senior}
                  onValueChange={(value) => setSalaries({...salaries, senior: Number(value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label><FontAwesomeIcon icon="crown" className="mr-2" />Tech Lead</Label>
                <CurrencyInput
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  prefix="R$ "
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  value={salaries.techLead}
                  onValueChange={(value) => setSalaries({...salaries, techLead: Number(value) || 0})}
                />
              </div>
            </div>
          )}
        </div>

        <Button className="w-full" onClick={handleCalculate} disabled={isCalculating}>
          <FontAwesomeIcon icon="calculator" className="mr-2" />
          {isCalculating ? 'Calculando...' : 'Calcular'}
        </Button>
      </CardContent>
    </Card>
  )
}
