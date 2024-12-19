"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PropertyUnit } from "@/lib/types/unit"
import UnitForm from "./unit-form"

interface UnitDialogProps {
  propertyId: string
  unit?: PropertyUnit | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (unit: PropertyUnit) => Promise<void>
}

export default function UnitDialog({
  propertyId,
  unit,
  open,
  onOpenChange,
  onSubmit
}: UnitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {unit ? `Edit Unit: ${unit.name}` : 'Add New Unit'}
          </DialogTitle>
        </DialogHeader>
        <UnitForm
          propertyId={propertyId}
          initialData={unit || undefined}
          onSubmit={onSubmit}
          isEditing={!!unit}
        />
      </DialogContent>
    </Dialog>
  )
}