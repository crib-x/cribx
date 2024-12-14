import { Button } from "react-day-picker";
import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/types/property";
import { useState } from "react";
interface PropertyUnitProps {
  property: Property;
}
export default function PropertyUnit({ property }: PropertyUnitProps) {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const availableUnits = property.units.filter(
    (unit) => unit.availability.isAvailable
  );

  if (!availableUnits.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No units details available for this property
        </CardContent>
      </Card>
    )
  }
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Available Units</h3>
        <div className="space-y-4">
          {availableUnits.map((unit) => (
            <Card key={unit.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">{unit.name}</h4>
                    <p className="text-sm text-gray-500">{unit.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${unit.rent.price}/mo</p>
                    <p className="text-sm text-gray-500">
                      Available{" "}
                      {unit.availability.moveInDate?.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Size</p>
                    <p className="font-medium">{unit.size} sqft</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Occupancy</p>
                    <p className="font-medium">{unit.occupancy} people</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Lease Terms</p>
                    <p className="font-medium">
                      {unit.availability.leaseTerms[0]}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {unit.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => setSelectedUnit(unit.id)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
