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
import { Property } from "@/lib/types/property"

interface PropertyTableProps {
  properties: Property[]
}

export default function PropertyTable({ properties }: PropertyTableProps) {
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
                  <div className="font-medium">{property.title}</div>
                  <div className="text-sm text-gray-500">{property.address}</div>
                </div>
              </TableCell>
              <TableCell>{property.units?.length || 0}</TableCell>
              <TableCell>
                {/* {property?.occupied || 0}/{property.units} */}
                <div className="text-sm text-gray-500">
                  {Math.round(Number(property?.occupied||0))}% Occupied
                </div>
              </TableCell>
              <TableCell>{property?.revenue || "N/A"}</TableCell>
              <TableCell>
                <Badge
                  variant={property?.status === "Full" ? "secondary" : "default"}
                >
                  {property?.status || "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/properties/${property?.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/units?property=${property?.id}`}>
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