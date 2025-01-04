
import { create } from 'zustand'
import { Property } from '@/lib/types/property'
import { propertyService } from '@/lib/services/property'
import { validatePropertyData } from '@/lib/services/property/property-utils'

interface PropertyState {
  properties: Property[]
  selectedProperty: Property | null
  isLoading: boolean
  error: string | null
  fetchProperties: () => Promise<void>
  fetchPropertyById: (id: string) => Promise<void>
  createProperty: (property: Omit<Property, 'id'>) => Promise<void>
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>
  deleteProperty: (id: string) => Promise<void>
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  selectedProperty: null,
  isLoading: false,
  error: null,

  fetchProperties: async () => {
    set({ isLoading: true, error: null })
    try {
      await propertyService.getProperties()
      // set({ properties })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch properties'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  fetchPropertyById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await propertyService.getPropertyById(id)
      // set({ selectedProperty: property })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch property'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  createProperty: async (propertyData: Omit<Property, 'id'>) => {
    set({ isLoading: true, error: null })
    try {
      // Validate property data
      const errors = validatePropertyData(propertyData)
      if (errors.length > 0) {
        throw new Error(errors.join(', '))
      }

      const propertyId = await propertyService.createProperty(propertyData)
      await propertyService.getPropertyById(propertyId)
      
      // set(state => ({
      //   properties: [newProperty, ...state.properties]
      // }))
      
      return propertyId
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create property'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateProperty: async (id: string, propertyData: Partial<Property>) => {
    set({ isLoading: true, error: null })
    try {
      // Validate update data
      const errors = validatePropertyData(propertyData)
      if (errors.length > 0) {
        throw new Error(errors.join(', '))
      }

      await propertyService.updateProperty(id, propertyData)
       await propertyService.getPropertyById(id)
      
      // set(state => ({
      //   properties: state.properties.map(p => 
      //     p.id === id ? updatedProperty : p
      //   ),
      //   selectedProperty: state.selectedProperty?.id === id ? 
      //     updatedProperty : state.selectedProperty
      // }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update property'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  deleteProperty: async () => {
    set({ isLoading: true, error: null })
    try {
      // await propertyService.deleteProperty(id).
      // set(state => ({
      //   properties: state.properties.filter(p => p.id !== id),
      //   selectedProperty: state.selectedProperty?.id === id ? 
      //     null : state.selectedProperty
      // }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete property'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  }
}))