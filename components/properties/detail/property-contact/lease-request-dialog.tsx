"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeaseRequestDialogProps } from "./types";
import LeaseRequestForm from "../../lease-request/lease-request-form";

export default function LeaseRequestDialog({
  property,
  open,
  onOpenChange,
}: LeaseRequestDialogProps) {
  const securityDeposit =
    property.fees?.find((f) =>
      f.title.toLowerCase().includes("security deposit")
    )?.amount || 500; // Default to 500 if not specified

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Request to Lease</DialogTitle>
        </DialogHeader>
        <LeaseRequestForm
          property={property}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
 