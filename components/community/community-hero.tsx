"use client"

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Users, QrCode } from 'lucide-react'
import Image from 'next/image'

export default function CommunityHero() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join the CribX Community!
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Be part of a thriving network of college students. Connect, collaborate, and make the most of your campus life!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                <QrCode className="mr-2 h-5 w-5" />
                Scan QR Code
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80"
              alt="Student Community"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}