"use client"

import { Image as ImageIcon, Video } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{
    id: string;
    label: string;
    count: number;
  }>;
}

export default function MediaTabs({ activeTab, onTabChange, tabs }: MediaTabsProps) {
  return (
    <div className="sticky top-16 z-10 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center space-x-2 py-4 border-b-2 text-sm font-medium",
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.id === 'photos' && <ImageIcon className="h-4 w-4" />}
              {tab.id === 'floorPlans' && <ImageIcon className="h-4 w-4" />}
              {tab.id === 'videos' && <Video className="h-4 w-4" />}
              <span>{tab.label}</span>
              <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}