"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Image as ImageIcon, Video, Layout, X } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      {/* Media Type Tabs */}
      <div className="absolute top-4 left-4 z-10">
        <Tabs defaultValue="photos" className="w-auto">
          <TabsList className="bg-black/50 border-0">
            <TabsTrigger value="photos" className="data-[state=active]:bg-blue-600">
              <ImageIcon className="h-4 w-4 mr-2" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="floorplan" className="data-[state=active]:bg-blue-600">
              <Layout className="h-4 w-4 mr-2" />
              Floor Plan
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-blue-600">
              <Video className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-2 h-[60vh]">
        {/* Main Image */}
        <div className="col-span-2 row-span-2 relative">
          <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
            <DialogTrigger asChild>
              <div className="relative h-full cursor-pointer group">
                <Image
                  src={images[0]}
                  alt="Property main view"
                  fill
                  className="object-cover rounded-l-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[90vh]">
              <div className="relative h-full">
                <Image
                  src={images[selectedImage]}
                  alt="Property view"
                  fill
                  className="object-contain"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setShowFullscreen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Secondary Images */}
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className="relative group cursor-pointer">
            <Image
              src={image}
              alt={`Property view ${index + 2}`}
              fill
              className={`object-cover ${index === 2 ? 'rounded-tr-lg' : ''} ${
                index === 3 ? 'rounded-br-lg' : ''
              }`}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}

        {/* View All Photos Button */}
        {images.length > 5 && (
          <Button
            variant="ghost"
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setShowFullscreen(true)}
          >
            View All Photos ({images.length})
          </Button>
        )}
      </div>
    </div>
  )
}