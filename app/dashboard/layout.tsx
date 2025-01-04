"use client"

import { useAuthStore } from '@/lib/store/auth-store'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import { useRequireAuth } from '@/lib/auth/auth-hooks'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = useRequireAuth()
  const { user } = useAuthStore()

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <div className="fixed inset-y-0">
          <DashboardSidebar />
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 ml-64 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}