"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Auth Form */}
      <main className="flex items-center justify-center p-8">
        {children}
      </main>

      {/* Right side - Decorative */}
      <div className="hidden md:block relative bg-blue-600">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-900/90 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <Image
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb"
          alt="Student Housing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-white p-12">
          <div className="max-w-md">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Find Your Perfect Student Home
            </motion.h2>
            <motion.p 
              className="text-lg text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Join thousands of students who have found their ideal housing and roommates through cribX.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}