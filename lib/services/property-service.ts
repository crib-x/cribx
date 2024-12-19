// import { Property } from '../types/property'
// import { propertyQueries } from './database/property-queries'
// import { storageService } from './storage/storage-service'

// export const propertyService = {
//   async getProperties() {
//     return await propertyQueries.getProperties()
//   },

//   async getPropertyById(id: string) {
//     return await propertyQueries.getPropertyById(id)
//   },

//   async createProperty(property: Omit<Property, 'id'>) {
//     const supabase = createClient()
    
//     // Start a transaction
//     const { data: { user } } = await supabase.auth.getUser()
//     if (!user) throw new Error('User not authenticated')

//     try {
//       // 1. Upload media files first
//       const images = await Promise.all(
//         property.images.map(file => storageService.uploadFile(file, 'images'))
//       )
//       const floorPlans = await Promise.all(
//         property.floorPlan.map(file => storageService.uploadFile(file, 'floor-plans'))
//       )
//       const unitMediaFiles = await Promise.all(
//         property.unitMedia.map(file => storageService.uploadFile(file, 'unit-media'))
//       )

//       // 2. Insert main property record
//       const { data: propertyData, error: propertyError } = await supabase
//         .from('properties')
//         .insert({
//           title: property.title,
//           address: property.address,
//           description: property.description,
//           type: property.type,
//           featured_image: property.featuredImage,
//           logo: property.logo,
//           owner_id: user.id
//         })
//         .select()
//         .single()

//       if (propertyError) throw propertyError

//       // 3. Insert related records (specs, parking, etc.)
//       await Promise.all([
//         // Insert specifications
//         supabase.from('property_specs').insert({
//           property_id: propertyData.id,
//           ...property.specs
//         }),

//         // Insert parking details
//         supabase.from('property_parking').insert({
//           property_id: propertyData.id,
//           ...property.parking
//         }),

//         // Insert media
//         supabase.from('property_media').insert([
//           ...images.map(url => ({
//             property_id: propertyData.id,
//             type: 'image',
//             url
//           })),
//           ...floorPlans.map(url => ({
//             property_id: propertyData.id,
//             type: 'floor_plan',
//             url
//           })),
//           ...unitMediaFiles.map(url => ({
//             property_id: propertyData.id,
//             type: 'unit_media',
//             url
//           }))
//         ])

//         // Add other related data insertions here
//       ])

//       // 4. Fetch and return the complete property
//       return await this.getPropertyById(propertyData.id)

//     } catch (error) {
//       console.error('Error creating property:', error)
//       throw error
//     }
//   }

//   // ... rest of the service methods
// }
