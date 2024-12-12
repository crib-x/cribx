"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface MarketplaceCardProps {
  title: string
  price: number
  image: string
  condition: string
  category: string
  seller: string
  description: string
}

export default function MarketplaceCard({
  title,
  price,
  image,
  condition,
  category,
  seller,
  description
}: MarketplaceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 right-2">
          {condition}
        </Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          <div className="flex items-center font-semibold text-green-600">
            <DollarSign className="h-4 w-4" />
            {price}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Seller: {seller}</span>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Seller
        </Button>
      </CardContent>
    </Card>
  )
}