import { Property } from "@/lib/types/property";
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
  onSuccess?: () => void;
  onError?: () => void;
}