// src/app/api/solar/route.ts

import { NextResponse } from 'next/server'
import { getSolarForecast } from '@/lib/getSolarForecast'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat/lon' }, { status: 400 })
  }

  try {
    const data = await getSolarForecast({ lat, lon }) // <-- pass coords
    return NextResponse.json(data)
  } catch (err) {
    console.error('NREL fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch solar data' }, { status: 500 })
  }
}