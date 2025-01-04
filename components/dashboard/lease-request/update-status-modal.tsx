// components/lease/update-status-modal.tsx
"use client"

import { useState } from "react"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface UpdateStatusModalProps {
  leaseId: string
  currentStatus: string
  onStatusUpdate: (status: string, comment: string) => Promise<void>
  onClose: () => void
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'cancelled', label: 'Cancelled' }
]

export function UpdateLeaseStatus({ 
  leaseId, 
  currentStatus,
  onStatusUpdate,
  onClose 
}: UpdateStatusModalProps) {
  const [formState, setFormState] = useState({
    status: currentStatus,
    comment: "",
    isLoading: false
  })

  const handleSubmit = async () => {
    try {
      setFormState(prev => ({ ...prev, isLoading: true }))
      await onStatusUpdate(formState.status, formState.comment)
      toast.success("Status updated successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to update status")
      console.error(error)
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Lease Request Status</DialogTitle>
        <DialogDescription>
          Change the status of the lease request and add an optional comment.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formState.status}
            onValueChange={(value) => 
              setFormState(prev => ({ ...prev, status: value }))
            }
            disabled={formState.isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Comment (Optional)</Label>
          <Textarea
            id="comment"
            placeholder="Add a comment about this status change..."
            value={formState.comment}
            onChange={(e) => 
              setFormState(prev => ({ ...prev, comment: e.target.value }))
            }
            
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={formState.isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={formState.status === currentStatus || formState.isLoading}
        >
          {formState.isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Update Status
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}