"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useNotificationStore } from '@/lib/store/notifications-store'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import PropertyWizard from '@/components/dashboard/properties/wizard/property-wizard'
import { LoadingState } from '@/components/ui/loading-state'
import { getPropertyById } from '@/app/actions/properties'
import { Property } from '@/lib/types/property'

export default function EditPropertyPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params.id as string
  const [loading, setLoading] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState({} as Property)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
       const data = await getPropertyById(propertyId)
       console.log(data)
       setSelectedProperty(data)
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
      finally{
       setLoading(false)
      }
    };

    fetchProperties();
  }, []);

  const handleSuccess = () => {
    addNotification({
      title: "Success",
      message: "Property updated successfully",
      type: "success"
    })
    router.push('/dashboard/properties')
  }

  if (loading) {
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
      <DashboardHeader 
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
      </motion.div>
    </div>
  )
}