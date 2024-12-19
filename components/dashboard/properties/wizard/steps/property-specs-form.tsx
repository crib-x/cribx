"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { AMENITIES_OPTIONS } from '@/lib/constants/property-options'

const formSchema = z.object({
  specs: z.object({
    beds: z.number().min(0),
    baths: z.number().min(0),
    sqft: z.number().min(0)
  }),
  amenities: z.array(z.string()),
  communityFeatures: z.array(z.string())
})

interface PropertySpecsFormProps {
  data: any
  onDataChange: (data: any) => void
  mode?: 'create' | 'edit'
}

export default function PropertySpecsForm({ 
  data, 
  onDataChange,
  mode = 'create'
}: PropertySpecsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specs: data.specs || { beds: 0, baths: 0, sqft: 0 },
      amenities: data.amenities || [],
      communityFeatures: data.communityFeatures || []
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onDataChange(values)
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="specs.beds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
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
            name="specs.baths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
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
            name="specs.sqft"
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
        </div>

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
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
          name="communityFeatures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Community Features</FormLabel>
              <FormControl>
                <MultiSelect
                  options={AMENITIES_OPTIONS}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select community features"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}