import * as React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { AMENITIES_OPTIONS } from "@/lib/constants/property-options";

const formSchema = z.object({
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  square_footage: z.string().optional(),
  amenities: z.array(z.string()),
  community_features: z.array(z.string()),
});

interface PropertySpecsFormProps {
  data: any;
  onSubmit: (data: any) => Promise<void>;
  mode?: "create" | "edit";
}

export default function PropertySpecsForm({
  data,
  onSubmit,
}: PropertySpecsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bedrooms: data?.bedrooms ?? 0,
      bathrooms: data?.bathrooms ?? 0,
      square_footage: data?.square_footage ?? "",
      amenities: data?.amenities ?? [],
      community_features: data?.community_features ?? [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        id="step-1-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="0"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : 0
                      )
                    }
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="0"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : 0
                      )
                    }
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="square_footage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Square Footage</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="34*100"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value 
                      )
                    }
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indoor Features</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {AMENITIES_OPTIONS.map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => (
                      <FormItem
                        key={option.value}
                        className="flex flex-row items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, option.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== option.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="community_features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Community Features</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {AMENITIES_OPTIONS.map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="community_features"
                    render={({ field }) => (
                      <FormItem
                        key={option.value}
                        className="flex flex-row items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, option.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== option.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
