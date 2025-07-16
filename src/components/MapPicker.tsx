// components/MapPicker.tsx
'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useState, useCallback } from 'react'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: 21.3069,
  lng: -157.8583, // Default to Honolulu
}

export default function MapPicker({ onSelect }: { onSelect: (coords: { lat: number, lng: number }) => void }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: [], // ⛔ No street view or extras
  })

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null)

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const coords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
      setMarker(coords)
      onSelect(coords)
    }
  }, [onSelect])

  if (!isLoaded) return <p>Loading map...</p>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={onMapClick}
      options={{
        disableDefaultUI: true, // 🚫 Turn off all controls
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  )
}