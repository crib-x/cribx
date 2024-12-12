"use client"

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Find Your Perfect Student Home
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of students who have found their ideal housing and roommates
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder="Enter university or location..."
              className="flex-grow"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 min-w-[120px]">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { number: "10k+", label: "Happy Students" },
            { number: "5k+", label: "Properties Listed" },
            { number: "50+", label: "Universities" },
          ].map((stat, index) => (
            <div key={index} className="text-white">
              <p className="text-3xl font-bold">{stat.number}</p>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}