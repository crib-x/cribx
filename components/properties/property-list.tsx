"use client"

import PropertyCard from './property-card'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: "Luxury Student Apartment",
    address: "123 University Ave",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80"
    ],
    beds: 2,
    baths: 2,
    sqft: 900,
    highlights: ["Pet Friendly", "In-Unit Laundry", "Pool"]
  },
  {
    id: 2,
    title: "Modern Campus Studio",
    address: "456 College St",
    price: 950,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80"
    ],
    beds: 1,
    baths: 1,
    sqft: 500,
    highlights: ["Furnished", "Utilities Included"]
  },
  {
    id: 3,
    title: "Spacious Student House",
    address: "789 Academic Dr",
    price: 1500,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80"
    ],
    beds: 4,
    baths: 2,
    sqft: 1500,
    highlights: ["Backyard", "Garage", "Study Room"]
  }
]

export default function PropertyList() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline">1</Button>
        <Button>2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}