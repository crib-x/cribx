'use server'

import { createClient } from '@/lib/supabase/server'
import { Property } from '@/lib/types/property'
import { propertyService } from '@/lib/services/property'

export async function getProperties() {
  return propertyService.getProperties()
}

export async function getPropertyById(id: string) {
  return propertyService.getPropertyById(id)
}

export async function createProperty(data: Omit<Property, 'id'>) {
  return propertyService.createProperty(data)
}

export async function updateProperty(id: string, data: Partial<Property>) {
  return propertyService.updateProperty(id, data)
}

export async function deleteProperty(id: string) {
  // return propertyService.deleteProperty(id)
}
