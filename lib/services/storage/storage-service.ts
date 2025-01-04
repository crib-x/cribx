import { createClient } from '@/lib/supabase/server'
type BucketName = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS]

const STORAGE_BUCKETS = {
  PROPERTIES: 'property-media',
  TEMP: 'temp-uploads'
} as const

interface BucketConfig {
  public: boolean
  fileSizeLimit: number
  allowedMimeTypes: string[]
}

const handleStorageError = (error: any, operation: string) => {
  console.error(`Storage ${operation} failed:`, error)
  if (error?.message?.includes('Row Level Security')) {
    throw new Error('Permission denied - check storage policies')
  }
  throw error
}

export const storageService = {
  async ensureBucketExists(bucketName: BucketName) {
    const supabase = await createClient()
    // console.log('supabase', supabase)
    try {
      const { data: bucket, error: getBucketError } = await supabase
        .storage
        .getBucket(bucketName)

      // if (getBucketError) throw getBucketError
      console.log('bucket', bucket)

      if (!bucket) {
        const config: BucketConfig = {
          public: true,
          fileSizeLimit: 52428800, // 50MB
          allowedMimeTypes: ['image/*']
        }

        const { error: createError } = await supabase
          .storage
          .createBucket(bucketName, config)

        if (createError) throw createError
      }
    } catch (error) {
      handleStorageError(error, `ensuring bucket ${bucketName} exists`)
    }
  },

  async uploadFile(file: File, path: string, bucketName: string = STORAGE_BUCKETS.PROPERTIES): Promise<string> {
    const supabase = await createClient()

    try {
      // Log bucket info
      const { data: bucketInfo, error: bucketError } = await supabase
        .storage
        .getBucket(bucketName)
      console.log('Bucket info:', bucketInfo, 'Bucket error:', bucketError)

      // Log authentication status
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      console.log('Auth session:', session, 'Auth error:', authError)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${path}/${fileName}`

      // Attempt upload with detailed error logging
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      console.log('Upload response:', data, 'Upload error:', uploadError)

      if (uploadError) {
        console.error('Upload error details:', {
          message: uploadError.message,
          stack: uploadError.stack

        })
        throw uploadError
      }

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath)

      return urlData.publicUrl
    } catch (error) {
      console.error('Detailed error:', error)
      throw error
    }
  },
  async deleteFile(path: string, bucketName: string = STORAGE_BUCKETS.PROPERTIES) {
    const supabase = await createClient()

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([path])

    if (error) throw error
  }
}

export { STORAGE_BUCKETS }