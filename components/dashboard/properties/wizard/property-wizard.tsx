"use client";

import { useState } from "react";
import { FormWizard } from "@/components/ui/form-wizard";
import PropertyBasicForm from "./steps/property-basic-form";
import PropertySpecsForm from "./steps/property-specs-form";
import PropertyFeesForm from "./steps/property-fees-form";
import PropertyMediaForm from "./steps/property-media-form";
import { useNotificationStore } from "@/lib/store/notifications-store";
import { Charge, Charges, Fee, Property } from "@/lib/types/property";
import {
  createProperty,
  updateProperty,
  updatePropertyCharges,
  updatePropertyFees,
  uploadPropertyMedia,
} from "@/app/actions/properties";

const steps = [
  { id: "basic", title: "Basic Info" },
  { id: "specs", title: "Specifications" },
  { id: "fees", title: "Fees & Policies" },
  { id: "media", title: "Media" },
];

interface PropertyWizardProps {
  initialData?: Partial<Property>;
  onSuccess: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  mode?: "create" | "edit";
}

export default function PropertyWizard({
  initialData,
  onSuccess,
  isSubmitting,
  setIsSubmitting,
  mode = "create",
}: PropertyWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Property>>(
    initialData || {}
  );
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const handleStepSubmit = async (stepData: Partial<Property>) => {
    console.log("Step data:", stepData, mode, formData.id);
    // setCurrentStep((prev) => prev + 1);
    // return
    setIsSubmitting(true);
    try {
      // Merge new step data with existing form data
      const updatedData = {
        ...formData,
        ...stepData,
      };
      setFormData(updatedData);
      console.log("Step data:", stepData);

      // Save to backend
      let response: any;
      console.log("Current step:", currentStep);
      if (formData?.id) {
        if (currentStep === 2) {
          const { fees, charges, ...feesPolicy } = stepData;
          console.log("Fees policy:", feesPolicy, fees, charges);
          const propertyId = formData.id as string;
          fees?.forEach((fee: Fee) => (fee.property_id = propertyId));
          charges?.forEach((charge: Charges) => (charge.property_id = propertyId));
          response = await updateProperty(propertyId, feesPolicy);
          await updatePropertyFees(fees);
          await updatePropertyCharges(charges);
        } else if(currentStep == 3){
          response = await uploadPropertyMedia(formData.id as string, stepData);
        } else {
          console.log("Uploading file in current step:", currentStep);
          response = await updateProperty(formData.id as string, stepData);
        }
      } else {
        response = await createProperty(updatedData as Omit<Property, "id">);
        setFormData((prev) => ({ ...prev, id: response?.id }));
      }

      // Show success notification
      addNotification({
        title: "Success",
        message: response?.message || "Step saved successfully",
        type: "success",
      });

      // If this is the last step, call onSuccess
      if (currentStep === steps.length - 1) {
        onSuccess?.();
      } else {
        // Move to next step
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to save step:", error);
      addNotification({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to save step",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-sm p-6">
      <FormWizard
        steps={steps}
        currentStep={currentStep}
        onPrev={handlePrev}
        isSubmitting={isSubmitting}
      >
        {currentStep === 0 && (
          <PropertyBasicForm
            data={formData}
            onSubmit={handleStepSubmit}
            mode={mode}
          />
        )}
        {currentStep === 1 && (
          <PropertySpecsForm
            data={formData}
            onSubmit={handleStepSubmit}
            mode={mode}
          />
        )}
        {currentStep === 2 && (
          <PropertyFeesForm data={formData} onSubmit={handleStepSubmit} />
        )}
        {currentStep === 3 && (
          <PropertyMediaForm data={formData} onSubmit={handleStepSubmit} />
        )}
      </FormWizard>
    </div>
  );
}
