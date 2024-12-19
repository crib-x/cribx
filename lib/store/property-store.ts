import { create } from 'zustand'
import { Property } from '@/lib/types/property'
import { validatePropertyData } from '@/lib/services/property/property-utils'
import * as propertyActions from '@/app/actions/properties'

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
      const properties = await propertyActions.getProperties()
      // set({ properties })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch properties'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  fetchPropertyById: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const property = await propertyActions.getPropertyById(id)
      // set({ selectedProperty: property })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch property'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  createProperty: async (propertyData) => {
    set({ isLoading: true, error: null })
    try {
      const errors = validatePropertyData(propertyData)
      if (errors.length > 0) {
        throw new Error(errors.join(', '))
      }
      const propertyId = await propertyActions.createProperty(propertyData)
      const newProperty = await propertyActions.getPropertyById(propertyId)
      // set(state => ({
      //   properties: [newProperty, ...state.properties]
      // }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create property'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateProperty: async (id, propertyData) => {
    set({ isLoading: true, error: null })
    try {
      const errors = validatePropertyData(propertyData)
      if (errors.length > 0) {
        throw new Error(errors.join(', '))
      }
      await propertyActions.updateProperty(id, propertyData)
      const updatedProperty = await propertyActions.getPropertyById(id)
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

  deleteProperty: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await propertyActions.deleteProperty(id)
      // set(state => ({
      //   properties: state.properties.filter(p => p.id !== id),
      //   selectedProperty: state.selectedProperty?.id === id ? null : state.selectedProperty
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
