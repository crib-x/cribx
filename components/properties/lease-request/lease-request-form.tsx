"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { leaseRequestSchema, type LeaseRequestFormSchema } from "./form-schema";
import { LeaseRequestProps } from "./types";
import { useNotificationStore } from "@/lib/store/notifications-store";
import { sendLeaseRequest } from "@/app/actions/lease";
import { LeaseRequestError } from "@/lib/utils/errorHandler";

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

export default function LeaseRequestForm({
  property,
  onSuccess,
  onError,
}: LeaseRequestProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LeaseRequestFormSchema>({
    resolver: zodResolver(leaseRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      needsPickup: false,
      message: "",
    },
  });

  const needsPickup = form.watch("needsPickup");

  const onSubmit = async (data: LeaseRequestFormSchema) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const discountAmount = `${property?.incentives?.discount?.amount || 0}`;
      const response = await sendLeaseRequest(
        data,
        property?.title,
        discountAmount,
        property?.contact?.email as string,
        property?.id as string
      );
      addNotification({
        title: "Success",
        message:
          response.message ||
          "Lease request submitted successfully! Check your email for the discount code.",
        type: "success",
      });

      onSuccess?.();
    } catch (error) {
      let errorMessage = error.message || "An unexpected error occurred. Please try again.";

      if (error instanceof LeaseRequestError) {
        switch (error.code) {
          case "DUPLICATE_REQUEST":
            errorMessage = error.message;
            break;
          case "DATABASE_ERROR":
            errorMessage =
              "Unable to process your request at this time. Please try again later.";
            break;
          case "EMAIL_ERROR":
            errorMessage =
              "Your request was saved but we couldn't send confirmation emails. Our team will contact you shortly.";
            break;
          default:
            errorMessage = "Something went wrong. Please try again.";
        }
      }
      setError(errorMessage);
      onError?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-800 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
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
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...field}
                />
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
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={field.value ? "true" : "false"}
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
                        disabled={(date) => date < new Date()}
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
              <Popover modal={true}>
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
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </Form>
  );
}
