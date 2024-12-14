import { create } from 'zustand'
import { propertyService } from '../services/property-service'
import { PropertyFormData } from '../schemas/property-schemas'
import { useAuthStore } from './auth-store'

interface PropertyState {
  properties: any[]
  isLoading: boolean
  error: string | null
  fetchProperties: () => Promise<void>
  addProperty: (data: PropertyFormData) => Promise<void>
  updateProperty: (id: number, data: Partial<PropertyFormData>) => Promise<void>
  deleteProperty: (id: number) => Promise<void>
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  isLoading: false,
  error: null,

  fetchProperties: async () => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return

    set({ isLoading: true, error: null })
    try {
      const properties = await propertyService.getProperties(userId)
      set({ properties })
    } catch (error) {
      set({ error: 'Failed to fetch properties' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  addProperty: async (data: PropertyFormData) => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return

    set({ isLoading: true, error: null })
    try {
      const property = await propertyService.createProperty(data, userId)
      set(state => ({
        properties: [property, ...state.properties]
      }))
    } catch (error) {
      set({ error: 'Failed to add property' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateProperty: async (id: number, data: Partial<PropertyFormData>) => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return

    set({ isLoading: true, error: null })
    try {
      const updatedProperty = await propertyService.updateProperty(id, data, userId)
      set(state => ({
        properties: state.properties.map(p => 
          p.id === id ? updatedProperty : p
        )
      }))
    } catch (error) {
      set({ error: 'Failed to update property' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  deleteProperty: async (id: number) => {
    const userId = useAuthStore.getState().user?.id
    if (!userId) return

    set({ isLoading: true, error: null })
    try {
      await propertyService.deleteProperty(id, userId)
      set(state => ({
        properties: state.properties.filter(p => p.id !== id)
      }))
    } catch (error) {
      set({ error: 'Failed to delete property' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  }
}))
