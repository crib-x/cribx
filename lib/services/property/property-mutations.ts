import { Charges, Fee, Property } from '@/lib/types/property'
import { MediaUploadResult, propertyMediaService } from './property-media-service'
import { createClient } from '@/lib/supabase/server'

export const propertyMutations = {
  async createProperty(propertyData: Omit<Property, 'id'>) {
    const supabase = await createClient()

    try {
      // Get current user session

      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      console.log('session', session)
      if (sessionError) throw sessionError

      if (!session?.user?.id) {
        throw new Error('Not authenticated')
      }
      // Insert main property record
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          title: propertyData.title,
          address: propertyData.address,
          description: propertyData.description,
          type: propertyData.type,
          featured_image: propertyData.featuredImage,
          logo: propertyData.logo,
          owner_id: session.user.id,
          contact_name: propertyData.contact_name,  // Add user_id
          contact_email: propertyData.contact_email,  // Add user_id
          contact_phone: propertyData.contact_phone,  // Add user_id
        })
        .select()
        .single()

      if (propertyError) throw propertyError
      return property
    } catch (error) {
      console.error('Error creating property:', error)
      throw error
    }
  },

  async updateProperty(id: string, propertyData: Partial<Property>) {
    const supabase = await createClient()

    try {
      // Get current user session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError

      if (!session?.user?.id) {
        throw new Error('Not authenticated')
      }

      const { error: propertyError } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', id)
        .eq('owner_id', session.user.id)  // Add this line for RLS

      if (propertyError) throw propertyError

      return id
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  },

  async getProperties() {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('properties')
      .select(`
          *,
          property_parking(*),
          property_incentives(*),
          property_fees(*),
          property_charges(*),
          property_media(*),
          property_locations(*),
          property_units(
            *,
            unit_rent_details(*),
            unit_availability(*)
          )
        `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data

  },

  async getPropertyById(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('properties')
      .select(`
          *,
          property_incentives(*),
          property_fees(*),
          property_charges(*),
          property_media(*),
          property_units(
            *,
            unit_rent_details(*),
            unit_availability(*)
          )
        `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },


  async deleteProperty(id: string) {
    const supabase = await createClient()

    try {
      // Get current user session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError

      if (!session?.user?.id) {
        throw new Error('Not authenticated')
      }

      // Delete related records in parallel
      await Promise.all([
        supabase.from('property_specs').delete().eq('property_id', id),
        supabase.from('property_parking').delete().eq('property_id', id),
        supabase.from('property_fees').delete().eq('property_id', id),
        supabase.from('property_pet_policies').delete().eq('property_id', id),
        supabase.from('property_media').delete().eq('property_id', id),
        supabase.from('property_locations').delete().eq('property_id', id),
        supabase.from('property_contacts').delete().eq('property_id', id),
        supabase.from('property_units').delete().eq('property_id', id)
      ])

      // Delete main property record
      const { error: propertyError } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)
        .eq('owner_id', session.user.id)  // Ensure RLS

      if (propertyError) throw propertyError

      return id
    } catch (error) {
      console.error('Error deleting property:', error)
      throw error
    }
  },

  async updatePropertyFees(data: Fee[]) {
    const supabase = await createClient()

    const { data: fees, error: feesError } = await supabase
      .from('property_fees')
      .upsert(data, { onConflict: 'id', ignoreDuplicates: false })
      .select()

    if (feesError) throw feesError
    return fees
  },

  async updatePropertyCharges(data: Charges[]) {
    const supabase = await createClient()
    console.log('data', data)
    const { data: fees, error: feesError } = await supabase
      .from('property_charges')
      .upsert(data, { onConflict: 'id', ignoreDuplicates: false })
      .select()

    if (feesError) throw feesError
    return fees
  },


  async uploadMedia(id: string, propertyData: Partial<Property>) {
    const supabase = await createClient()
    const mediaUrls: MediaUploadResult[] = await propertyMediaService.uploadMedia({
      images: propertyData.images || [],
      floorPlans: propertyData.floorPlan || [],
      unitMedia: propertyData.unitMedia || [],
      onlyNewFiles: true,
      property_id: id
    })
    console.log('mediaUrls', mediaUrls)

    const { data: propertyMedia, error: mediaError } = await supabase
      .from('property_media')
      .upsert(mediaUrls, { onConflict: 'id', ignoreDuplicates: false })
      .select()
    if (mediaError) throw mediaError.message
    return propertyMedia

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
  },

  // mapPropertyData(data: any[]): Property[] {
  //   return data.map(p => ({
  //     id: p.id,
  //     title: p.title,
  //     address: p.address,
  //     description: p.description,
  //     type: p.type,
  //     featuredImage: p.featured_image,
  //     logo: p.logo,
  //     specs: p.property_specs?.[0] || {},
  //     parking: p.property_parking?.[0] || {},
  //     incentives: {
  //       discount: p.property_incentives?.[0] || {}
  //     },
  //     fees: p.property_fees || [],
  //     pet: p.property_pet_policies?.[0] || {},
  //     charges: {
  //       water: p.property_charges?.filter((c: any) => c.type === 'water') || []
  //     },
  //     images: p.property_media?.filter((m: any) => m.type === 'image').map((m: any) => m.url) || [],
  //     floorPlan: p.property_media?.filter((m: any) => m.type === 'floor_plan').map((m: any) => m.url) || [],
  //     unitMedia: p.property_media?.filter((m: any) => m.type === 'unit_media').map((m: any) => m.url) || [],
  //     location: p.property_locations?.[0],
  //     contact: p.property_contacts?.[0] || {},
  //     units: p.property_units?.map(this.mapUnitData) || []
  //   }))
  // },
}