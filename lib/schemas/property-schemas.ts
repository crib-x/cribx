
import * as z from 'zod'

export const propertySchema = z.object({
  // Step 1: Property Details
  title: z.string().min(2, "Title must be at least 2 characters"),
  address: z.string().min(5, "Address is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  communityFeatures: z.array(z.string()),
  
  // Step 2: Pricing & Incentives
  price: z.object({
    min: z.number().min(0),
    max: z.number().min(0)
  }),
  incentives: z.array(z.object({
    title: z.string()
  })),
  fees: z.array(z.object({
    title: z.string(),
    amount: z.number()
  })),

  // Step 3: Policies
  pet: z.object({
    allowed: z.boolean(),
    typesAllowed: z.array(z.string()),
    monthlyRent: z.number(),
    oneTimeFee: z.number(),
    countLimit: z.number(),
    weightLimit: z.string()
  }),
  parking: z.object({
    type: z.string(),
    spaces: z.number(),
    cost: z.number().optional()
  }),
  charges: z.object({
    water: z.array(z.object({
      title: z.string(),
      amount: z.number()
    }))
  }),

  // Step 4: Media
  images: z.array(z.any()),
  floorPlan: z.array(z.object({
    title: z.string(),
    imageUrl: z.string()
  })),
  videos: z.array(z.object({
    title: z.string(),
    url: z.string()
  }))
})

export type PropertyFormData = z.infer<typeof propertySchema>
