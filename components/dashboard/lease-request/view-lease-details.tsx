// view-lease-details.tsx
"use client"

import { LeaseRequest } from "./columns"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Tag, 
  MessageSquare,
  Truck,
  ClipboardCheck
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ViewLeaseDetailsProps {
  leaseRequest: LeaseRequest
  onClose: () => void
}

export function ViewLeaseDetails({ leaseRequest, onClose }: ViewLeaseDetailsProps) {

  return (
    <DialogContent >
      <DialogHeader>
        <DialogTitle>Lease Request Details</DialogTitle>
        <DialogDescription>
          Complete information about the lease request
        </DialogDescription>
      </DialogHeader>
      
      <ScrollArea className="max-h-[80vh] pr-4">
      <div className="space-y-6">
          {/* Status Banner */}
          <div className="flex items-center justify-between bg-secondary/20 p-4 rounded-lg">
            <div>
              <p className="text-sm font-medium">Request Status</p>
              <Badge variant={
                leaseRequest.status === 'pending' ? "warning" :
                leaseRequest.status === 'approved' ? "success" :
                leaseRequest.status === 'rejected' ? "destructive" :
                "secondary"
              } className="mt-1">
                {leaseRequest.status.charAt(0).toUpperCase() + leaseRequest.status.slice(1)}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Request ID</p>
              <p className="text-sm text-muted-foreground mt-1">{leaseRequest.id}</p>
            </div>
          </div>

          {/* Requestor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Requestor Information</CardTitle>
              <CardDescription>Personal details of the applicant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <ClipboardCheck className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">{leaseRequest.requestor_name}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{leaseRequest.requestor_email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{leaseRequest.requestor_phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created At</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(leaseRequest.created_at), "PPP p")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
              <CardDescription>Information about the requested property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Property Name</p>
                    <p className="text-sm text-muted-foreground">{leaseRequest.property_title}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Move-in Date</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(leaseRequest.move_in_date), "PPP")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Tag className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Discount Code</p>
                    <p className="text-sm text-muted-foreground">{leaseRequest.discount}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Property Manager Email</p>
                    <p className="text-sm text-muted-foreground">{leaseRequest.receiver_email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Pickup Service</p>
                    <Badge variant={leaseRequest.needs_pickup === 'true' ? "default" : "secondary"}>
                      {leaseRequest.needs_pickup === 'true' ? "Requested" : "Not Needed"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Message */}
          {leaseRequest.message && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Message</CardTitle>
                <CardDescription>Message from the requestor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 mt-1 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{leaseRequest.message}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline or Activity Log could be added here */}
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}