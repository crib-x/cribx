"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { unitSchema } from "@/lib/schemas/unit-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  AMENITIES_OPTIONS,
} from "@/lib/constants/property-options";
import { PropertyUnit } from "@/lib/types/unit";
import ImageGallery from "@/components/dashboard/image-gallery";
import { SelectValue } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface UnitFormProps {
  propertyId: string;
  initialData?: Partial<PropertyUnit>;
  onSubmit: (data: PropertyUnit[]) => Promise<void>;
  isEditing?: boolean;
}

const DURATION_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "semester", label: "Semester (6 months)" },
  { value: "yearly", label: "Yearly" },
];

const UNIT_TYPES = [
  { value: "studio", label: "Studio" },
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
];

const NAMING_PATTERNS = [
  { value: "number", label: "Numbers (101, 102, 103...)" },
  { value: "letter", label: "Letters (A, B, C...)" },
  { value: "custom", label: "Custom Pattern" },
];

interface UnitPreview {
  name: string;
}

export default function UnitForm({
  propertyId,
  initialData,
  onSubmit,
}: UnitFormProps) {
  const [unitPreview, setUnitPreview] = useState<UnitPreview[]>([]);
  const [namingPattern, setNamingPattern] = useState("number");
  const [startingNumber, setStartingNumber] = useState(101);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [duration, setDuration] = useState("monthly");

  const calculateAdjustedRent = (baseRent: number, duration: string) => {
    switch (duration) {
      case "semester":
        return baseRent * 6;
      case "yearly":
        return baseRent * 12;
      default:
        return baseRent;
    }
  };
  

  const form = useForm({
    resolver: zodResolver(unitSchema),  
    defaultValues: {
      propertyId,
      quantity: 1,
      id: initialData?.id || "",
      name: initialData?.name || "",
      ...initialData,
      externalId: initialData?.externalId || "",
      type: initialData?.type || "Apartment",
      baths: initialData?.baths || 0,
      price: initialData?.price || 0,
      fees: initialData?.fees || [],
      rooms: initialData?.rooms || 0,
      paymentDuration: initialData?.paymentDuration || "monthly",
      size: initialData?.size || "",
      incentives: initialData?.incentives || [],
      isAvailable: initialData?.isAvailable || true,
      moveInDate: initialData?.moveInDate || null,
      amenities: initialData?.amenities || [],
      images: initialData?.images || [],
    } as PropertyUnit,
  });

  const generateUnitNames = () => {
    const quantity = form.watch("quantity") || 0;
    const units: UnitPreview[] = [];
    
    if (namingPattern === "number") {
      for (let i = 0; i < quantity; i++) {
        const number = startingNumber + i;
        units.push({
          name: `${prefix}${number}${suffix}`,
        });
      }
    } else if (namingPattern === "letter") {
      for (let i = 0; i < quantity; i++) {
        const letter = String.fromCharCode(65 + i); // A=65, B=66, etc.
        units.push({
          name: `${prefix}${letter}${suffix}`,
        });
      }
    }
    
    setUnitPreview(units);
  };

  const handleSubmit = async (formData: PropertyUnit) => {
    console.log("Form data:", formData);
    try {
      const units = unitPreview.map((preview) => {
        // Replace template strings in description
        const description = formData.description?.replace(/\{unit\}/g, preview.name);

        return {
          ...formData,
          name: preview.name,
          description,
          propertyId,
        };
      });
      console.log("Submitting units:", units);
      await onSubmit(units);
      form.reset();
      setUnitPreview([]);
    } catch (error) {
      console.error("Failed to submit units:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Units</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                      generateUnitNames();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Naming Pattern</FormLabel>
            <Select
              value={namingPattern}
              onValueChange={(value) => {
                setNamingPattern(value);
                generateUnitNames();
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select naming pattern" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {NAMING_PATTERNS.map((pattern) => (
                  <SelectItem key={pattern.value} value={pattern.value}>
                    {pattern.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>

          {namingPattern === "number" && (
            <FormItem>
              <FormLabel>Starting Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={startingNumber}
                  onChange={(e) => {
                    setStartingNumber(Number(e.target.value));
                    generateUnitNames();
                  }}
                />
              </FormControl>
            </FormItem>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Prefix (Optional)</FormLabel>
              <FormControl>
                <Input
                  value={prefix}
                  onChange={(e) => {
                    setPrefix(e.target.value);
                    generateUnitNames();
                  }}
                  placeholder="e.g., Unit-"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Suffix (Optional)</FormLabel>
              <FormControl>
                <Input
                  value={suffix}
                  onChange={(e) => {
                    setSuffix(e.target.value);
                    generateUnitNames();
                  }}
                  placeholder="e.g., -W"
                />
              </FormControl>
            </FormItem>
          </div>
        </div>

        {unitPreview.length > 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This will create {unitPreview.length} units: {" "}
              {unitPreview.slice(0, 5).map(u => u.name).join(", ")}
              {unitPreview.length > 5 && "..."}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UNIT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This type will be applied to all units
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Square Footage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Applied to all units
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          
        <FormField
    control={form.control}
    name="paymentDuration"
    render={({  }) => (
      <FormItem>
        <FormLabel>Rent Duration</FormLabel>
        <Select
          onValueChange={(value) => {
            setDuration(value);
            // Update the rent field when duration changes
            const baseRent = form.getValues("price");
            const adjustedRent = calculateAdjustedRent(baseRent, value);
            form.setValue("price", adjustedRent);
          }}
          value={duration}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {DURATION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormDescription>
          Select the rent payment duration
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="price"
    render={({ field }) => (
      <FormItem>
        <FormLabel>{duration === "monthly" ? "Monthly" : duration === "semester" ? "Semester" : "Yearly"} Rent</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="0"
            {...field}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              field.onChange(newValue);
            }}
          />
        </FormControl>
        <FormDescription>
          Base rent for all units ({duration.toLowerCase()} payment)
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
          <FormField
            control={form.control}
            name="deposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Deposit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Applied to all units
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="amenities"
          render={({ }) => (
            <FormItem>
              <FormLabel>Unit Amenities</FormLabel>
              <FormDescription>
                These amenities will be applied to all units
              </FormDescription>
              <FormControl>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {AMENITIES_OPTIONS.map((amenity) => (
                    <FormField
                      key={amenity.value}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => (
                        <FormItem
                          key={amenity.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(amenity.value)}
                              onCheckedChange={(checked) => {
                                const updatedAmenities = checked
                                  ? [...field.value, amenity.value]
                                  : field.value?.filter((value) => value !== amenity.value);
                                field.onChange(updatedAmenities);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {amenity.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div>
                <FormLabel>Available for Rent</FormLabel>
                <FormDescription>
                  Initial availability status for all units
                </FormDescription>
              </div>
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description Template</FormLabel>
              <FormDescription>
                Base description for all units. You can use {`{unit}`} placeholder.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Beautiful unit {unit} with modern amenities..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Unit Images</FormLabel>
              <FormDescription>
                These images will be used as default for all generated units
              </FormDescription>
              <FormControl>
                <ImageGallery
                  images={field.value}
                  onImagesChange={field.onChange}
                  maxImages={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter >
          <div className="flex flex-col space-y-4">
             <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Review the unit preview above before submitting. All units will share the same base configuration for amenities, rent, and other settings.
            </AlertDescription>
          </Alert>
          <Button 
            type="submit" 
            disabled={form.formState.isSubmitting || unitPreview.length === 0}
            className="w-full"
            onClick={()=> {
              console.log('submitting', handleSubmit(form.getValues()))
            }}
          >
            {form.formState.isSubmitting
              ? "Creating Units..."
              : `Create ${unitPreview.length} Units`}
          </Button>
          </div>
         
        </DialogFooter>
      </form>
    </Form>
  )}