import PropertyDetailClient from '@/components/properties/detail/property-detail-client'

// Sample data - would normally come from an API
const PROPERTY_DATA = {
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
  description: "Luxurious student apartment featuring modern amenities and prime location near campus.",
  features: {
    community: ["Pool", "Fitness Center", "Study Rooms", "Package Lockers"],
    apartment: ["In-Unit Laundry", "Dishwasher", "Central AC", "Walk-in Closet"]
  },
  location: {
    lat: 40.7128,
    lng: -74.0060,
    nearby: {
      schools: ["University Campus - 0.2 miles", "Library - 0.5 miles"],
      dining: ["Student Center - 0.3 miles", "Restaurant Row - 0.7 miles"],
      transportation: ["Bus Stop - 0.1 miles", "Train Station - 0.8 miles"]
    }
  },
  incentives: {
    deposit: 99,
    applicationFee: 30,
    special: "$500 off first month's rent"
  }
}

export function generateStaticParams() {
  // In a real application, this would fetch all property IDs from an API
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

export default function PropertyDetailPage() {
  return <PropertyDetailClient property={PROPERTY_DATA} />
}