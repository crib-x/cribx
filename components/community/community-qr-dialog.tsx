"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommunityQRScanner({ open, onOpenChange }: MessageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Scan to join our community </DialogTitle>
      </DialogHeader>
      
        <div className="relative w-full h-64">
        <Image src="/images/qrcode.png" layout="fill" alt="scan" className="object-contain" />
        </div>
     
    </DialogContent>
    </Dialog>
  );
}
