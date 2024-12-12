import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
}

export interface Unit {
  id: number
  number: string
  propertyId: number
  type: string
  rent: number
  status: string
  tenant: string | null
  leaseEnd: string | null
  images: string[]
  amenities: string[]
}

interface PropertyState {
  properties: Property[]
  units: Unit[]
  addProperty: (property: Omit<Property, 'id'>) => void
  addUnit: (unit: Omit<Unit, 'id'>) => void
  updateProperty: (id: number, property: Partial<Property>) => void
  updateUnit: (id: number, unit: Partial<Unit>) => void
  deleteProperty: (id: number) => void
  deleteUnit: (id: number) => void
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set) => ({
      properties: [],
      units: [],
      addProperty: (property) =>
        set((state) => ({
          properties: [
            ...state.properties,
            { ...property, id: Date.now() }
          ],
        })),
      addUnit: (unit) =>
        set((state) => ({
          units: [...state.units, { ...unit, id: Date.now() }],
        })),
      updateProperty: (id, property) =>
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, ...property } : p
          ),
        })),
      updateUnit: (id, unit) =>
        set((state) => ({
          units: state.units.map((u) =>
            u.id === id ? { ...u, ...unit } : u
          ),
        })),
      deleteProperty: (id) =>
        set((state) => ({
          properties: state.properties.filter((p) => p.id !== id),
          units: state.units.filter((u) => u.propertyId !== id),
        })),
      deleteUnit: (id) =>
        set((state) => ({
          units: state.units.filter((u) => u.id !== id),
        })),
    }),
    {
      name: 'property-storage',
    }
  )
)