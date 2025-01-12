import { Property } from "@/lib/types/property";
import { PropertyUnit } from "@/lib/types/unit";
export interface LeaseRequestFormData {
  name: string;
  email: string;
  phone: string;
  needsPickup: boolean;
  arrivalDate?: Date;
  arrivalTime?: string; 
  moveInDate: Date;
  message?: string;
}

export interface LeaseRequestProps {
  property: Property
  unit: PropertyUnit
  link?: string;
  onSuccess?: () => void;
  onError?: () => void;
}