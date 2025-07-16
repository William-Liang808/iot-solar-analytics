// /lib/getSolarForecast.ts
export async function getSolarForecast() {
  const res = await fetch(`https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${process.env.NREL_API_KEY}&system_capacity=4&module_type=1&array_type=1&azimuth=180&tilt=20&lat=21.3069&lon=-157.8583&losses=14`)
  const json = await res.json()
  return json.outputs
}