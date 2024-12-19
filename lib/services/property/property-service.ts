
import { Property } from '@/lib/types/property'
import { propertyQueries } from './property-queries'
import { propertyMutations } from './property-mutations'
import { unitService } from './unit-service'
import { createClient } from '@/lib/supabase/server'

export const propertyService = {
  // Query methods
  getProperties: propertyQueries.getProperties,
  getPropertyById: propertyQueries.getPropertyById,

  // Mutation methods
  createProperty: propertyMutations.createProperty,
  updateProperty: propertyMutations.updateProperty,
  deleteProperty: async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Unit operations
  units: unitService
}