
"use client"

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FormWizard } from '@/components/ui/form-wizard'
import PropertyBasicForm from './forms/property-basic-form'
import PropertySpecsForm from './forms/property-specs-form'
import PropertyFeesForm from './forms/property-fees-form'
import PropertyMediaForm from './forms/property-media-form'
import { Property } from '@/lib/types/property'
import { useNotificationStore } from '@/lib/store/notifications-store'

const steps = [
  { id: 'basic', title: 'Basic Info' },
  { id: 'specs', title: 'Specifications' },
  { id: 'fees', title: 'Fees & Policies' },
  { id: 'media', title: 'Media' },
]

interface EditPropertyDialogProps {
  property: Property | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditPropertyDialog({ 
  property, 
  open, 
  onOpenChange 
}: EditPropertyDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    if (property) {
      setFormData(property)
    }
  }, [property])

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Submit to Supabase here
      console.log('Updated form data:', formData)
      addNotification({
        title: "Success",
        message: "Property updated successfully",
        type: "success"
      })
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to update property:', error)
      addNotification({
        title: "Error",
        message: "Failed to update property",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!property) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Property: {property.title}</DialogTitle>
        </DialogHeader>
        
        <FormWizard
          steps={steps}
          currentStep={currentStep}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        >
          {currentStep === 0 && (
            <PropertyBasicForm
              data={formData}
              onDataChange={setFormData}
              isEditing
            />
          )}
          {currentStep === 1 && (
            <PropertySpecsForm
              data={formData}
              onDataChange={setFormData}
              isEditing
            />
          )}
          {currentStep === 2 && (
            <PropertyFeesForm
              data={formData}
              onDataChange={setFormData}
              isEditing
            />
          )}
          {currentStep === 3 && (
            <PropertyMediaForm
              data={formData}
              onDataChange={setFormData}
              isEditing
            />
          )}
        </FormWizard>
      </DialogContent>
    </Dialog>
  )
}
