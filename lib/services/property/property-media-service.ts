import { storageService } from '../storage/storage-service'

interface MediaUploadOptions {
  images: (File | string)[]
  floorPlans: (File | string)[]
  unitMedia: (File | string)[]
  onlyNewFiles?: boolean
  property_id: string
}

export interface MediaUploadResult {
   type: string,
    url: string,
    property_id: string

}

export const propertyMediaService = {
  async uploadMedia({
    images,
    floorPlans,
    unitMedia,
    onlyNewFiles = false,
    property_id,
  }: MediaUploadOptions): Promise<MediaUploadResult[]> {
    try {
      // Process each media type in parallel
      const [processedImages, processedFloorPlans, processedUnitMedia] = await Promise.all([
        this.processMediaFiles(images, 'images', onlyNewFiles),
        this.processMediaFiles(floorPlans, 'floor-plans', onlyNewFiles),
        this.processMediaFiles(unitMedia, 'unit-media', onlyNewFiles)
      ])

      return [
        ...this.convertToObjectArray(processedImages, 'image', property_id), 
        ...this.convertToObjectArray(processedFloorPlans, 'floor_plans', property_id), 
        ...this.convertToObjectArray(processedUnitMedia, 'units', property_id), 
      ]
    
    } catch (error) {
      console.error('Error uploading property media:', error)
      throw new Error('Failed to upload property media')
    }
  },

  async processMediaFiles(
    files: (File | string)[],
    folder: string,
    onlyNewFiles: boolean
  ): Promise<string[]> {
    if (!files?.length) return []

    const processedUrls = await Promise.all(
      files.map(async (file) => {
        // If it's already a string URL and we're only processing new files, return as is
        if (typeof file === 'string' && onlyNewFiles) {
          return 'uploaded'
        }
        
        // If it's a File, upload it
        if (file instanceof File) {
          return await storageService.uploadFile(file, folder)
        }

        return file
      })
    )

    return processedUrls.filter(Boolean) as string[]
  },
  convertToObjectArray(urls: string[], type: string, id: string) {
    return urls
      .filter(url => url !== 'uploaded')
      .map(url => ({
        type,
        url,
        property_id: id
      }));
  }
  
}