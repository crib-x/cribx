import { Property } from '@/lib/types/property'

export interface PropertyContactProps {
  property: Property
  onLeaseRequest?: () => void
}

export interface LeaseRequestDialogProps {
  property: Property
  open: boolean
  onOpenChange: (open: boolean) => void
}