"use client"

import { useFieldArray, useForm } from "react-hook-form"
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
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  fees: z.array(z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.number().min(0)
  })),
  pet: z.object({
    allowed: z.boolean(),
    typesAllowed: z.array(z.string()),
    monthlyRent: z.number().min(0),
    oneTimeFee: z.number().min(0),
    countLimit: z.number().min(0),
    weightLimit: z.string()
  }),
  charges: z.object({
    water: z.array(z.object({
      title: z.string(),
      amount: z.number().min(0)
    }))
  })
})

interface PropertyFeesFormProps {
  data: any
  onDataChange: (data: any) => void
}

export default function PropertyFeesForm({ data, onDataChange }: PropertyFeesFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fees: data.fees || [],
      pet: data.pet || {
        allowed: false,
        typesAllowed: [],
        monthlyRent: 0,
        oneTimeFee: 0,
        countLimit: 0,
        weightLimit: ""
      },
      charges: data.charges || {
        water: []
      }
    }
  })

  const { fields: feeFields, append: appendFee, remove: removeFee } = useFieldArray({
    control: form.control,
    name: "fees"
  })

  const { fields: waterChargeFields, append: appendWaterCharge, remove: removeWaterCharge } = useFieldArray({
    control: form.control,
    name: "charges.water"
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onDataChange({ ...data, ...values })
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Fees Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Fees</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendFee({ title: "", amount: 0 })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Fee
            </Button>
          </div>

          {feeFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name={`fees.${index}.title`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Fee Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`fees.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Amount" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFee(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Pet Policy Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pet Policy</h3>
          
          <FormField
            control={form.control}
            name="pet.allowed"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Pets Allowed</FormLabel>
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

          {form.watch("pet.allowed") && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="pet.monthlyRent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Pet Rent</FormLabel>
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
                name="pet.oneTimeFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Pet Fee</FormLabel>
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pet.countLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Limit</FormLabel>
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
                  name="pet.weightLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight Limit</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 50 lbs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {/* Water Charges Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Water Charges</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendWaterCharge({ title: "", amount: 0 })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Charge
            </Button>
          </div>

          {waterChargeFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name={`charges.water.${index}.title`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Charge Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charges.water.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Amount" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeWaterCharge(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </form>
    </Form>
  )
}
