"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import PropertyTable from '@/components/dashboard/property-table'
import AddPropertyDialog from '@/components/dashboard/add-property-dialog'

export default function PropertiesPage() {
  const [showAddProperty, setShowAddProperty] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Button onClick={() => setShowAddProperty(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <PropertyTable />
      
      <AddPropertyDialog 
        open={showAddProperty} 
        onOpenChange={setShowAddProperty}
      />
    </div>
  )
}