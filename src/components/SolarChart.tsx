'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

interface ForecastData {
  ac_monthly: number[];
  solrad_monthly?: number[];
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function SolarChart({ data }: { data: ForecastData }) {
  if (!data || !data.ac_monthly) return null

  const chartData = data.ac_monthly.map((val: number, i: number) => ({
    month: months[i],
    ac_kwh: parseFloat(val.toFixed(2)),
    solrad: parseFloat(data.solrad_monthly?.[i]?.toFixed(2) || '0'),
  }))

  return (
    <div className="w-full h-[400px] mt-6">
      <h2 className="text-lg font-semibold mb-4">Estimated Monthly Output</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'kWh/m²/day', angle: -90, position: 'insideRight' }}
          />
          <Tooltip />
          <Bar yAxisId="left" dataKey="ac_kwh" fill="#60a5fa" name="AC Output (kWh)" />
          <Line yAxisId="right" type="monotone" dataKey="solrad" stroke="#facc15" name="Solar Radiation" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
