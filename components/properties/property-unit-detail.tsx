'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  BedDouble, 
  Bath, 
  Home,
  DollarSign,
  Sparkles,
  MapPin
} from 'lucide-react';
import Image from 'next/image';
import { MOCK_PROPERTIES } from '@/lib/data/mock-properties';
import { PropertyUnit } from '@/lib/types/unit';
import { useEffect, useState } from 'react';
import { MessageDialog } from './detail/property-contact/message-dialog';
import LeaseRequestDialog from './detail/property-contact/lease-request-dialog';
import { Property } from '@/lib/types/property';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function PropertyUnitDetail({ unitId, propertyId }: { unitId: string; propertyId: string }) {
  const [unit, setUnit] = useState<PropertyUnit | undefined>(undefined);
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [ showLeaseRequest, setShowLeaseRequest ] = useState(false);
    const [ showMessage, setShowMessage ] = useState(false);

  useEffect(() => {
    const property = MOCK_PROPERTIES.find(property => propertyId === property.id);
    setProperty(property);
    const foundUnit = property?.units.find(item => item.id === unitId);
    setUnit(foundUnit);
    setLoading(false);
  }, [unitId, propertyId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading...</p>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Unit Not Found</h2>
        <p className="mt-2 text-gray-600">The unit you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Navigation */}
      <div className="px-4 py-4">
        <Link 
          href={`/properties/${propertyId}`}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Property
        </Link>
      </div>

      {/* Image Carousel */}
      <div className="mb-8 relative">
        {unit.incentives && unit.incentives.length > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Limited Time Offer
            </div>
          </div>
        )}
        <Carousel className="w-full">
          <CarouselContent>
            {unit.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-[16/9] relative">
                  <Image
                    src={image}
                    alt={`${unit.name} view ${index + 1}`}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      <div className="px-4 pb-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">{unit.description}</p>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{unit.name}</h1>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg text-right">
              <p className="text-4xl font-bold text-primary">{formatPrice(unit.price)}</p>
              <p className="text-gray-600">{unit.paymentDuration}</p>
            </div>
          </div>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Special Offer */}
            {unit.incentives && unit.incentives.length > 0 && (
              <Card className="border-green-100 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-green-700 mb-1">Limited Time Special Offer!</h2>
                      <p className="text-green-600">{unit.incentives.join(', ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

<Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Unit Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">Bedrooms</h3>
                      <p className="text-gray-600">{unit.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-purple-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">Bathrooms</h3>
                      <p className="text-gray-600">{unit.baths}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-orange-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">Size</h3>
                      <p className="text-gray-600">{unit.size}</p>
                    </div>
                  </div> 
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">Available </h3>
                      <p className="text-gray-600">{unit.moveInDate || "Now"} </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {unit.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+1 (217) 555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">leasing@property.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fees & Deposits */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Fees & Deposits</h2>
                <div className="space-y-4">
                  {unit.fees.map((fee, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">{fee.title}</span>
                      <span className="font-medium">{formatPrice(fee.amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowMessage(true)}>
                Contact Us
              </Button>
              <Button className="flex-1" onClick={() => setShowLeaseRequest(true)}>Request Lease</Button>
            </div>
          </div>
        </div>
      </div>
       <MessageDialog
              propertyEmail={property.contact.email || ''}
              open={showMessage}
              onOpenChange={setShowMessage}
            />
      
            <LeaseRequestDialog
              property={property as Property}
              open={showLeaseRequest}
              onOpenChange={setShowLeaseRequest}
            />
    </div>
  );
}