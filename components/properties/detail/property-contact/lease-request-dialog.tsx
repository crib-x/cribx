"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import LeaseRequestForm from "../../lease-request/lease-request-form";
import SuccessPopup from "../../lease-request/lease-success";
import { PropertyUnit } from "@/lib/types/unit";
import { Property } from "@/lib/types/property";


interface Unit {
  id?: string;
  externalId?: string;
}

interface LeaseRequestDialogProps {
  property: Property;
  unit: PropertyUnit;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LeaseRequestDialog({
  property,
  unit,
  open,
  onOpenChange,
}: LeaseRequestDialogProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset success state when dialog closes
  useEffect(() => {
    if (!open) {
      setShowSuccess(false);
    }
  }, [open]);

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>{showSuccess ? 'Complete Your Lease Request': 'Request to Lease'}</DialogTitle>
        </DialogHeader>
        {showSuccess ? (
          <SuccessPopup onClose={handleClose} propertyUrl={`${property?.externalListingUrl}${unit?.externalId}&source=cribx`} />
        ) : (
          <LeaseRequestForm
            unit={unit}
            property={property}
            link={`${property?.externalListingUrl}${unit?.externalId}&source=cribx`}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}