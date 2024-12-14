export interface LocationData {
  lat?: number;
  lng?: number;
  nearby?: {
    schools?: string[];
    dining?: string[];
    transportation?: string[];
  };
}

export interface PropertyLocationProps {
  location?: LocationData;
}

export interface NearbyPlacesProps {
  nearby?: {
    schools?: string[];
    dining?: string[];
    transportation?: string[];
  };
}

export interface MapProps {
  lat?: number;
  lng?: number;
}