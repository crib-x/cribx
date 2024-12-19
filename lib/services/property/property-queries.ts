import { createClient } from '@/lib/supabase/client'
import { Property } from '@/lib/types/property'

export const propertyQueries = {
  async getProperties() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_specs(*),
        property_parking(*),
        property_incentives(*),
        property_fees(*),
        property_pet_policies(*),
        property_charges(*),
        property_media(*),
        property_locations(*),
        property_contacts(*),
        property_units(
          *,
          unit_rent_details(*),
          unit_availability(*)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return this.mapPropertyData(data)
  },

  async getPropertyById(id: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_specs(*),
        property_parking(*),
        property_incentives(*),
        property_fees(*),
        property_pet_policies(*),
        property_charges(*),
        property_media(*),
        property_locations(*),
        property_contacts(*),
        property_units(
          *,
          unit_rent_details(*),
          unit_availability(*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    // return this.mapPropertyData([data])[0]
  },

  // Helper to map database response to Property type
  mapPropertyData(data: any[]) {
    // return data.map(p => ({
    //   id: p.id,
    //   title: p.title,
    //   address: p.address,
    //   description: p.description,
    //   type: p.type,
    //   featuredImage: p.featured_image,
    //   logo: p.logo,
    //   specs: p.property_specs?.[0] || {},
    //   parking: p.property_parking?.[0] || {},
    //   incentives: {
    //     discount: p.property_incentives?.[0] || {}
    //   },
    //   fees: p.property_fees || [],
    //   pet: p.property_pet_policies?.[0] || {},
    //   charges: {
    //     water: p.property_charges?.filter((c: any) => c.type === 'water') || []
    //   },
    //   images: p.property_media?.filter((m: any) => m.type === 'image').map((m: any) => m.url) || [],
    //   floorPlan: p.property_media?.filter((m: any) => m.type === 'floor_plan').map((m: any) => m.url) || [],
    //   unitMedia: p.property_media?.filter((m: any) => m.type === 'unit_media').map((m: any) => m.url) || [],
    //   location: p.property_locations?.[0],
    //   contact: p.property_contacts?.[0] || {},
    //   units: p.property_units?.map(this.mapUnitData) || []
    // }))
  },

  mapUnitData(unit: any) {
    return {
      id: unit.id,
      name: unit.name,
      type: unit.type,
      occupancy: unit.occupancy,
      size: unit.size,
      description: unit.description,
      floorPlan: unit.floor_plan,
      utilitiesIncluded: unit.utilities_included || [],
      rent: unit.unit_rent_details?.[0] || {},
      availability: unit.unit_availability?.[0] || {},
      amenities: unit.amenities || []
    }
  }
}