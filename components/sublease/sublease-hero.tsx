"use client"

import { Button } from "@/components/ui/button"
import { Home, ShoppingBag } from 'lucide-react'

export default function SubleaseHero() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find or Offer Subleases with Ease
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Explore flexible housing options and buy/sell essentials in our student marketplace
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-purple-50"
              >
                <Home className="mr-2 h-5 w-5" />
                List Sublease
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Sell Item
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1527359443443-84a48aec73d2?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
              alt="Student apartment"
              className="rounded-lg shadow-xl max-w-md w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}