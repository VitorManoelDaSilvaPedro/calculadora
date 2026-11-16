import { PhaseCard } from "./PhaseCard"
import type { CareerPhase } from "@/types/calculator.types"

interface PhaseTimelineProps {
  phases: CareerPhase[]
}

export function PhaseTimeline({ phases }: PhaseTimelineProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {phases.map((phase, index) => (
        <PhaseCard key={index} {...phase} />
      ))}
    </div>
  )
}
