export interface MediaItem {
  type: 'image' | 'floorPlan' | 'video';
  url: string;
  title?: string;
}

export interface PropertyGalleryProps {
  images: string[];
  floorPlans?: string[];
  videos?: Array<{
    title: string;
    url: string;
  }>;
  units: string[];
}