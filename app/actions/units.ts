'use server'

import { PropertyUnit } from '@/lib/types/unit'
import { propertyService } from '@/lib/services/property'

export async function createUnit(propertyId: string, data: Omit<PropertyUnit, 'id'>) {
  return propertyService.units.createUnit(propertyId, data)
}

export async function updateUnit(id: string, data: Partial<PropertyUnit>) {
  return propertyService.units.updateUnit(id, data)
}

export async function deleteUnit(id: string) {
  return propertyService.units.deleteUnit(id)
}