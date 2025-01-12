import { Property } from '@/lib/types/property'
import { PropertyUnit } from '@/lib/types/unit'

export interface PropertyContactProps {
  property: Property
  onLeaseRequest?: () => void
}
 
export interface LeaseRequestDialogProps {
  property: Property
  unit?: PropertyUnit
  open: boolean
  onOpenChange: (open: boolean) => void
}