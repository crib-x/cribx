"use client"

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MOCK_PROPERTIES } from '@/lib/data/mock-properties'

const partners = MOCK_PROPERTIES

export default function PartnersSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We collaborate with trusted institutions to provide the best housing solutions for students
          </p>
        </div>

        <div className="relative px-8 justify-center">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full justify-center"
          >
            <CarouselContent className='justify-center'>
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                  <div className="flex items-center justify-center h-24 px-6 grayscale hover:grayscale-0 transition-all">
                    <div className="relative w-full h-full">
                      <Image
                        
                        src={partner.logo || '/default-logo.png'}
                        alt={partner.title}
                        height={100}
                        width={100}
                        className="object-contain"
                        onError={(e) => {
                          // Keep fallback visible if image fails to load
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}