
"use client"

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { usePropertyStore } from '@/lib/store/property-store'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UnitList from '@/components/dashboard/units/unit-list'
import { LoadingState } from '@/components/ui/loading-state'
import { useRequireAuth } from '@/lib/auth/auth-hooks'

export default function PropertyUnitsPage() {
  const params = useParams()
  const propertyId = params.id as string
  const { selectedProperty, isLoading, fetchPropertyById } = usePropertyStore()
  const isAuthenticated = useRequireAuth()

  useEffect(() => {
    if (isAuthenticated && propertyId) {
      fetchPropertyById(propertyId)
    }
  }, [fetchPropertyById, propertyId, isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return <LoadingState message="Loading property details..." />
  }

  if (!selectedProperty) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Property Not Found</h2>
        <p className="mt-2 text-gray-600">The property you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={`Units - ${selectedProperty.title}`}
        description="Manage units for this property"
      />

      <UnitList
        propertyId={propertyId}
        units={selectedProperty.units || []}
       
      />
    </div>
  )
}