// columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

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

export type MessageRequest = {
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

export const columns: ColumnDef<MessageRequest>[] = [
  {
    accessorKey: "requestor_name",
    header: "Name",
  },
  {
    accessorKey: "property_title",
    header: "Property",
  },
  {
    accessorKey: "requestor_email",
    header: "Request Email",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell message={row.original} />,
  },


]


// Separate component for actions to better manage state
function ActionCell({ message }: { message: MessageRequest }) {
  
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
            onClick={() => window.open(`mailto:${message.requestor_email}`)}
          >
            Reply Message
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )

}
