"use client";

import Image from "next/image";
import Link from "next/link";
import { Property } from "@/lib/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group">
      <div className="relative h-48">
        <Image
          src={property.featuredImage}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <p className=" font-semibold">{property.title}</p>
          <p className="text-sm">{property.address}</p>
        </div>

        <div className="flex gap-2">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
