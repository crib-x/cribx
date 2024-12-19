"use client"

import { useEffect } from 'react'
import { usePropertyStore } from '@/lib/store/property-store'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import PropertyManagementTable from '@/components/dashboard/properties/property-management-table'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import AddPropertyDialog from '@/components/dashboard/properties/add-property-dialog'
import { LoadingState } from '@/components/ui/loading-state'
import { useRequireAuth } from '@/lib/auth/auth-hooks'

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddProperty, setShowAddProperty] = useState(false)
  const { properties, isLoading, fetchProperties } = usePropertyStore()
  const isAuthenticated = useRequireAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchProperties()
    }
  }, [fetchProperties, isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return <LoadingState message="Loading properties..." />
  }

  return (
    <div className="space-y-8">
      {/* <DashboardHeader
        title="Property Management"
        description="Manage your properties and units"
      /> */}

      {/* Property Table */}
      {/* <PropertyManagementTable searchTerm={searchTerm} /> */}
    </div>
  )
}
