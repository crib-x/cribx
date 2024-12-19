import { Property } from '../../types/property'

export function sanitizePropertyData(data: Partial<Property>): Partial<Property> {
  return {
    ...data,
    title: data.title?.trim(),
    description: data.description?.trim(),
    address: data.address?.trim(),
    images: ensureArray(data.images),
    floorPlan: ensureArray(data.floorPlan),
    unitMedia: ensureArray(data.unitMedia),
    amenities: ensureArray(data.amenities),
    communityFeatures: ensureArray(data.communityFeatures),
    fees: ensureArray(data.fees),
    price: data.price || { min: 0, max: 0 },
    specs: data.specs || { beds: 0, baths: 0, sqft: 0 }
  }
}

function ensureArray<T>(value: T[] | undefined | null): T[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export function validatePropertyData(data: Partial<Property>): string[] {
  const errors: string[] = []

  if (!data.title) errors.push('Title is required')
  if (!data.address) errors.push('Address is required')
  if (!data.description) errors.push('Description is required')
  if (!data.price?.min || !data.price?.max) errors.push('Price range is required')

  return errors
}
