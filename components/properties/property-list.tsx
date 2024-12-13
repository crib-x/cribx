"use client"

import PropertyCard from './property-card'

const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: "Luxury Student Apartment",
    address: "123 University Ave",
    price: 1200,
    images: [
      '/turnberry/Turnberry1.jpg', '/turnberry/Turnberry2.jpg', '/turnberry/Turnberry3.jpg'
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
      '/turnberry/Turnberry1.jpg', '/turnberry/Turnberry2.jpg', '/turnberry/Turnberry3.jpg'
    ],
    beds: 1,
    baths: 1,
    sqft: 500,
    highlights: ["Furnished", "Utilities Included"]
  },
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
      {/* <div className="flex justify-center items-center gap-2 mt-8">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline">1</Button>
        <Button>2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div> */}
    </div>
  )
}