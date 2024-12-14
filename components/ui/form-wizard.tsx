
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Progress } from './progress'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Step {
  id: string
  title: string
}

interface FormWizardProps {
  steps: Step[]
  currentStep: number
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
  children: React.ReactNode
  isSubmitting?: boolean
}

export function FormWizard({
  steps,
  currentStep,
  onNext,
  onPrev,
  onSubmit,
  children,
  isSubmitting = false
}: FormWizardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Progress value={(currentStep + 1) * (100 / steps.length)} className="h-2" />
        <div className="mt-4 flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`text-sm ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          ) : (
            <Button type="button" onClick={onNext}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}