"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, MessageSquare } from 'lucide-react'

const units = [
  {
    id: 1,
    number: "101",
    property: "Luxury Student Apartment",
    type: "2 Bedroom",
    rent: "$1,200",
    status: "Occupied",
    tenant: "John Doe",
    leaseEnd: "2024-08-31",
  },
  {
    id: 2,
    number: "102",
    property: "Luxury Student Apartment",
    type: "Studio",
    rent: "$800",
    status: "Available",
    tenant: null,
    leaseEnd: null,
  },
  {
    id: 3,
    number: "201",
    property: "Campus View Residences",
    type: "1 Bedroom",
    rent: "$1,000",
    status: "Looking for Roommate",
    tenant: "Sarah Smith",
    leaseEnd: "2024-07-31",
  },
]

export default function UnitTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Unit</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Rent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Lease End</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {units.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell className="font-medium">{unit.number}</TableCell>
              <TableCell>{unit.property}</TableCell>
              <TableCell>{unit.type}</TableCell>
              <TableCell>{unit.rent}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    unit.status === "Available"
                      ? "default"
                      : unit.status === "Occupied"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {unit.status}
                </Badge>
              </TableCell>
              <TableCell>{unit.tenant || "-"}</TableCell>
              <TableCell>{unit.leaseEnd || "-"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}