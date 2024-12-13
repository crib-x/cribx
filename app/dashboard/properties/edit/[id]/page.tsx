"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PropertyForm from '@/components/dashboard/properties/property-form'
import { usePropertyStore } from '@/lib/store/property-store'
import { useNotificationStore } from '@/lib/store/notifications-store'
import DashboardHeader from '@/components/dashboard/dashboard-header'

export default function AddPropertyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const addProperty = usePropertyStore((state) => state.addProperty)
  const addNotification = useNotificationStore((state) => state.addNotification)

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)
    try {
      await addProperty(formData)
      addNotification({
        title: "Success",
        message: "Property added successfully",
        type: "success"
      })
      router.push('/dashboard/properties')
    } catch (error) {
      console.error('Failed to add property:', error)
      addNotification({
        title: "Error",
        message: "Failed to add property",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Add New Property"
        description="Add a new property to your portfolio"
      />
      <PropertyForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}