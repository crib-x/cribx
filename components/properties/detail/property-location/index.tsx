"use client"

import { Card, CardContent } from "@/components/ui/card"
import PropertyMap from './map'
import { motion } from "framer-motion";
import NearbyPlaces from './nearby-places'
import { PropertyLocationProps } from './types'

export default function PropertyLocation({ location }: PropertyLocationProps) {
  if (!location) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          Location information not available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
        <div className="space-y-6">
          <PropertyMap lat={location.lat} lng={location.lng} />
          <NearbyPlaces nearby={location.nearby} />
        </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}