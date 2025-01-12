import  { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/types/property";
import {
  Calendar,
  BedDouble,
  Bath,
  Home,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PropertyUnit } from "@/lib/types/unit";
import LeaseRequestDialog from "./detail/property-contact/lease-request-dialog";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

interface PropertyUnitListProps {
  property: Property;
  // onApplyNow: (property: Property, unit: PropertyUnit) => void;
}

export default function PropertyUnitList({ property }: PropertyUnitListProps) {
  const [showLeaseRequest, setShowLeaseRequest] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<PropertyUnit>();
  const availableUnits = property.units;

  const handleApplyNow = (unit: PropertyUnit) => {
    setSelectedUnit(unit);
    setShowLeaseRequest(true);
  };

  if (!availableUnits.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No units available for this property
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* <Card>
        <CardContent className="p-6"> */}
          <h3 className="text-xl font-semibold mb-4">Available Units</h3>
          <div className="space-y-4">
            {availableUnits.map((unit) => (
              <Card key={unit.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    {/* Unit Image */}
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={unit.images[0]}
                        fill
                        alt={`${unit.name}`}
                        className="object-cover"
                      />
                      {unit.incentives && unit.incentives.length > 0 && (
                        <div className="absolute top-2 left-2">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
                            <Sparkles className="w-4 h-4" />
                            Limited Time Offer
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Unit Information */}
                    <div className="space-y-4">
                      {/* Header and Price - Responsive Stack */}
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="w-full sm:w-auto">
                          <h4 className="font-semibold text-lg">{unit.name}</h4>
                          <div className="flex items-center gap-1 text-gray-500 mt-1">
                            <Home className="w-4 h-4" />
                            <p className="text-sm">{unit.type}</p>
                          </div>
                        </div>
                        <div className="bg-primary/5 p-3 rounded-lg w-full sm:w-auto text-right">
                          <div className="flex items-center justify-end gap-1">
                            <p className="text-3xl font-bold text-primary">
                              {formatPrice(unit.price)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {unit?.paymentDuration || "Monthly"}
                          </p>
                        </div>
                      </div>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                            <BedDouble className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-500">Beds</p>
                            <p className="font-medium truncate">
                              {unit.rooms || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                            <Bath className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-500">Baths</p>
                            <p className="font-medium truncate">
                              {unit.baths || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-orange-100 rounded-lg shrink-0">
                            <Home className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-500">Size</p>
                            <p className="font-medium truncate">{unit.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-lg shrink-0">
                            <Calendar className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-500">Move-in</p>
                            <p className="font-medium truncate">
                              {unit?.moveInDate || "Flexible"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Amenities and Incentives */}
                      <div className="space-y-3">
                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2">
                          {unit.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="secondary">
                              {amenity}
                            </Badge>
                          ))}
                          {unit.amenities.length > 3 && (
                            <Badge variant="outline" className="cursor-pointer">
                              +{unit.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>

                        {/* Incentives */}
                        {unit.incentives && unit.incentives.length > 0 && (
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-5 h-5 text-green-500 shrink-0" />
                              <div className="space-y-1">
                                <p className="font-medium text-green-700">
                                  Special Offer!
                                </p>
                                <p className="text-green-600 text-sm">
                                  {unit.incentives.join(", ")}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          href={`/properties/${property.id}/units/${unit.id}`}
                          className="w-full sm:w-1/2"
                        >
                          <Button variant="outline" className="w-full gap-2">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        {/* <Link
                          href={`/properties/${property.id}/units/${unit.id}/apply`}
                          className="w-full sm:w-1/2"
                        > */}
                        <Button
                          onClick={() => handleApplyNow(unit)}
                          className="w-full sm:w-1/2"
                        >
                          Apply Now
                        </Button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        {/* </CardContent>
      </Card> */}
      <LeaseRequestDialog
        property={property}
        open={showLeaseRequest}
        unit={selectedUnit as PropertyUnit}
        onOpenChange={setShowLeaseRequest}
      />
    </>
  );
}
