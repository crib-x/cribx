"use client"

import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { MapProps } from './types'

export default function PropertyMap({ lat, lng }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lat || !lng) return

    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDE7DHRRerTj8twjaBp0YW0c68JNSiSso8',
        version: 'weekly'
      })

      try {
        const { Map } = await loader.importLibrary('maps')
        if (mapRef.current) {
          new Map(mapRef.current, {
            center: { lat, lng },
            zoom: 15,
          })
        }
      } catch (error) {
        console.error('Error loading map:', error)
      }
    }

    initMap()
  }, [lat, lng])

  if (!lat || !lng) {
    return (
      <div className="h-[300px] bg-gray-100 flex items-center justify-center text-gray-500">
        Map location not available
      </div>
    )
  }

  return <div ref={mapRef} className="w-full h-[300px] rounded-lg" />
}