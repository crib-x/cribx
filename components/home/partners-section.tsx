"use client"

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const partners = [
  {
    name: "University Housing",
    logo: "/logos/university-housing.svg",
  },
  {
    name: "Student Life Services",
    logo: "/logos/student-life.svg",
  },
  {
    name: "Campus Residences",
    logo: "/logos/campus-residences.svg",
  },
  {
    name: "Student Affairs",
    logo: "/logos/student-affairs.svg",
  },
  {
    name: "Housing Association",
    logo: "/logos/housing-association.svg",
  },
]

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

        <div className="relative px-8">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                  <div className="flex items-center justify-center h-24 px-6 grayscale hover:grayscale-0 transition-all">
                    <div className="relative w-full h-full">
                      {/* Fallback icon if image fails to load */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg
                          className="w-12 h-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
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