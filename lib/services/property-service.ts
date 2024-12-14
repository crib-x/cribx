import { createClient } from '../supabase/client'
import { PropertyFormData } from '../schemas/property-schemas'

export const propertyService = {
  async createProperty(data: PropertyFormData, userId: string) {
    const supabase = createClient()

    // Upload images first
    const imageUrls = await Promise.all(
      data.images.map(async (file: File) => {
        const fileName = `${userId}/${Date.now()}-${file.name}`
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('property-images')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase
          .storage
          .from('property-images')
          .getPublicUrl(fileName)

        return publicUrl
      })
    )

    // Create property record
    const { data: property, error } = await supabase
      .from('properties')
      .insert([{
        user_id: userId,
        name: data.title,
        address: data.address,
        description: data.description,
        type: 'apartment', // You can make this dynamic
        price_range: data.price,
        features: data.communityFeatures,
        pet_policy: data.pet,
        parking_policy: data.parking,
        charges: data.charges,
        incentives: data.incentives,
        fees: data.fees,
        images: imageUrls,
        floor_plans: data.floorPlan,
        videos: data.videos,
        status: 'active'
      }])
      .select()
      .single()

    if (error) throw error
    return property
  },

  async updateProperty(id: number, data: Partial<PropertyFormData>, userId: string) {
    const supabase = createClient()

    // Handle image uploads if there are new images
    let imageUrls: string[] = []
    if (data.images?.length) {
      imageUrls = await Promise.all(
        data.images.map(async (file: File) => {
          const fileName = `${userId}/${Date.now()}-${file.name}`
          const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('property-images')
            .upload(fileName, file)

          if (uploadError) throw uploadError

          const { data: { publicUrl } } = supabase
            .storage
            .from('property-images')
            .getPublicUrl(fileName)

          return publicUrl
        })
      )
    }

    // Update property record
    const { data: property, error } = await supabase
      .from('properties')
      .update({
        ...(data.title && { name: data.title }),
        ...(data.address && { address: data.address }),
        ...(data.description && { description: data.description }),
        ...(data.price && { price_range: data.price }),
        ...(data.communityFeatures && { features: data.communityFeatures }),
        ...(data.pet && { pet_policy: data.pet }),
        ...(data.parking && { parking_policy: data.parking }),
        ...(data.charges && { charges: data.charges }),
        ...(data.incentives && { incentives: data.incentives }),
        ...(data.fees && { fees: data.fees }),
        ...(imageUrls.length && { images: imageUrls }),
        ...(data.floorPlan && { floor_plans: data.floorPlan }),
        ...(data.videos && { videos: data.videos })
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return property
  },

  async deleteProperty(id: number, userId: string) {
    const supabase = createClient()

    // Delete property images from storage
    const { data: property, error: fetchError } = await supabase
      .from('properties')
      .select('images')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (fetchError) throw fetchError

    if (property.images?.length) {
      // Extract file names from URLs and delete from storage
      const fileNames = property.images.map((url: string) => url.split('/').pop())
      const { error: deleteStorageError } = await supabase
        .storage
        .from('property-images')
        .remove(fileNames)

      if (deleteStorageError) throw deleteStorageError
    }

    // Delete property record
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) throw error
  },

  async getProperties(userId: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        units (
          id,
          number,
          status,
          rent
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getProperty(id: number, userId: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        units (
          *
        )
      `)
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  }
}
