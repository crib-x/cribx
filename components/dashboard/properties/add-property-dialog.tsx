"use client"

import { useState } from 'react'
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
import { useNotificationStore } from '@/lib/store/notifications-store'

const steps = [
  { id: 'basic', title: 'Basic Info' },
  { id: 'specs', title: 'Specifications' },
  { id: 'fees', title: 'Fees & Policies' },
  { id: 'media', title: 'Media' },
]

interface AddPropertyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddPropertyDialog({ open, onOpenChange }: AddPropertyDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addNotification = useNotificationStore((state) => state.addNotification)

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
      console.log('Form data:', formData)
      addNotification({
        title: "Success",
        message: "Property added successfully",
        type: "success"
      })
      onOpenChange(false)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
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
            />
          )}
          {currentStep === 1 && (
            <PropertySpecsForm
              data={formData}
              onDataChange={setFormData}
            />
          )}
          {currentStep === 2 && (
            <PropertyFeesForm
              data={formData}
              onDataChange={setFormData}
            />
          )}
          {currentStep === 3 && (
            <PropertyMediaForm
              data={formData}
              onDataChange={setFormData}
            />
          )}
        </FormWizard>
      </DialogContent>
    </Dialog>
  )
}
