import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createClient } from '@/lib/supabase/client'

export interface Property {
  id: number
  name: string
  address: string
  type: string
  units: number
  occupied: number
  revenue: string
  status: string
  images: string[]
  description: string
  amenities: string[]
  user_id: string
}

export interface Unit {
  id: number
  number: string
  property_id: number
  type: string
  rent: number
  status: string
  tenant: string | null
  lease_end: string | null
  images: string[]
  amenities: string[]
}

interface PropertyState {
  properties: Property[]
  units: Unit[]
  addProperty: (property: Omit<Property, 'id'>) => Promise<void>
  addUnit: (unit: Omit<Unit, 'id'>) => Promise<void>
  updateProperty: (id: number, property: Partial<Property>) => Promise<void>
  updateUnit: (id: number, unit: Partial<Unit>) => Promise<void>
  deleteProperty: (id: number) => Promise<void>
  deleteUnit: (id: number) => Promise<void>
  fetchProperties: () => Promise<void>
  fetchUnits: () => Promise<void>
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set) => ({
      properties: [],
      units: [],
      addProperty: async (property) => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('properties')
          .insert([property])
          .select()

        if (error) throw error

        set((state) => ({
          properties: [...state.properties, data[0]],
        }))
      },
      addUnit: async (unit) => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('units')
          .insert([unit])
          .select()

        if (error) throw error

        set((state) => ({
          units: [...state.units, data[0]],
        }))
      },
      updateProperty: async (id, property) => {
        const supabase = createClient()
        const { error } = await supabase
          .from('properties')
          .update(property)
          .eq('id', id)

        if (error) throw error

        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, ...property } : p
          ),
        }))
      },
      updateUnit: async (id, unit) => {
        const supabase = createClient()
        const { error } = await supabase
          .from('units')
          .update(unit)
          .eq('id', id)

        if (error) throw error

        set((state) => ({
          units: state.units.map((u) =>
            u.id === id ? { ...u, ...unit } : u
          ),
        }))
      },
      deleteProperty: async (id) => {
        const supabase = createClient()
        const { error } = await supabase
          .from('properties')
          .delete()
          .eq('id', id)

        if (error) throw error

        set((state) => ({
          properties: state.properties.filter((p) => p.id !== id),
          units: state.units.filter((u) => u.property_id !== id),
        }))
      },
      deleteUnit: async (id) => {
        const supabase = createClient()
        const { error } = await supabase
          .from('units')
          .delete()
          .eq('id', id)

        if (error) throw error

        set((state) => ({
          units: state.units.filter((u) => u.id !== id),
        }))
      },
      fetchProperties: async () => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('properties')
          .select('*')

        if (error) throw error

        set({ properties: data })
      },
      fetchUnits: async () => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('units')
          .select('*')

        if (error) throw error

        set({ units: data })
      },
    }),
    {
      name: 'property-storage',
    }
  )
)