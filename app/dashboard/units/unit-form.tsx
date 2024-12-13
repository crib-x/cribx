"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ImageGallery from "@/components/dashboard/image-gallery"
import { Unit } from "@/lib/types/unit"
import { useState } from "react"
import { usePropertyStore } from "@/lib/store/property-store"

const unitSchema = z.object({
  number: z.string().min(1, "Unit number is required"),
  type: z.string(),
  rent: z.string().min(1, "Rent amount is required"),
  status: z.string(),
  amenities: z.array(z.string()),
  images: z.array(z.any()),
})

interface UnitFormProps {
  onSubmit: (data: any) => Promise<void>
  isSubmitting: boolean
  initialData?: Unit
  propertyId?: number
}

export default function UnitForm({ 
  onSubmit, 
  isSubmitting, 
  initialData,
  propertyId 
}: UnitFormProps) {
  const [images, setImages] = useState<File[]>(initialData?.images || [] as any)
  const { properties } = usePropertyStore()

  const form = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      number: initialData?.number || "",
      type: initialData?.type || "",
      rent: initialData?.rent?.toString() || "",
      status: initialData?.status || "available",
      amenities: initialData?.amenities || [],
      images: [],
    },
  })

  const handleSubmit = async (values: z.infer<typeof unitSchema>) => {
    await onSubmit({
      ...values,
      rent: parseFloat(values.rent),
      property_id: propertyId,
      images,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter unit number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="1bed">1 Bedroom</SelectItem>
                    <SelectItem value="2bed">2 Bedrooms</SelectItem>
                    <SelectItem value="3bed">3 Bedrooms</SelectItem>
                    <SelectItem value="4bed">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rent</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter monthly rent"
                    min="0"
                    step="0.01"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>Unit Images</FormLabel>
          <ImageGallery
            images={images}
            onImagesChange={setImages}
            maxImages={10}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Unit"}
          </Button>
        </div>
      </form>
    </Form>
  )
}