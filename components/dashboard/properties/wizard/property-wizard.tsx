"use client"

import { useState } from 'react'
import { FormWizard } from '@/components/ui/form-wizard'
import PropertyBasicForm from './steps/property-basic-form'
import PropertySpecsForm from './steps/property-specs-form'
import PropertyFeesForm from './steps/property-fees-form'
import PropertyMediaForm from './steps/property-media-form'
import { usePropertyStore } from '@/lib/store/property-store'
import { useNotificationStore } from '@/lib/store/notifications-store'
import { Property } from '@/lib/types/property'

const steps = [
  { id: 'basic', title: 'Basic Info' },
  { id: 'specs', title: 'Specifications' },
  { id: 'fees', title: 'Fees & Policies' },
  { id: 'media', title: 'Media' },
]

interface PropertyWizardProps {
  initialData?: Partial<Property>
  onSuccess: () => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
  mode?: 'create' | 'edit'
}

export default function PropertyWizard({ 
  initialData,
  onSuccess,
  isSubmitting,
  setIsSubmitting,
  mode = 'create'
}: PropertyWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<Property>>(initialData || {})
  const { createProperty, updateProperty } = usePropertyStore()
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
      if (mode === 'edit' && initialData?.id) {
        await updateProperty(initialData.id as any, formData)
        addNotification({
          title: "Success",
          message: "Property updated successfully",
          type: "success"
        })
      } else {
        await createProperty(formData as Omit<Property, 'id'>)
        addNotification({
          title: "Success",
          message: "Property created successfully",
          type: "success"
        })
      }
      onSuccess()
    } catch (error) {
      console.error('Failed to handle property:', error)
      addNotification({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to handle property",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStepDataChange = (stepData: Partial<Property>) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }))
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
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
            onDataChange={handleStepDataChange}
            mode={mode}
          />
        )}
        {currentStep === 1 && (
          <PropertySpecsForm
            data={formData}
            onDataChange={handleStepDataChange}
            mode={mode}
          />
        )}
        {currentStep === 2 && (
          <PropertyFeesForm
            data={formData}
            onDataChange={handleStepDataChange}
          />
        )}
        {currentStep === 3 && (
          <PropertyMediaForm
            data={formData}
            onDataChange={handleStepDataChange}
          />
        )}
      </FormWizard>
    </div>
  )
}
