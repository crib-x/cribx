import { createClient } from '@/lib/supabase/client'
import { PropertyUnit } from '@/lib/types/unit'

export const unitService = {
  async createUnit(propertyId: string, unitData: Omit<PropertyUnit, 'id'>) {
    const supabase = createClient()
    
    try {
      // Insert main unit record
      const { data: unit, error: unitError } = await supabase
        .from('property_units')
        .insert({
          property_id: propertyId,
          name: unitData.name,
          type: unitData.type,
          occupancy: unitData.occupancy,
          size: unitData.size,
          description: unitData.description,
          floor_plan: unitData.floorPlan,
          utilities_included: unitData.utilitiesIncluded
        })
        .select()
        .single()

      if (unitError) throw unitError

      // Insert related records in parallel
      await Promise.all([
        // Rent details
        supabase.from('unit_rent_details').insert({
          unit_id: unit.id,
          ...unitData.rent
        }),

        // Availability
        supabase.from('unit_availability').insert({
          unit_id: unit.id,
          ...unitData.availability
        })
      ])

      return unit.id
    } catch (error) {
      console.error('Error creating unit:', error)
      throw error
    }
  },

  async updateUnit(id: string, unitData: Partial<PropertyUnit>) {
    const supabase = createClient()
    
    try {
      // Update main unit record
      const { error: unitError } = await supabase
        .from('property_units')
        .update({
          name: unitData.name,
          type: unitData.type,
          occupancy: unitData.occupancy,
          size: unitData.size,
          description: unitData.description,
          floor_plan: unitData.floorPlan,
          utilities_included: unitData.utilitiesIncluded
        })
        .eq('id', id)

      if (unitError) throw unitError

      // Update related records in parallel
      await Promise.all([
        // Update rent details
        unitData.rent && supabase
          .from('unit_rent_details')
          .upsert({
            unit_id: id,
            ...unitData.rent
          }),

        // Update availability
        unitData.availability && supabase
          .from('unit_availability')
          .upsert({
            unit_id: id,
            ...unitData.availability
          })
      ])

      return id
    } catch (error) {
      console.error('Error updating unit:', error)
      throw error
    }
  },

  async deleteUnit(id: string) {
    const supabase = createClient()
    
    try {
      const { error } = await supabase
        .from('property_units')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting unit:', error)
      throw error
    }
  }
}