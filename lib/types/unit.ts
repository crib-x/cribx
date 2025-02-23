import { Fee } from "./property"

export interface Unit {
  id: number
  number: string
  property_id: number
  type: string
  rent: number
  status: string
  tenant: string | null
  lease_end: string | null
  images: string[]
  amenities: string[]
}

// Main Type for a Property Unit
export type PropertyUnit = {
  status?: string
  id: string; // Unique identifier for the unit
  propertyId: string; // ID of the property this unit belongs to
  externalId: string; // External ID for the unit (e.g., from a property management system)
  type:
  | "Studio"
  | "Apartment"
  | "Shared Housing"
  | "Room for Rent"
  | "Duplex"
  | "Loft"
  | "Townhouse"
  | "Single-Family Home"
  | "Basement Apartment"; // Types of units
  name: string; // Unit name or identifier (e.g., "Unit 1A", "Room 2B")
  occupancy?: number; // Maximum number of occupants
  paymentDuration: string; // Payment duration (e.g., "Monthly", "Weekly")
  price: number;
  perRoom?: boolean;
  quantity?: number; // Number of units available
  rooms: number; // Number of rooms
  baths: number; // Number of bathrooms
  deposit?: number;
  fees: Fee[]; // List of fees associated with the unit
  incentives: string[]; // List of incentives (e.g., "First month free", "$20 off deposit")
  size?: string; // Size of the unit in square feet (optional)
  amenities: string[]; // List of amenities available
  isAvailable: boolean;
  moveInDate: string | null;
  leaseTerms: string[];
  images: string[]; // Array of media URLs for the unit
  tenantIds?: string[]; // IDs of tenants occupying this unit (if applicable)
  floorPlan?: string; // URL for the floor plan (optional)
  description?: string; // Optional description of the unit
};

// Rent Details
export type RentDetails = {
  price: number; // Monthly rent price
  perRoom?: boolean; // Indicates if the rent is per room (relevant for shared housing)
  deposit?: number; // Security deposit amount (optional)
  incentives?: string[]; // List of incentives (e.g., "First month free", "$20 off deposit")
};

// Availability Details
export type Availability = {
  isAvailable: boolean; // Indicates if the unit is currently available
  moveInDate: string | null; // Earliest move-in date (nullable)
  leaseTerms: string[]; // Available lease terms (e.g., "Short-term", "Long-term", "Month-to-month")
};
