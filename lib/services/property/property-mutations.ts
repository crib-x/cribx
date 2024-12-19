import { createClient } from '@/lib/supabase/client'
import { Property } from '@/lib/types/property'
import { propertyMediaService } from './property-media-service'

export const propertyMutations = {
  async createProperty(propertyData: Omit<Property, 'id'>) {
    const supabase = createClient()
    
    try {
      // Handle media uploads first
      const mediaUrls = await propertyMediaService.uploadMedia({
        images: propertyData.images || [],
        floorPlans: propertyData.floorPlan || [],
        unitMedia: propertyData.unitMedia || []
      })

      // Insert main property record
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          title: propertyData.title,
          address: propertyData.address,
          description: propertyData.description,
          type: propertyData.type,
          featured_image: propertyData.featuredImage,
          logo: propertyData.logo
        })
        .select()
        .single()

      if (propertyError) throw propertyError

      // Insert related records in parallel
      await Promise.all([
        // Specifications
        supabase.from('property_specs').insert({
          property_id: property.id,
          ...propertyData.specs
        }),

        // Parking
        supabase.from('property_parking').insert({
          property_id: property.id,
          ...propertyData.parking
        }),

        // Fees
        supabase.from('property_fees').insert(
          propertyData.fees.map(fee => ({
            property_id: property.id,
            ...fee
          }))
        ),

        // Pet Policy
        supabase.from('property_pet_policies').insert({
          property_id: property.id,
          ...propertyData.pet
        }),

        // Media
        supabase.from('property_media').insert([
          ...mediaUrls.images.map(url => ({
            property_id: property.id,
            type: 'image',
            url
          })),
          ...mediaUrls.floorPlans.map(url => ({
            property_id: property.id,
            type: 'floor_plan',
            url
          })),
          ...mediaUrls.unitMedia.map(url => ({
            property_id: property.id,
            type: 'unit_media',
            url
          }))
        ]),

        // Location
        propertyData.location && supabase.from('property_locations').insert({
          property_id: property.id,
          ...propertyData.location
        }),

        // Contact
        supabase.from('property_contacts').insert({
          property_id: property.id,
          ...propertyData.contact
        })
      ])

      return property.id
    } catch (error) {
      console.error('Error creating property:', error)
      throw error
    }
  },

  async updateProperty(id: string, propertyData: Partial<Property>) {
    const supabase = createClient()
    
    try {
      // Handle media updates if needed
      const mediaUrls = await propertyMediaService.uploadMedia({
        images: propertyData.images || [],
        floorPlans: propertyData.floorPlan || [],
        unitMedia: propertyData.unitMedia || [],
        onlyNewFiles: true
      })

      // Update main property record
      const { error: propertyError } = await supabase
        .from('properties')
        .update({
          title: propertyData.title,
          address: propertyData.address,
          description: propertyData.description,
          type: propertyData.type,
          featured_image: propertyData.featuredImage,
          logo: propertyData.logo
        })
        .eq('id', id)

      if (propertyError) throw propertyError

      // Update related records in parallel
      await Promise.all([
        // Update specifications
        propertyData.specs && supabase
          .from('property_specs')
          .upsert({
            property_id: id,
            ...propertyData.specs
          }),

        // Update parking
        propertyData.parking && supabase
          .from('property_parking')
          .upsert({
            property_id: id,
            ...propertyData.parking
          }),

        // Update media
        mediaUrls.images.length && supabase
          .from('property_media')
          .upsert(
            mediaUrls.images.map(url => ({
              property_id: id,
              type: 'image',
              url
            }))
          )
      ])

      return id
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  }
}