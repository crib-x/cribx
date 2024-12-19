"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { usePropertyStore } from '@/lib/store/property-store'
import { useNotificationStore } from '@/lib/store/notifications-store'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import PropertyWizard from '@/components/dashboard/properties/wizard/property-wizard'
import { LoadingState } from '@/components/ui/loading-state'

export default function EditPropertyPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params.id as string
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { selectedProperty, isLoading, fetchPropertyById, updateProperty } = usePropertyStore()
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    if (propertyId) {
      fetchPropertyById(propertyId)
    }
  }, [propertyId, fetchPropertyById])

  const handleSuccess = () => {
    addNotification({
      title: "Success",
      message: "Property updated successfully",
      type: "success"
    })
    router.push('/dashboard/properties')
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
    <div className="space-y-6">
      {/* <DashboardHeader 
        title={`Edit Property - ${selectedProperty.title}`}
        description="Update property details and information."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PropertyWizard 
          initialData={selectedProperty}
          onSuccess={handleSuccess}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          mode="edit"
        />
      </motion.div> */}
    </div>
  )
}