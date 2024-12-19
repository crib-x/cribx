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
import ImageGallery from "@/components/dashboard/image-gallery"

const formSchema = z.object({
  images: z.array(z.any()),
  floorPlan: z.array(z.any()),
  unitMedia: z.array(z.any())
})

interface PropertyMediaFormProps {
  data: any
  onDataChange: (data: any) => void
}

export default function PropertyMediaForm({ data, onDataChange }: PropertyMediaFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: data.images || [],
      floorPlan: data.floorPlan || [],
      unitMedia: data.unitMedia || []
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onDataChange({ ...data, ...values })
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Images</FormLabel>
              <FormControl>
                <ImageGallery
                  images={field.value}
                  onImagesChange={field.onChange}
                  maxImages={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="floorPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor Plans</FormLabel>
              <FormControl>
                <ImageGallery
                  images={field.value}
                  onImagesChange={field.onChange}
                  maxImages={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitMedia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Photos</FormLabel>
              <FormControl>
                <ImageGallery
                  images={field.value}
                  onImagesChange={field.onChange}
                  maxImages={20}
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