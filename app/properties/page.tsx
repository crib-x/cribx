"use client"

import { useState } from 'react'
import PropertyFilters from '@/components/properties/property-filters'
import PropertyList from '@/components/properties/property-list'
import PropertySearch from '@/components/properties/property-search'
import { Button } from "@/components/ui/button"
import { Save, SlidersHorizontal } from 'lucide-react'

export default function PropertiesPage() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search and Actions */}
        <div className="mb-8">
          <PropertySearch />
          <div className="flex gap-4 mt-4">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <PropertyFilters />
          </div>

          {/* Property List */}
          <div className="lg:col-span-3">
            <PropertyList />
          </div>
        </div>
      </div>
    </div>
  )
}