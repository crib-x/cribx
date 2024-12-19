"use client"

import { motion } from 'framer-motion'
import { Property } from '@/lib/types/property'
import PropertyCard from './property-card'

interface PropertyGridProps {
  properties: Property[]
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <div className="flex flex-wrap gap-8 justify-center py-4">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="w-full md:w-1/2 lg:w-1/3"
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </div>
  )
}
