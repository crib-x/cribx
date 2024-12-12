"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import UnitTable from '@/components/dashboard/unit-table'
import AddUnitDialog from '@/components/dashboard/add-unit-dialog'

export default function UnitsPage() {
  const [showAddUnit, setShowAddUnit] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Units</h1>
        <Button onClick={() => setShowAddUnit(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      <UnitTable />
      
      <AddUnitDialog 
        open={showAddUnit} 
        onOpenChange={setShowAddUnit}
      />
    </div>
  )
}