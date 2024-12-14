export interface MediaItem {
  type: 'image' | 'floorPlan' | 'video';
  url: string;
  title?: string;
}

export interface PropertyGalleryProps {
  images: string[];
  floorPlans?: Array<{
    title: string;
    imageUrl: string;
  }>;
  videos?: Array<{
    title: string;
    url: string;
  }>;
}