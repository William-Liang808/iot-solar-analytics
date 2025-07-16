'use client'

import { useState } from 'react'
import MapPicker from '@/components/MapPicker'
import SolarChart from '@/components/SolarChart'

interface ForecastData {
  ac_monthly: number[];
  dc_monthly?: number[];
  solrad_monthly?: number[];
  poa_monthly?: number[];
  ac_annual?: number;
  solrad_annual?: number;
  capacity_factor?: number;
}

export default function Page() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)

  const handleLocationSelect = async (coords: { lat: number; lng: number }) => {
    setCoords(coords)
    const res = await fetch(`/api/solar?lat=${coords.lat}&lon=${coords.lng}`)
    const data = await res.json()
    setForecast(data)
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Solar Forecast {coords ? JSON.stringify(coords) : ""}</h1>
      <MapPicker onSelect={handleLocationSelect} />
      {forecast && <SolarChart data={forecast} />}
    </main>
  )
}
