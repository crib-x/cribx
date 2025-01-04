"use client";

import { useFieldArray, useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHARGE_TYPES } from "@/lib/constants/property-options";

const formSchema = z.object({
  fees: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      amount: z.number().min(0),
      id: z.string().optional(),
    })
  ),
  allow_pet: z.boolean(),
  allowed_types: z.array(z.string()),
  monthly_rent: z.number().min(0),
  onetime_pet_fee: z.number().min(0),
  pet_limit: z.number().min(0),
  weight_limit: z.string(),
  charges: z.array(
    z.object({
      type: z.string(),
      id: z.string().optional(),
      description: z.string(),
      amount: z.number().min(0),
    })
  ),
});

interface PropertyFeesFormProps {
  data: any;
  onSubmit: (data: any) => Promise<void>;
}

export default function PropertyFeesForm({
  data,
  onSubmit,
}: PropertyFeesFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fees: data.property_fees || [],
      allow_pet: data.allow_pet || true,
      allowed_types: data?.allowed_types || [],
      monthly_rent: data?.monthly_rent ||  0,
      onetime_pet_fee: data?.onetime_pet_fee || 0,
      pet_limit: data?.pet_limit || 0,
      weight_limit: data?.weight_limit,
      charges: data.property_charges || [],
    },
  });

  const {
    fields: feeFields,
    append: appendFee,
    remove: removeFee,
  } = useFieldArray({
    control: form.control,
    name: "fees",
  });

  const {
    fields: waterChargeFields,
    append: appendWaterCharge,
    remove: removeWaterCharge,
  } = useFieldArray({
    control: form.control,
    name: "charges",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const cleanedData = {
        ...values,
        fees: values.fees.map(fee => {
          const { id, ...rest } = fee;
          return id ? { id, ...rest } : rest;  // Only include ID if it exists
        }),
        charges: values.charges.map(charge => {
          const { id, ...rest } = charge;
          return id ? { id, ...rest } : rest;  // Only include ID if it exists
        }),
      };
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        id="step-2-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8"
      >
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
            name="allow_pet"
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

          {form.watch("allow_pet") && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="monthly_rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Pet Rent</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="onetime_pet_fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Pet Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pet_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight_limit"
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
            <h3 className="text-lg font-semibold">Property Charges</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendWaterCharge({ type: "", amount: 0, description: "" })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Charge
            </Button>
          </div>
          {/* <div className="grid grid-cols-3 gap-4"> */}
          {waterChargeFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name={`charges.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Property Type</FormLabel> */}
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
                        {CHARGE_TYPES.map((type) => (
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
                name={`charges.${index}.description`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Charge description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="flex gap-4 items-start">
               <FormField
                control={form.control}
                name={`charges.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Amount"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
             
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
}
