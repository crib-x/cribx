"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { leaseRequestSchema, type LeaseRequestFormSchema } from './form-schema'
import { LeaseRequestProps } from './types'
import { generateDiscountCode, calculateDiscount } from '@/lib/utils/discount-code'
import { getAgentLeaseRequestEmailTemplate, getLeaseRequestEmailTemplate } from '@/lib/services/email-templates'
import { sendEmail } from '@/lib/services/email-service'
import { useNotificationStore } from '@/lib/store/notifications-store'

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return `${hour}:00`
})

export default function LeaseRequestForm({ 
  property,
  onSuccess,
  onError 
}: LeaseRequestProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addNotification = useNotificationStore((state) => state.addNotification)

  const form = useForm<LeaseRequestFormSchema>({
    resolver: zodResolver(leaseRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      needsPickup: false,
      message: ""
    }
  })

  const needsPickup = form.watch('needsPickup')

  const onSubmit = async (data: LeaseRequestFormSchema) => {
    setIsSubmitting(true)
    try {
      // Generate discount code and calculate amount
      const discountCode = generateDiscountCode()
      const discountAmount = `$${property?.incentives?.discount?.amount || 0}`

      // Send confirmation email
      await sendEmail({
        to: data.email,
        subject: `Your Lease Request - ${discountCode}`,
        html: getLeaseRequestEmailTemplate({
          name: data.name,
          discountCode,
          propertyName: property.title,
          discountAmount
        })
      })
      await sendEmail({
        to: property.contact.email as string,
        subject: `New Lease Request - ${discountCode}`,
        html: getAgentLeaseRequestEmailTemplate({
          propertyName: property.title,
          name: data.name,
          email: data.email,
          discountCode,
          discountAmount,
          moveInDate: data.moveInDate as any,
          phone: data.phone,
          needsPickup: data.needsPickup,
        })
      })

      // TODO: Store lease request in database
      // await leaseRequestService.submitRequest({
      //   propertyId,
      //   ...data,
      //   discountCode,
      //   discountAmount
      // })

      addNotification({
        title: "Success",
        message: "Lease request submitted successfully! Check your email for the discount code.",
        type: "success"
      })

      onSuccess?.()
    } catch (error) {
      console.error('Failed to submit lease request:', error)
      addNotification({
        title: "Error",
        message: "Failed to submit lease request. Please try again.",
        type: "error"
      })
      onError?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="needsPickup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Need Pick Up From Macomb Train Station?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === 'true')}
                  defaultValue={field.value ? 'true' : 'false'}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="pickup-yes" />
                    <label htmlFor="pickup-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="pickup-no" />
                    <label htmlFor="pickup-no">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {needsPickup && (
          <>
            <FormField
              control={form.control}
              name="arrivalDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arrivalTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival Time</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select arrival time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="moveInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Move-In Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any special requests or questions?"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </Form>
  )
}