import * as z from "zod"

export const leaseRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  needsPickup: z.boolean(),
  arrivalDate: z.date().optional(),
  unitId: z.string().optional(),
  externalUnitId: z.string().optional(),
  arrivalTime: z.string().optional(),
  moveInDate: z.date(),
  message: z.string().optional()
}).refine((data) => {
  // If needsPickup is true, require arrival date and time
  if (data.needsPickup) {
    return data.arrivalDate && data.arrivalTime;
  } 
  return true;
}, {
  message: "Arrival date and time are required when pickup is needed",
  path: ["arrivalDate"]
});

export type LeaseRequestFormSchema = z.infer<typeof leaseRequestSchema>;