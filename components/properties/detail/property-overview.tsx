"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bed, Bath, Square, Home } from 'lucide-react'

interface PropertyOverviewProps {
  property: {
    title: string
    address: string
    price: number
    beds: number
    baths: number
    sqft: number
    description: string
  }
}

export default function PropertyOverview({ property }: PropertyOverviewProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{property.title}</h2>
            <p className="text-gray-500">{property.address}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rent</p>
                <p className="font-semibold">${property.price}/mo</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Bed className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Beds</p>
                <p className="font-semibold">{property.beds}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Bath className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Baths</p>
                <p className="font-semibold">{property.baths}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Square className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Square Feet</p>
                <p className="font-semibold">{property.sqft}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{property.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}