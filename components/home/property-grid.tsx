"use client"

import PropertyCard from './property-card'

const SAMPLE_PROPERTIES = [
  {
    title: "Modern Student Apartment",
    address: "123 University Ave",
    price: 850,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
    beds: 2,
    baths: 1,
    amenities: ["WiFi", "Laundry", "Parking"]
  },
  {
    title: "Cozy Studio Near Campus",
    address: "456 College St",
    price: 700,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
    beds: 1,
    baths: 1,
    amenities: ["Furnished", "Utilities Included"]
  },
  {
    title: "Shared Student House",
    address: "789 Academic Dr",
    price: 600,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
    beds: 4,
    baths: 2,
    amenities: ["WiFi", "Garden", "Study Room"]
  }
]

export default function PropertyGrid() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium student accommodations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_PROPERTIES.map((property, index) => (
            <PropertyCard key={index} {...property} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}