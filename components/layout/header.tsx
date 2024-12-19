"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, Home } from 'lucide-react'
import UserMenu from './user-menu'
import { useAuthStore } from '@/lib/store/auth-store'

const navItems = [
  { label: "Properties", href: "/properties" },
  { label: "Community", href: "/community" },
  { label: "Roommates", href: "/roommates" },
  { label: "Contact", href: "/contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" height={60} width={90} alt="cribX Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">cribX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-gray-600 hover:text-gray-900 ${
                  pathname === item.href ? 'text-blue-600 font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* {isAuthenticated && (
              <Link 
                href="/dashboard" 
                className={`text-gray-600 hover:text-gray-900 ${
                  pathname.startsWith('/dashboard') ? 'text-blue-600 font-medium' : ''
                }`}
              >
                Dashboard
              </Link>
            )} */}
            {/* <UserMenu /> */}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-gray-600 hover:text-gray-900 ${
                    pathname === item.href ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* {isAuthenticated ? (
                <Link href="/dashboard" className="w-full">
                  <Button variant="outline" className="w-full">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin" className="w-full">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                  </Link>
                </>
              )} */}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}