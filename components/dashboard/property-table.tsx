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
import { Edit, Trash2, Eye, Grid } from 'lucide-react'
import Link from 'next/link'

const properties = [
  {
    id: 1,
    name: "Luxury Student Apartment",
    address: "123 University Ave",
    units: 12,
    occupied: 10,
    revenue: "$14,400",
    status: "Active",
  },
  {
    id: 2,
    name: "Campus View Residences",
    address: "456 College St",
    units: 8,
    occupied: 8,
    revenue: "$10,000",
    status: "Full",
  },
  {
    id: 3,
    name: "Student Housing Complex",
    address: "789 Academic Dr",
    units: 16,
    occupied: 12,
    revenue: "$18,000",
    status: "Active",
  },
]

export default function PropertyTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead>Monthly Revenue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{property.name}</div>
                  <div className="text-sm text-gray-500">{property.address}</div>
                </div>
              </TableCell>
              <TableCell>{property.units}</TableCell>
              <TableCell>
                {property.occupied}/{property.units}
                <div className="text-sm text-gray-500">
                  {Math.round((property.occupied / property.units) * 100)}% Occupied
                </div>
              </TableCell>
              <TableCell>{property.revenue}</TableCell>
              <TableCell>
                <Badge
                  variant={property.status === "Full" ? "secondary" : "default"}
                >
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/properties/${property.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/units?property=${property.id}`}>
                    <Button variant="ghost" size="icon">
                      <Grid className="h-4 w-4" />
                    </Button>
                  </Link>
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