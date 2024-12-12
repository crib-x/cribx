"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from 'framer-motion'
import ImageGallery from './image-gallery'
import { useNotificationStore } from '@/lib/store/notifications-store'
import { usePropertyStore } from '@/lib/store/property-store'

interface AddPropertyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const steps = [
  { id: 'basic', title: 'Basic Information' },
  { id: 'images', title: 'Property Images' },
  { id: 'amenities', title: 'Amenities' },
  { id: 'review', title: 'Review' }
]

export default function AddPropertyDialog({ open, onOpenChange }: AddPropertyDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    units: '',
    baseRent: '',
    description: '',
    amenities: [] as string[]
  })

  const addNotification = useNotificationStore((state) => state.addNotification)
  const addProperty = usePropertyStore((state) => state.addProperty)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, you would upload images to a storage service here
      const imageUrls = images.map(file => URL.createObjectURL(file))

      addProperty({
        name: formData.name,
        type: formData.type,
        address: formData.address,
        units: parseInt(formData.units),
        occupied: 0,
        revenue: `$${parseInt(formData.baseRent) * parseInt(formData.units)}`,
        status: 'Active',
        images: imageUrls,
        description: formData.description,
        amenities: formData.amenities
      })

      addNotification({
        title: 'Success',
        message: 'Property added successfully',
        type: 'success'
      })

      onOpenChange(false)
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to add property',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center"
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-12 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Property Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter property name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Property Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="shared">Shared Housing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter property address"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="units">Total Units</Label>
                    <Input
                      id="units"
                      type="number"
                      value={formData.units}
                      onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                      placeholder="Number of units"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="baseRent">Base Rent</Label>
                    <Input
                      id="baseRent"
                      type="number"
                      value={formData.baseRent}
                      onChange={(e) => setFormData({ ...formData, baseRent: e.target.value })}
                      placeholder="Monthly rent amount"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter property description"
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="images"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ImageGallery
                  images={images}
                  onImagesChange={setImages}
                  maxImages={10}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="amenities"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Label>Property Amenities</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Pool',
                    'Gym',
                    'Parking',
                    'Security',
                    'Pet Friendly',
                    'Study Room',
                    'Laundry',
                    'Package Lockers'
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              amenities: [...formData.amenities, amenity]
                            })
                          } else {
                            setFormData({
                              ...formData,
                              amenities: formData.amenities.filter(a => a !== amenity)
                            })
                          }
                        }}
                      />
                      <label htmlFor={amenity}>{amenity}</label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="rounded-lg border p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold">Property Details</h3>
                    <p>{formData.name}</p>
                    <p className="text-sm text-gray-500">{formData.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Units</h4>
                      <p>{formData.units}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Base Rent</h4>
                      <p>${formData.baseRent}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Images</h4>
                    <p>{images.length} images uploaded</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? "Adding Property..." : "Add Property"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}