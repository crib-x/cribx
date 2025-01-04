/* eslint-disable react/no-unescaped-entities */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendEmail } from "@/lib/services/email-service"
import { getContactForm } from "@/lib/services/email-templates"
import { useNotificationStore } from '@/lib/store/notifications-store'
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(3, "Message must be at least 10 characters"),
})

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addNotification = useNotificationStore((state) => state.addNotification)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await sendEmail({
        to: "admin@cribx.net",
        subject: `New Enquiry from ${values.name}`,
        html: getContactForm({
          name: values.name, 
          email: values.email, 
          message: values.message
        }),
      })
      
      addNotification({
        title: "Success",
        message: "Your message has been sent successfully!",
        type: "success"
      })
      
      form.reset()
    } catch (error) {
      console.error('Failed to submit message:', error)
      addNotification({
        title: "Error",
        message: "Failed to submit message. Please try again.",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We&apos;re here to help! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                      <Input placeholder="your.email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="How can we help you?"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}