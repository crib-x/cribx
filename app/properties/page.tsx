"use client"

import { useState } from 'react'
import { MOCK_PROPERTIES } from '@/lib/data/mock-properties'
import PropertyGrid from '@/components/properties/property-grid'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function PropertiesPage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    beds: 'any',
    propertyType: 'any',
    location: '',
    searchTerm: ''
  })

  const filteredProperties = MOCK_PROPERTIES.filter(property => {
    const matchesSearch = 
      property.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(filters.searchTerm.toLowerCase())
    
    const matchesLocation = !filters.location || 
      property.address.toLowerCase().includes(filters.location.toLowerCase())
    
    const matchesBeds = filters.beds === 'any' || 
      property.specs.beds === parseInt(filters.beds)
    
    const matchesPrice = 
      property.price.min >= filters.priceRange[0] && 
      property.price.max <= filters.priceRange[1]

    return matchesSearch && matchesLocation && matchesBeds && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Find Your Perfect Student Home</h1>
            <p className="mt-4 text-xl text-gray-600">
              Browse through our selection of student-friendly properties
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by location, property name, or features..."
                className="pl-10 h-12"
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              />
            </div>
          </div>

          {/* Filters */}
          {/* <PropertyFilters filters={filters} onChange={setFilters} /> */}

          {/* Results */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProperties.length} properties found
              </p>
              <Button variant="outline">
                Sort by: Featured
              </Button>
            </div>
            <PropertyGrid properties={filteredProperties} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
