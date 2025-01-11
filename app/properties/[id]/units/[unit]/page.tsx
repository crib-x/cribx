"use client"

import { useEffect, useState } from 'react'
import { MOCK_PROPERTIES } from '@/lib/data/mock-properties'
import { LoadingState } from '@/components/ui/loading-state'
import { useParams } from 'next/navigation'
import { Property } from '@/lib/types/property'
import PropertyUnitDetail from '@/components/properties/property-unit-detail'

export default function PropertyDetailPage() {
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true)
      try {
        console.log('params.id', params)
        // In a real app, this would be an API call
        const found = MOCK_PROPERTIES.find(p => p.id.toString() === params.id)
        
        // Add default location data if not present
        if (found) {
          setProperty(found)
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
            <h1 className="text-2xl font-bold text-gray-900">Unit Not Found</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <PropertyUnitDetail propertyId={params.id as string} unitId={params.unit as string} />
    </div>
  )
}