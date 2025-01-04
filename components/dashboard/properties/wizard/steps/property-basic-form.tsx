"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/lib/constants/property-options";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.string(),
  other_phone: z.string().optional(),
  featured_image: z.string().optional(),
  logo: z.string().optional(),
  contact_name: z.string().min(2, "Contact name is required"),
  contact_email: z.string().email("Invalid email address"),
  contact_phone: z.string().min(10, "Valid phone number is required"),
});

interface PropertyBasicFormProps {
  data: any;
  onSubmit: (data: any) => Promise<void>;
  mode?: 'create' | 'edit';
}

export default function PropertyBasicForm({
  data,
  onSubmit,
}: PropertyBasicFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      address: data?.address || "",
      description: data?.description || "",
      type: data?.type || "",
      featured_image: data?.featuredImage || "",
      logo: data?.logo || "",
      contact_name: data?.contact_name || "",
      contact_email: data?.contact_email || "",
      contact_phone: data?.contact_phone || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
    } catch (error) {
      // The form will stay on the current step if submission fails
      console.error('Form submission failed:', error);
    }
  };

  return (
    <Form {...form}>
      <form 
        id="step-0-form"
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter property title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter property address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter property description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contact_name"
              render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter contact name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="Enter contact email" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_phone"
              render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Contact Number</FormLabel>
            <FormControl>
              <Input 
                type="tel"
                placeholder="Enter contact phone"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="other_phone"
              render={({ field }) => (
          <FormItem>
            <FormLabel>Other Contact Number</FormLabel>
            <FormControl>
              <Input 
                type="tel"
                placeholder="Enter contact phone"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
