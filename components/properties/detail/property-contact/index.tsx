"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Phone, Mail, MessageSquare } from 'lucide-react'
import { MessageDialog } from './message-dialog'
import LeaseRequestDialog from './lease-request-dialog'
import { PropertyContactProps } from './types'

export default function PropertyContact({ property }: PropertyContactProps) {
  const [showLeaseRequest, setShowLeaseRequest] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  return (
    <>
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Interested in this property?</h3>
              <p className="text-sm text-gray-500">
                Contact us to schedule a tour or request more information
              </p>
            </div>

          

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div> */}

            {/* <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowLeaseRequest(true)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Apply Now
            </Button> */}

            {property.contact && (
              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-medium">Contact Information</h4>
                {property.contact.name && (
                  <p className="text-sm">{property.contact.name}</p>
                )}
                {property.contact.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {property.contact.phone}
                  </div>
                )}
                {property.contact.email && (
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {property.contact.email}
                  </div>
                )}
              </div>
            )}
              <div className="grid grid-cols-1 gap-4">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                
                onClick={() => setShowMessage(true)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <MessageDialog
        propertyEmail={property.contact.email || ''}
        open={showMessage}
        onOpenChange={setShowMessage}
      />

      {/* <LeaseRequestDialog
        property={property}
        open={showLeaseRequest}
        onOpenChange={setShowLeaseRequest}
      /> */}
    </>
  )
}
