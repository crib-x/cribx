import { PropertyUnit } from "./unit";

export type Property = {
  title: string;
  id: string
  address: string;
  description: string;
  contact_phone: string;
  contact_email: string;
  externalListingUrl: string;
  contact_name: string;
  price: PriceRange;
  featuredImage: string; // URL to the main image
  specs: PropertySpec; // Key property specifications
  parking: Parking; // Parking details
  incentives: Incentive; // Incentives for renting
  // fees: Fee[]; // Additional fees for renting
  fees: any; // Additional fees for renting
  pet: PetPolicy; // Pet policies and restrictions
  // charges: Charges[]; // Charges like water, gas, etc.
  charges: any; // Charges like water, gas, etc.
  amenities: string[]; // List of amenities
  units: PropertyUnit[]; // Associated units for the property
  floorPlan: string[]; // Floor plan images
  communityFeatures: string[]; // list of Community-wide features
  videos: Video[]; // Media URLs for videos
  contact: AgentContact; // Agent or owner contact details
  logo?: string; // Optional logo URL
  location?: PropertyLocation,
  incentiveList?: IncentiveList[],  
  unitMedia: string[]; // Interior images or videos
  type: any 
  images: string[]; // Array of image URLs
};

// Supporting Types

export type Parking = {
  type: string; // e.g., "Garage", "Street Parking"
  spaces: number; // Number of parking spaces available
  cost?: number; // Optional cost per space
};

export type Incentive = {
  discount : {
    amount: number,
    title: string
  }; 
  
};

export type IncentiveList = 
  {
    propertyType? : string,
    title: string
    note?: string
  }


export type PropertyLocation =  {
lat: number
lng:number,
nearby?: {
  schools: string[]
  dining: string[]
  transportation: string[]
}
}

export type Fee = {
  title: string; // e.g., "Application Fee"
  amount: number; // Fee amount in dollars
  description: string; // Fee description
  id: string
  property_id: string
};

export type PetPolicy = {
  allowed: boolean; // If pets are allowed
  typesAllowed: string[]; // e.g., ["Dogs", "Cats"]
  monthlyRent: number; // Monthly rent for pets
  oneTimeFee: number; // One-time fee for pets
  countLimit: number; // Maximum number of pets allowed
  weightLimit: string; // Weight limit for pets (e.g., "50lbs")
};

export type Charges = {
 type: string, amount: number, description: string, property_id: string, id: string
};

export type Charge = {
  title: string; // e.g., "Water Charge"
  amount: number; // Charge amount in dollars
};

export type FloorPlan = {
  id: string; // Unique identifier for the floor plan
  title: string; // e.g., "2-Bedroom Plan"
  imageUrl: string; // URL to the floor plan image
};

export type Video = {
  id: string; // Unique identifier for the video
  title: string; // e.g., "Virtual Tour"
  url: string; // Video URL
};

export type AgentContact = {
  name: string; // Name of the contact person
  phone?: string; // Optional phone number
  email?: string; // Optional email address
};

export type PropertySpec = {
  beds: number; // Number of bedrooms
  baths: number; // Number of bathrooms
  sqft: number; // Square footage
};

export type PriceRange = {
  min: number; // Minimum price
  max: number; // Maximum price
};
