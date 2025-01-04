// columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { format } from "date-fns"
import { ViewLeaseDetails } from "./view-lease-details" // We'll create this next

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Dialog } from "@radix-ui/react-dialog"
import { UpdateLeaseStatus } from "./update-status-modal"
import { updateLeaseRequestStatus } from "@/app/actions/lease"

export type LeaseRequest = {
  id: string
  requestor_name: string
  created_at: string
  requestor_phone: string
  requestor_email: string
  discount: string
  property_id: string | null
  property_title: string
  receiver_email: string
  move_in_date: string
  needs_pickup: string
  status: string
  message: string
}

export const columns: ColumnDef<LeaseRequest>[] = [
  {
    accessorKey: "requestor_name",
    header: "Name",
  },
  {
    accessorKey: "property_title",
    header: "Property",
  },
  {
    accessorKey: "discount",
    header: "Discount Code",
  },
  {
    accessorKey: "move_in_date",
    header: "Move-in Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("move_in_date"))
      return format(date, "MMM dd, yyyy")
    },
  },
  {
    accessorKey: "needs_pickup",
    header: "Pickup",
    cell: ({ row }) => {
      const needsPickup = row.getValue("needs_pickup") === 'true'
      return (
        <Badge variant={needsPickup ? "default" : "secondary"}>
          {needsPickup ? "Yes" : "No"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={
          status === 'pending' ? "warning" :
          status === 'approved' ? "success" :
          status === 'rejected' ? "destructive" :
          "secondary"
        }>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell leaseRequest={row.original} />,
  },


]


// Separate component for actions to better manage state
function ActionCell({ leaseRequest }: { leaseRequest: LeaseRequest }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)

  const handleStatusUpdate = async (status: string, comment: string) => {
    try {
      await updateLeaseRequestStatus(leaseRequest.id, status, comment)
      setShowStatusModal(false)
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(leaseRequest.id)}
          >
            Copy request ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDetailsModal(true)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowStatusModal(true)}>
            Update status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      

      {/* Details Modal */}
      <Dialog  open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <ViewLeaseDetails 
            leaseRequest={leaseRequest} 
            onClose={() => setShowDetailsModal(false)}
          />
      </Dialog>

      {/* Status Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <UpdateLeaseStatus
          leaseId={leaseRequest.id}
          currentStatus={leaseRequest.status}
          onStatusUpdate={handleStatusUpdate}
          onClose={() => setShowStatusModal(false)}
        />
      </Dialog>
    </>
  )

}
