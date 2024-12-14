
import * as z from 'zod'

export const unitSchema = z.object({
  number: z.string().min(1, "Unit number is required"),
  type: z.string(),
  floor: z.number().min(0),
  occupancyLimit: z.number().min(1),
  rent: z.number().min(0),
  size: z.number().min(0),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  status: z.string(),
  amenities: z.array(z.string()),
  policies: z.object({
    petPolicy: z.object({
      allowed: z.boolean(),
      restrictions: z.string().optional()
    }),
    parkingPolicy: z.object({
      included: z.boolean(),
      spaces: z.number().optional()
    })
  }),
  images: z.array(z.any()),
  floorPlan: z.string().optional(),
  description: z.string().optional()
})

export type UnitFormData = z.infer<typeof unitSchema>