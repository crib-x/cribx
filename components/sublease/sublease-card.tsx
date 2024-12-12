"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, MapPin } from 'lucide-react'
import Image from 'next/image'

interface SubleaseCardProps {
  title: string
  location: string
  price: number
  image: string
  startDate: string
  endDate: string
  type: string
}

export default function SubleaseCard({
  title,
  location,
  price,
  image,
  startDate,
  endDate,
  type
}: SubleaseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-purple-600">
          {type}
        </Badge>
      </div>
      <CardHeader className="p-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{startDate} - {endDate}</span>
          </div>
          <div className="flex items-center font-semibold text-purple-600">
            <DollarSign className="h-4 w-4" />
            {price}/month
          </div>
        </div>
        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}