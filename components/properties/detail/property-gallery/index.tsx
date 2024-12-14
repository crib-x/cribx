"use client"

import { useState, useMemo } from 'react'
import { PropertyGalleryProps, MediaItem } from './types'
import MediaTabs from './media-tabs'
import MediaGrid from './media-grid'

export default function PropertyGallery({ images, floorPlans = [], videos = [] }: PropertyGalleryProps) {
  const [activeTab, setActiveTab] = useState('photos')

  const mediaItems = useMemo(() => {
    switch (activeTab) {
      case 'photos':
        return images.map(url => ({ type: 'image', url }));
      case 'floorPlans':
        return floorPlans.map(plan => ({ 
          type: 'floorPlan',
          url: plan.imageUrl,
          title: plan.title
        }));
      case 'videos':
        return videos.map(video => ({
          type: 'video',
          url: video.url,
          title: video.title
        }));
      default:
        return [];
    }
  }, [activeTab, images, floorPlans, videos]) as MediaItem[]

  const tabs = [
    { id: 'photos', label: 'Photos', count: images.length },
    { id: 'floorPlans', label: 'Floor Plans', count: floorPlans.length },
    { id: 'videos', label: 'Videos', count: videos.length },
  ].filter(tab => tab.count > 0)

  return (
    <div className="space-y-6">
      <MediaTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <MediaGrid items={mediaItems} />
      </div>
    </div>
  )
}