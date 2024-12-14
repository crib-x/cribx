"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Property } from '@/lib/types/property'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bed, Bath, Square, DollarSign } from 'lucide-react'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const availableUnits = property.units.filter(unit => unit.status === 'available')

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group">
      <div className="relative h-48">
        <Image
          src={property.featuredImage}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          {/* <p className="text-white font-semibold">{property.title}</p>
          <p className="text-white/80 text-sm">{property.address}</p> */}
        </div>
      </div>

      <CardContent className="p-4">
        {/* <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-blue-600">${property.price.min}/mo</p>
          </div>
          <Badge variant="secondary">
            {availableUnits.length} {availableUnits.length === 1 ? 'Unit' : 'Units'} Available
          </Badge>
        </div> */}

        {/* <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-gray-400" />
            <span>{property.specs.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-gray-400" />
            <span>{property.specs.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4 text-gray-400" />
            <span>{property.specs.sqft} sqft</span>
          </div>
        </div> */}

<div  className='mb-3'>
          <p className=" font-semibold">{property.title}</p>
          <p className="text-sm">{property.address}</p>
        </div>

        <div className="flex gap-2">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
