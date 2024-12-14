"use client"

import { MapPin, School, Coffee, Train } from 'lucide-react'
import { NearbyPlacesProps } from './types'

export default function NearbyPlaces({ nearby }: NearbyPlacesProps) {
  if (!nearby) return null

  const { schools = [], dining = [], transportation = [] } = nearby

  const sections = [
    {
      title: "Education",
      icon: School,
      items: schools,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Dining",
      icon: Coffee,
      items: dining,
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Transportation",
      icon: Train,
      items: transportation,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sections.map(({ title, icon: Icon, items, iconColor, bgColor }) => (
        items.length > 0 && (
          <div key={title}>
            <div className={`flex items-center space-x-2 mb-3`}>
              <div className={`p-2 rounded-lg ${bgColor}`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <ul className="space-y-2">
              {items.map((place, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{place}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  )
}