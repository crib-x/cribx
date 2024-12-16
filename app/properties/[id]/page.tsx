"use client"

import { useEffect, useState } from 'react'
import { MOCK_PROPERTIES } from '@/lib/data/mock-properties'
import PropertyDetail from '@/components/properties/property-detail'
import { LoadingState } from '@/components/ui/loading-state'
import { useParams } from 'next/navigation'
import { Property } from '@/lib/types/property'

export default function PropertyDetailPage() {
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        const found = MOCK_PROPERTIES.find(p => p.id.toString() === params.id)
        
        // Add default location data if not present
        if (found) {
          const propertyWithDefaults: Property = {
            ...found,
            location: {
              lat: 40.7128,
              lng: -74.0060,
              nearby: {
                schools: ["Sample University", "Local High School"],
                dining: ["Restaurant A", "Cafe B"],
                transportation: ["Bus Station", "Train Station"]
              }
            }
          }
          setProperty(propertyWithDefaults)
        }
      } catch (error) {
        console.error('Failed to fetch property:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProperty()
    }
  }, [params.id])

  if (isLoading) {
    return <LoadingState message="Loading property details..." />
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Property Not Found</h1>
            <p className="mt-2 text-gray-600">
              The property you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <PropertyDetail property={property} />
    </div>
  )
}