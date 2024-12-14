"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Property } from '@/lib/types/property'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyGallery from './detail/property-gallery'
import PropertyOverview from './detail/property-overview'
import PropertyFeatures from './detail/property-features'
import PropertyLocation from './detail/property-location'
import { 
  Building, 
  DollarSign, 
  Car, 
  PawPrint, 
  MessageSquare,
  Home
} from 'lucide-react'
import PropertyContact from './detail/property-contact'
import PropertyIncentives from './detail/property-incentives'
import PropertyUnit from './propert-units'

interface PropertyDetailProps {
  property: Property
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)

  const availableUnits = property.units.filter(
    unit => unit.availability.isAvailable
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Property Gallery */}
        <PropertyGallery images={property.images} />

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <Building className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Property Type</p>
                <p className="font-medium">{property.}</p>
              </div>
            </CardContent>
          </Card> */}
          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Incentives</p>
                <p className="font-medium">{property.incentives.discount.title}</p>
              </div>
            </CardContent>
          </Card>
          { property.fees.map((fee, index) =>
            <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <Car className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">{fee.title}</p>
                {/* <p className="font-medium">{property.parking.type || "N/A"}</p>? */}
                <p className="font-medium">${fee.amount}</p>
              </div>
            </CardContent>
          </Card> 
            )}
        
          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <PawPrint className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Pets</p>
                <p className="font-medium">{property.pet.allowed ? 'Allowed' : 'Not Allowed'}</p>
                {/* {property.pet.typesAllowed.map((item)=> {
                  return <span className="text-sm text-gray-500">{item}</span>
                })} */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="units">Units</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <PropertyOverview property={property} />
              </TabsContent>

              <TabsContent value="features">
                <PropertyFeatures features={property.features || {}} />
              </TabsContent>

              <TabsContent value="location">
                {property.location && <PropertyLocation location={property.location} />}
              </TabsContent>

              <TabsContent value="units">
               <PropertyUnit property={property} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Property</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Home className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{property.contact.name}</p>
                      <p className="text-sm text-gray-500">{property.contact.phone}</p>
                    </div>
                  </div>
                  <PropertyContact property={property} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
