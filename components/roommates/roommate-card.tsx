"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, User } from 'lucide-react'
import Image from 'next/image'

interface RoommateCardProps {
  name: string
  age: number
  occupation: string
  compatibility: number
  image: string
  interests: string[]
  budget: number
}

export default function RoommateCard({
  name,
  age,
  occupation,
  compatibility,
  image,
  interests,
  budget
}: RoommateCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}, {age}</h3>
            <p className="text-sm text-gray-500">{occupation}</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {compatibility}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-4">
          <p className="text-sm text-gray-600">Budget: ${budget}/month</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {interests.map((interest, index) => (
            <Badge key={index} variant="outline">
              {interest}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <User className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}