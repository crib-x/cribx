"use client"

import { Home, Users, ShoppingBag, Users2 } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: "Room and Apartment Listing",
    description: "Browse rooms and apartments tailored for you—filter by location, price, and amenities to find your next home!",
    color: "text-blue-500"
  },
  {
    icon: Users,
    title: "Find Your Roommate",
    description: "Find a compatible roommate with our matching service—connect with those who share your lifestyle and interests!",
    color: "text-green-500"
  },
  {
    icon: ShoppingBag,
    title: "Subleasing and Marketplace",
    description: "Explore flexible subleasing options and a marketplace for essentials—ideal for furnishing new spaces!",
    color: "text-purple-500"
  },
  {
    icon: Users2,
    title: "Community Engagement",
    description: "Join a vibrant community with events, discussions, and activities—connect with neighbors and build lasting friendships!",
    color: "text-orange-500"
  }
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect living space in Macomb. Browse rooms, apartments, and sublets. Connect with potential roommates and explore community events. Sell unwanted items and discover local resources. Your new home and community await.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={index}
                className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-full bg-gray-100 mr-4 ${service.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}