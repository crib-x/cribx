"use client"

import { motion } from 'framer-motion'
import { Building, Users, DollarSign, Percent, Home } from 'lucide-react'

const stats = [
  {
    name: "Total Properties",
    value: "12",
    icon: Building,
    description: "Active listings",
    trend: "+2 this month",
    trendUp: true,
  },
  {
    name: "Total Units",
    value: "48",
    icon: Home,
    description: "Across all properties",
    trend: "+5 this month",
    trendUp: true,
  },
  {
    name: "Monthly Revenue",
    value: "$24,500",
    icon: DollarSign,
    description: "Current month",
    trend: "+8% vs last month",
    trendUp: true,
  },
  {
    name: "Occupancy Rate",
    value: "92%",
    icon: Percent,
    description: "Units occupied",
    trend: "-2% vs last month",
    trendUp: false,
  },
]

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${
                index === 0 ? 'bg-blue-100 text-blue-600' :
                index === 1 ? 'bg-green-100 text-green-600' :
                index === 2 ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className={`text-sm font-medium ${
                stat.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}