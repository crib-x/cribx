import { createClient } from '../../supabase/client'

const STORAGE_BUCKETS = {
  PROPERTIES: 'property-media',
  TEMP: 'temp-uploads'
} as const

export const storageService = {
  async ensureBucketExists(bucketName: string) {
    const supabase = createClient()
    
    try {
      // Try to get bucket info first
      const { data: bucket } = await supabase
        .storage
        .getBucket(bucketName)
      
      if (!bucket) {
        // Create bucket if it doesn't exist
        const { data, error } = await supabase
          .storage
          .createBucket(bucketName, {
            public: true,
            fileSizeLimit: 52428800, // 50MB
            allowedMimeTypes: ['image/*']
          })
        
        if (error) throw error
      }
    } catch (error) {
      console.error(`Error ensuring bucket ${bucketName} exists:`, error)
      throw error
    }
  },

  async uploadFile(file: File, path: string, bucketName: string = STORAGE_BUCKETS.PROPERTIES): Promise<string> {
    const supabase = createClient()
    
    // Ensure bucket exists before upload
    await this.ensureBucketExists(bucketName)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${path}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  async deleteFile(path: string, bucketName: string = STORAGE_BUCKETS.PROPERTIES) {
    const supabase = createClient()
    
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([path])

    if (error) throw error
  }
}

export { STORAGE_BUCKETS }