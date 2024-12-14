"use client";

import PropertyList from '@/components/properties/property-grid'
import { MOCK_PROPERTIES } from '@/lib/data/mock-properties';


export default function PropertyGrid() {

  const filteredProperties = MOCK_PROPERTIES
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
        <PropertyList properties={filteredProperties} />
      </div>
    </section>
  );
}
