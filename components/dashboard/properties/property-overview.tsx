"use client"

import { Property } from '@/lib/types/property'
import { Card, CardContent } from '@/components/ui/card'
import { getPropertyMetrics, formatCurrency } from '@/lib/utils/property-utils'
import { Building, Users, DollarSign, Percent } from 'lucide-react'
import { motion } from 'framer-motion'

interface PropertyOverviewProps {
  property: Property
}

export default function PropertyOverview({ property }: PropertyOverviewProps) {
  const metrics = getPropertyMetrics(property)

  const stats = [
    {
      title: 'Total Units',
      value: metrics.totalUnits,
      icon: Building,
      description: `${metrics.availableUnits} available`,
      trend: '+2 this month',
      trendUp: true,
    },
    {
      title: 'Occupancy Rate',
      value: `${Math.round(metrics.occupancyRate)}%`,
      icon: Users,
      description: 'Current occupancy',
      trend: '+5% vs last month',
      trendUp: true,
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(metrics.monthlyRevenue),
      icon: DollarSign,
      description: 'Current month',
      trend: '+8% vs last month',
      trendUp: true,
    },
    {
      title: 'Average Rent',
      value: formatCurrency(metrics.monthlyRevenue / (metrics.totalUnits - metrics.availableUnits) || 0),
      icon: Percent,
      description: 'Per occupied unit',
      trend: '',
      trendUp: false,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    index === 0 ? 'bg-blue-100 text-blue-600' :
                    index === 1 ? 'bg-green-100 text-green-600' :
                    index === 2 ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {stat.trend && (
                    <div className={`text-sm font-medium ${
                      stat.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}