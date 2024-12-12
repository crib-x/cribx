"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ChevronRight, Bed, Bath, Square } from 'lucide-react'

interface PropertyCardProps {
  id: number
  title: string
  address: string
  price: number
  images: string[]
  beds: number
  baths: number
  sqft: number
  highlights: string[]
}

export default function PropertyCard({
  id,
  title,
  address,
  price,
  images,
  beds,
  baths,
  sqft,
  highlights
}: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Carousel */}
      <div className="relative h-48">
        <Image
          src={images[currentImage]}
          alt={title}
          fill
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={(e) => {
                e.preventDefault()
                prevImage()
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={(e) => {
                e.preventDefault()
                nextImage()
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 ${
            isLiked ? 'text-red-500' : 'text-white'
          }`}
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
        >
          <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
        </Button>
      </div>

      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">{address}</p>
          </div>
          <p className="text-lg font-bold text-blue-600">${price}/mo</p>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex gap-4 mb-3">
          <div className="flex items-center text-gray-600">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{beds} Beds</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{baths} Baths</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square className="h-4 w-4 mr-1" />
            <span className="text-sm">{sqft} sqft</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary">
              {highlight}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Link href={`/properties/${id}`} className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              View Details
            </Button>
          </Link>
          <Button variant="outline" className="flex-1">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}