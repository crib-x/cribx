"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check } from 'lucide-react'

interface PropertyFeaturesProps {
  features: {
    community: string[]
    apartment: string[]
  }
}

export default function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Community Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.community.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="p-1 rounded-full bg-green-100 text-green-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Apartment Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.apartment.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}