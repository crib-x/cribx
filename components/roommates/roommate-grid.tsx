"use client"

import RoommateCard from './roommate-card'

const SAMPLE_ROOMMATES = [
  {
    name: "Alex",
    age: 20,
    occupation: "Computer Science Student",
    compatibility: 95,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    interests: ["Gaming", "Coding", "Music"],
    budget: 800
  },
  {
    name: "Sarah",
    age: 21,
    occupation: "Business Major",
    compatibility: 88,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    interests: ["Fitness", "Reading", "Travel"],
    budget: 900
  },
  {
    name: "Mike",
    age: 19,
    occupation: "Engineering Student",
    compatibility: 82,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    interests: ["Sports", "Photography", "Movies"],
    budget: 750
  }
]

export default function RoommateGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Potential Roommates
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_ROOMMATES.map((roommate, index) => (
            <RoommateCard key={index} {...roommate} />
          ))}
        </div>
      </div>
    </section>
  )
}