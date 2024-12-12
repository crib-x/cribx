"use client"

import { useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Loader } from '@googlemaps/js-api-loader'
import { MapPin, School, Coffee, Train } from 'lucide-react'

interface PropertyLocationProps {
  location: {
    lat: number
    lng: number
    nearby: {
      schools: string[]
      dining: string[]
      transportation: string[]
    }
  }
}

export default function PropertyLocation({ location }: PropertyLocationProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      })

      const { Map } = await loader.importLibrary('maps')

      if (mapRef.current) {
        new Map(mapRef.current, {
          center: { lat: location.lat, lng: location.lng },
          zoom: 15,
        })
      }
    }

    initMap()
  }, [location])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Map */}
          <div ref={mapRef} className="w-full h-[300px] rounded-lg" />

          {/* Nearby Places */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <School className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Education</h3>
              </div>
              <ul className="space-y-2">
                {location.nearby.schools.map((place, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Coffee className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Dining</h3>
              </div>
              <ul className="space-y-2">
                {location.nearby.dining.map((place, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Train className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Transportation</h3>
              </div>
              <ul className="space-y-2">
                {location.nearby.transportation.map((place, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}