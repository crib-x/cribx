import { Property } from '../types/property'
import { PropertyUnit } from '../types/unit'

export function calculateOccupancyRate(units: PropertyUnit[]): number {
  if (!units?.length) return 0
  const occupiedUnits = units.filter(unit => !unit.availability.isAvailable)
  return (occupiedUnits.length / units.length) * 100
}

export function calculateTotalRevenue(units: PropertyUnit[]): number {
  return units?.reduce((total, unit) => {
    if (!unit.availability.isAvailable) {
      return total + unit.rent.price
    }
    return total
  }, 0) || 0
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function getPropertyMetrics(property: Property) {
  const units = property.units || []
  const occupancyRate = calculateOccupancyRate(units)
  const monthlyRevenue = calculateTotalRevenue(units)
  const totalUnits = units.length
  const availableUnits = units.filter(unit => unit.availability.isAvailable).length

  return {
    occupancyRate,
    monthlyRevenue,
    totalUnits,
    availableUnits
  }
}

export function sortProperties(
  properties: Property[],
  sortBy: string,
  sortOrder: 'asc' | 'desc' = 'asc'
): Property[] {
  return [...properties].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title)
        break
      case 'price':
        comparison = a.price.min - b.price.min
        break
      case 'units':
        comparison = (a.units?.length || 0) - (b.units?.length || 0)
        break
      case 'occupancy':
        comparison = calculateOccupancyRate(a.units || []) - calculateOccupancyRate(b.units || [])
        break
      default:
        return 0
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })
}

export function filterProperties(
  properties: Property[],
  filters: {
    searchTerm?: string
    priceRange?: [number, number]
    type?: string
    amenities?: string[]
  }
): Property[] {
  return properties.filter(property => {
    // Search term filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase()
      const matchesSearch = 
        property.title.toLowerCase().includes(searchTerm) ||
        property.address.toLowerCase().includes(searchTerm)
      if (!matchesSearch) return false
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      if (property.price.min > max || property.price.max < min) return false
    }

    // Property type filter
    if (filters.type && filters.type !== 'any') {
      if (property.type !== filters.type) return false
    }

    // Amenities filter
    if (filters.amenities?.length) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        property.amenities.includes(amenity)
      )
      if (!hasAllAmenities) return false
    }

    return true
  })
}