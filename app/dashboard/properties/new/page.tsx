"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import PropertyWizard from '@/components/dashboard/properties/wizard/property-wizard'

export default function NewPropertyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSuccess = () => {
    router.push('/dashboard/properties')
  }

  return (
    <div className="space-y-6">

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <PropertyWizard 
            onSuccess={handleSuccess}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
