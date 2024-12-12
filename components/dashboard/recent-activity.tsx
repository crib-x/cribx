"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MessageSquare, Key, DollarSign } from 'lucide-react'

const activities = [
  {
    type: 'message',
    title: 'New Message',
    description: 'Sarah inquired about Unit 101',
    time: '5 minutes ago',
    icon: MessageSquare,
  },
  {
    type: 'lease',
    title: 'Lease Signed',
    description: 'Unit 204 lease completed',
    time: '2 hours ago',
    icon: Key,
  },
  {
    type: 'payment',
    title: 'Payment Received',
    description: 'Rent payment for Unit 305',
    time: '4 hours ago',
    icon: DollarSign,
  },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div
                key={index}
                className="flex items-start space-x-4 border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}