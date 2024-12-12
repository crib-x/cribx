"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tag, DollarSign, Gift } from 'lucide-react'

interface PropertyIncentivesProps {
  incentives: {
    deposit: number
    applicationFee: number
    special: string
  }
}

export default function PropertyIncentives({ incentives }: PropertyIncentivesProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Security Deposit</p>
              <p className="text-2xl font-bold text-green-600">${incentives.deposit}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Application Fee</p>
              <p className="text-2xl font-bold text-blue-600">${incentives.applicationFee}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Special Offer</p>
              <Badge variant="secondary" className="mt-1">
                {incentives.special}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}