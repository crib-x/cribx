"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Header from './header'
import Footer from './footer'
import { useAuthStore } from '@/lib/store/auth-store'
import { LoadingState } from '../ui/loading-state'

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const { checkSession, isLoading } = useAuthStore()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (isLoading) {
    return <LoadingState message="Loading..." />
  }

  return (
    <>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
    </>
  )
}