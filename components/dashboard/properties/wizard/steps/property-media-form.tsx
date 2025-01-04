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
  data: any;
  onSubmit: (data: any) => Promise<void>;
}

export default function PropertyMediaForm({ data, onSubmit }: PropertyMediaFormProps) {
  const convertToString = (list: any[], key: string) => {
    return list.filter(item => item?.type === key).map((item) => item.url)

 }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: convertToString(data.property_media || [], 'image'),
      floorPlan: convertToString(data.property_media || [], 'floor_plans'),
      unitMedia: convertToString(data.property_media || [], 'units'),
    }
  })



  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }

  return (
    <Form {...form}>
      <form 
        id="step-3-form" 
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Outdoor Images</FormLabel>
              <FormControl>
                <ImageGallery
                  description="Property Outdoor Images are the first images that will be displayed on your property listing."
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
          name="unitMedia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Indoor Images</FormLabel>
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
     
      </form>
    </Form>
  )
}