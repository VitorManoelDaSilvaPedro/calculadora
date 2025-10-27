import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { CareerPhase } from '@/types/calculator.types'

const PHASE_COLORS: Record<string, string> = {
  'Júnior': '#001F3F',
  'Pleno': '#0066FF',
  'Sênior': '#4A90E2',
  'Tech Lead': '#000000'
}

interface PhaseChartProps {
  phases: CareerPhase[]
}

export function PhaseChart({ phases }: PhaseChartProps) {
  const data = phases.map(phase => ({
    name: phase.name,
    total: phase.totalAccumulated,
    investido: phase.totalInvested,
    juros: phase.interestEarned
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-primary-dark mb-2">{data.name}</p>
          <p className="text-sm text-gray-600">
            Total Acumulado: <span className="font-semibold text-black">
              R$ {data.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Investido: <span className="font-semibold">
              R$ {data.investido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Juros: <span className="font-semibold text-green-600">
              R$ {data.juros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#000', fontSize: 12 }}
          axisLine={{ stroke: '#e5e5e5' }}
        />
        <YAxis 
          tick={{ fill: '#666', fontSize: 12 }}
          axisLine={{ stroke: '#e5e5e5' }}
          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
        <Bar dataKey="total" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PHASE_COLORS[entry.name]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
