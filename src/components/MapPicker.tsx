'use client'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useState, useCallback } from 'react'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const defaultCenter = {
  lat: 21.3069,
  lng: -157.8583,
}

export default function MapPicker({
  onSelect,
}: {
  onSelect: (coords: { lat: number; lng: number }) => void
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  const [marker, setMarker] = useState(defaultCenter)

  const handleClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const coords = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        }
        setMarker(coords)
        onSelect(coords)
      }
    },
    [onSelect]
  )

  if (!isLoaded) return <p>Loading map...</p>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker}
      zoom={10}
      onClick={handleClick}
    >
      <Marker position={marker} />
    </GoogleMap>
  )
}
