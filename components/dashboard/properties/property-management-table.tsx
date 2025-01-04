"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Grid, Plus } from "lucide-react";
import { Property } from "@/lib/types/property";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProperty, getProperties } from "@/app/actions/properties";

interface PropertyManagementTableProps {
  // searchTerm: string;
  properties: Property[];
}

export default function PropertyManagementTable({
  properties,
}: PropertyManagementTableProps) {
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null
  );

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      console.log(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleDelete = () => {
    try {
      const resp = deleteProperty(propertyToDelete?.id || "");
      fetchProperties();
      console.log(resp);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
    setPropertyToDelete(null); 
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Properties</h2>
          <p className="text-gray-500 mt-1">Manage your properties and units</p>
        </div>

        <Link href="/dashboard/properties/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Occupancy</TableHead>
              <TableHead>Price Range</TableHead>
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
                    <div className="text-sm text-gray-500">
                      {property.address}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{property.units?.length || 0}</TableCell>
                <TableCell>
                  {property.units?.length ? (
                    <>
                      {
                        property.units.filter((u) => u.availability.isAvailable)
                          .length
                      }
                      /{property.units.length}
                      <div className="text-sm text-gray-500">
                        {Math.round(
                          (property.units.filter(
                            (u) => !u.availability.isAvailable
                          ).length /
                            property.units.length) *
                            100
                        )}
                        % Occupied
                      </div>
                    </>
                  ) : (
                    "No units"
                  )}
                </TableCell>
                <TableCell>
                  {property?.price
                    ? `$${property.price.min} - $${property.price.max}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Active</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/properties/${property.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/properties/${property.id}/units`}>
                      <Button variant="ghost" size="icon">
                        <Grid className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/properties/${property.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    {/* <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setPropertyToEdit(property)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button> */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      onClick={() => setPropertyToDelete(property)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!propertyToDelete}
        onOpenChange={() => setPropertyToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property and all associated units and data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  );
}
