"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyFeaturesProps {
  features: string[];
}

export default function PropertyFeatures({ features }: PropertyFeaturesProps) {


  return (
    <Card>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-6">
            {features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Apartment Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            { features.length === 0 && (
                <div className="text-center text-gray-500">
                  No features available
                </div>
              )}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
