"use client"

import { useState } from 'react'
import PropertyGallery from './property-gallery'
import PropertyIncentives from './property-incentives'
import PropertyOverview from './property-overview'
import PropertyFeatures from './property-features'
import PropertyLocation from './property-location'
import PropertyContact from './property-contact'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PropertyDetailClientProps {
  property: {
    id: number
    title: string
    address: string
    price: number
    images: string[]
    beds: number
    baths: number
    sqft: number
    description: string
    features: {
      community: string[]
      apartment: string[]
    }
    location: {
      lat: number
      lng: number
      nearby: {
        schools: string[]
        dining: string[]
        transportation: string[]
      }
    }
    incentives: {
      deposit: number
      applicationFee: number
      special: string
    }
  }
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Property Gallery */}
        <PropertyGallery images={property.images} />

        {/* Main Content */}
        <div className="px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyIncentives incentives={property.incentives} />
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <PropertyOverview property={property} />
                </TabsContent>
                <TabsContent value="features">
                  <PropertyFeatures features={property.features} />
                </TabsContent>
                <TabsContent value="location">
                  <PropertyLocation location={property.location} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <PropertyContact property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}