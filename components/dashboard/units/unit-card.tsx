"use client"

import { motion } from 'framer-motion'
import { PropertyUnit } from '@/lib/types/unit'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Square } from 'lucide-react'
import Image from 'next/image'

interface UnitCardProps {
  unit: PropertyUnit
  onEdit: () => void
  onDelete: () => void
}

export default function UnitCard({ unit, onEdit, onDelete }: UnitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          {unit.images?.[0] && (
            <Image
              src={unit.images[0]}
              alt={unit.name}
              fill
              className="object-cover"
            />
          )}
          <Badge 
            className={`absolute top-2 right-2 ${
              unit.availability.isAvailable ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {unit.availability.isAvailable ? 'Available' : 'Occupied'}
          </Badge>
        </div>

        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{unit.name}</h3>
              <p className="text-sm text-gray-500">{unit.type}</p>
            </div>
            <p className="text-lg font-bold">${unit.rent.price}/mo</p>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <div className="flex gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {unit.size} sqft
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {unit.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary">
                {amenity}
              </Badge>
            ))}
            {unit.amenities.length > 3 && (
              <Badge variant="secondary">+{unit.amenities.length - 3} more</Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-red-600 hover:text-red-700"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}