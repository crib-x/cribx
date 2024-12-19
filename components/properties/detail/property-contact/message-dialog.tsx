'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MessageForm } from './message-form'

interface MessageDialogProps {
  propertyEmail: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MessageDialog({ propertyEmail, open, onOpenChange }: MessageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>
        <MessageForm 
          propertyEmail={propertyEmail} 
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}