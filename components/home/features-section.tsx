"use client"

import { motion } from 'framer-motion'
import { Users, Home, ShoppingBag, Users2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Home,
    title: "Student Housing",
    description: "Find the perfect student accommodation near your campus. Browse through verified listings with detailed information and photos.",
    link: "/properties",
    color: "text-blue-500"
  },
  {
    icon: Users,
    title: "Roommate Finder",
    description: "Connect with compatible roommates based on lifestyle, preferences, and personality. Find your perfect match today.",
    link: "/roommates",
    color: "text-green-500"
  },
  {
    icon: ShoppingBag,
    title: "Sublease Marketplace",
    description: "Looking to sublease or take over a lease? Browse available subleases or list your own property.",
    link: "/sublease",
    color: "text-purple-500"
  },
  {
    icon: Users2,
    title: "Student Community",
    description: "Join our vibrant student community. Share experiences, get advice, and make connections with fellow students.",
    link: "/community",
    color: "text-orange-500"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function FeaturesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            cribX provides all the tools and resources you need for your student housing journey
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-white hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm hover:shadow-md"
              >
                <div className={`p-3 rounded-full bg-gray-100 mb-4 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link href={feature.link}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}