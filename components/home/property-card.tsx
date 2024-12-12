"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Wifi } from 'lucide-react'

interface PropertyCardProps {
  title: string
  address: string
  price: number
  image: string
  beds: number
  baths: number
  amenities: string[]
  index: number
}

export default function PropertyCard({
  title,
  address,
  price,
  image,
  beds,
  baths,
  amenities,
  index
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">{title}</h3>
              <p className="text-sm text-gray-500">{address}</p>
            </div>
            <p className="text-lg font-bold text-blue-600">${price}/mo</p>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex gap-4 mb-3">
            <div className="flex items-center text-gray-600">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{beds} Beds</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{baths} Baths</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}