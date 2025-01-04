"use client"

import { useState } from 'react'
import { PropertyUnit } from '@/lib/types/unit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus } from 'lucide-react'
import UnitCard from './unit-card'
import UnitDialog from './unit-dialog'

interface UnitListProps {
  propertyId: string
  units: PropertyUnit[]
  // onUnitUpdate: (unit: PropertyUnit) => Promise<void>
  // onUnitDelete: (unitId: string) => Promise<void>
}

export default function UnitList({ 
  propertyId,
  units,
}: UnitListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddUnit, setShowAddUnit] = useState(false)
  const [editingUnit, setEditingUnit] = useState<PropertyUnit | null>(null)

  const filteredUnits = !units?.length ? [] : units.filter(unit => 
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUnit = async (unit: PropertyUnit) => {
    // await onUnitUpdate(unit)
    setShowAddUnit(false)
  }

  const handleEditUnit = async (unit: PropertyUnit) => {
    // await onUnitUpdate(unit)
    setEditingUnit(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search units..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setShowAddUnit(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            onEdit={() => setEditingUnit(unit)}
            onDelete={() => console.log()}
          />
        ))}
      </div>

      <UnitDialog
        propertyId={propertyId}
        unit={editingUnit}
        open={showAddUnit || !!editingUnit}
        onOpenChange={(open) => {
          setShowAddUnit(open)
          if (!open) setEditingUnit(null)
        }}
        onSubmit={editingUnit ? handleEditUnit : handleAddUnit}
      />
    </div>
  )
}