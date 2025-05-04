"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  location: z.string().min(2),
  budget: z.number().min(0).max(5000),
  gender: z.string().nonempty(),
  lifestyle: z.string(),
  cleanliness: z.string(),
  quietHours: z.string(),

  smokingPreference: z.string(),
  petPreference: z.string(),
  shareItems: z.string(),
  noisePreference: z.string(),
  guestFrequency: z.string(),

  moveInDate: z.string().min(1, "Move-in date is required"),
  stayDuration: z.string(),
  interests: z.string(),
  cookingHabits: z.string(),
  cleaningHabits: z.string(),
  contactMethod: z.string().optional(),
});

// 2. Infer the TypeScript type from the schema
export type PreferencesFormData = z.infer<typeof formSchema>;

// 3. Define props with a properly typed onSubmit
interface MultiStepPreferencesFormProps {
  onSubmit: (data: PreferencesFormData) => void;
}

export default function MultiStepPreferencesForm({
  onSubmit,
}: MultiStepPreferencesFormProps) {
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      budget: 10000,
      gender: "",
      lifestyle: "",
      cleanliness: "",
      quietHours: "",
      smokingPreference: "",
      petPreference: "",
      shareItems: "",
      noisePreference: "",
      guestFrequency: "",
      moveInDate: "",
      stayDuration: "",
      interests: "",
      cookingHabits: "",
      cleaningHabits: "",
      contactMethod: "",
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Your Roommate Preferences</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter city or university..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Budget (${field.value})</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={5000}
                        step={50}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {["gender", "lifestyle", "cleanliness", "quietHours"].map(
                (name) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {name
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Select ${name
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}`}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {name === "gender" && (
                              <>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </>
                            )}
                            {name === "lifestyle" && (
                              <>
                                <SelectItem value="social">
                                  Very Social
                                </SelectItem>
                                <SelectItem value="moderate">
                                  Moderately Social
                                </SelectItem>
                                <SelectItem value="quiet">
                                  Quiet/Private
                                </SelectItem>
                              </>
                            )}
                            {name === "cleanliness" && (
                              <>
                                <SelectItem value="very-clean">
                                  Very Clean
                                </SelectItem>
                                <SelectItem value="average">Average</SelectItem>
                                <SelectItem value="relaxed">Relaxed</SelectItem>
                              </>
                            )}
                            {name === "quietHours" && (
                              <>
                                <SelectItem value="morning">
                                  Morning Quiet
                                </SelectItem>
                                <SelectItem value="evening">
                                  Evening Quiet
                                </SelectItem>
                                <SelectItem value="flexible">
                                  Flexible
                                </SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
              <Button type="button" className="w-full" onClick={nextStep}>
                Next
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              {[
                [
                  "smokingPreference",
                  ["smoker", "okay-with-smoking", "non-smoker"],
                ],
                [
                  "petPreference",
                  ["has-pets", "okay-with-pets", "allergic", "no-pets"],
                ],
                ["shareItems", ["yes", "maybe", "no"]],
                ["noisePreference", ["quiet", "moderate", "lively"]],
                ["guestFrequency", ["rarely", "occasionally", "frequently"]],
              ].map(([name, options]) => (
                <FormField
                  key={Array.isArray(name) ? name.join("-") : name}
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {typeof name === "string"
                          ? name
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())
                          : name}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={
                          field.value !== undefined
                            ? String(field.value)
                            : undefined
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Select ${String(name)
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}`}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(options as string[]).map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt
                                .replace(/-/g, " ")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex gap-4 justify-between">
                <Button type="button" onClick={prevStep}>
                  Back
                </Button>
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="moveInDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Move-in Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stayDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stay Duration</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short-term">Short Term</SelectItem>
                        <SelectItem value="long-term">Long Term</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests & Hobbies</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., music, fitness, reading..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {["cookingHabits", "cleaningHabits"].map((name) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {name
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter your ${name.replace(
                            /([A-Z])/g,
                            " $1"
                          )}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="contactMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Contact Method (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Instagram, WhatsApp, Email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 justify-between">
                <Button type="button" onClick={prevStep}>
                  Back
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
