// src/app/api/solar/route.ts

import { NextResponse } from 'next/server'
import { getSolarForecast } from '@/lib/getSolarForecast'

export async function GET() {
  try {
    const data = await getSolarForecast()
    return NextResponse.json(data)
  } catch (err) {
    console.error('NREL fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch solar data' }, { status: 500 })
  }
}