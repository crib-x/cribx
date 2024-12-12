"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import DashboardStats from '@/components/dashboard/dashboard-stats'
import DashboardOverview from '@/components/dashboard/dashboard-overview'
import PropertyTable from '@/components/dashboard/property-table'
import QuickActions from '@/components/dashboard/quick-actions'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'manager') {
      router.push('/auth/signin')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'manager') {
    return null
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
          <p className="text-gray-500">Here's what's happening with your properties today.</p>
        </div>
        <QuickActions />
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardOverview />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Insights</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Most Popular Area</p>
                <p className="text-lg font-bold text-blue-600">University District</p>
              </div>
              <div className="text-2xl font-bold text-blue-600">45%</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Average Occupancy</p>
                <p className="text-lg font-bold text-green-600">92%</p>
              </div>
              <div className="text-2xl font-bold text-green-600">↑ 5%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Property Overview</h2>
        <PropertyTable />
      </div>
    </motion.div>
  )
}