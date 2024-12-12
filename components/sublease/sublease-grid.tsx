"use client"

import SubleaseCard from './sublease-card'

const SAMPLE_SUBLEASES = [
  {
    title: "Spacious Studio Apartment",
    location: "Near University Campus",
    price: 750,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
    startDate: "Jun 1",
    endDate: "Aug 31",
    type: "Entire Unit"
  },
  {
    title: "Shared Room in 3BR House",
    location: "Downtown Area",
    price: 500,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
    startDate: "May 15",
    endDate: "Jul 30",
    type: "Shared Room"
  },
  {
    title: "Private Room in Apartment",
    location: "College District",
    price: 600,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
    startDate: "Jun 15",
    endDate: "Sep 1",
    type: "Private Room"
  }
]

export default function SubleaseGrid() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Available Subleases
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_SUBLEASES.map((sublease, index) => (
          <SubleaseCard key={index} {...sublease} />
        ))}
      </div>
    </div>
  )
}