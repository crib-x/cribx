"use client"

import { Button } from "@/components/ui/button"
import { Users } from 'lucide-react'

interface RoommateHeroProps {
  onGetStarted: () => void
}

export default function RoommateHero({ onGetStarted }: RoommateHeroProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Roommate Match
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with compatible roommates based on lifestyle, preferences, and personality.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Users className="mr-2 h-5 w-5" />
              Start Matching Now
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
              alt="Students studying together"
              className="rounded-lg shadow-xl max-w-md w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}