"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { unitSchema } from "@/lib/schemas/unit-schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { MultiSelect } from "@/components/ui/multi-select"
import { AMENITIES_OPTIONS, LEASE_TERMS } from '@/lib/constants/property-options'
import { PropertyUnit } from "@/lib/types/unit"
import ImageGallery from "@/components/dashboard/image-gallery"

interface UnitFormProps {
  propertyId: string
  initialData?: Partial<PropertyUnit>
  onSubmit: (data: PropertyUnit) => Promise<void>
  isEditing?: boolean
}

export default function UnitForm({ 
  propertyId, 
  initialData, 
  onSubmit,
  isEditing = false 
}: UnitFormProps) {
  const form = useForm({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      propertyId,
      ...initialData,
      type: initialData?.type || "Apartment",
      rent: initialData?.rent || {
        price: 0,
        deposit: 0,
        incentives: []
      },
      amenities: initialData?.amenities || [],
      availability: initialData?.availability || {
        isAvailable: true,
        moveInDate: null,
        leaseTerms: []
      },
      images: initialData?.images || []
    }
  })

  // const handleSubmit = async (data: PropertyUnit) => {
  //   try {
  //     await onSubmit(data)
  //     form.reset()
  //   } catch (error) {
  //     console.error('Failed to submit unit:', error)
  //   }
  // }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Name/Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Unit 101" {...field} />
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
                <FormControl>
                  <Input placeholder="e.g., Studio, 1BR, 2BR" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rent.price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rent</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rent.deposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Deposit</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Square Footage</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0" 
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Amenities</FormLabel>
              <FormControl>
                <MultiSelect
                  options={AMENITIES_OPTIONS}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select amenities"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability.isAvailable"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Available for Rent</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability.leaseTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Lease Terms</FormLabel>
              <FormControl>
                <MultiSelect
                  options={LEASE_TERMS}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select lease terms"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter unit description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Images</FormLabel>
              <FormControl>
                {/* <ImageGallery
                  images={field.value}
                  onImagesChange={field.onChange}
                  maxImages={10}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : isEditing ? "Update Unit" : "Add Unit"}
        </Button>
      </form>
    </Form>
  )
}
