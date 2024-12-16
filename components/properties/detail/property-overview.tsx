"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/types/property";
import { Bed, Bath, Square, DollarSign, MapPin } from "lucide-react";

interface PropertyOverviewProps {
  property: Property;
}

export default function PropertyOverview({ property }: PropertyOverviewProps) {
  return (
    <>
      <Card className="mb-4">
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-xl font-bold">{property.title}</h1>
              <p className="text-gray-500 flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                {property.address}
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                About this property
              </h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {/* Community Features */}
          </motion.div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold mb-3">Community Features</h2>
              <div className="flex flex-wrap gap-2">
                {property.communityFeatures.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </>
  );
}
