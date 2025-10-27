import { useState } from "react"
import { ConfigPanel } from "@/components/Calculator/ConfigPanel"
import { PhaseTimeline } from "@/components/Calculator/PhaseTimeline"
import { ResultSummary } from "@/components/Calculator/ResultSummary"
import type { CalculatorResult } from "@/types/calculator.types"

export function CalculatorPage() {
  const [result, setResult] = useState<CalculatorResult | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <ConfigPanel onCalculate={setResult} />
        {result && (
          <>
            <PhaseTimeline phases={result.phases} />
            <ResultSummary result={result} />
          </>
        )}
      </div>
    </div>
  )
}
