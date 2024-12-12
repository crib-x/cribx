"use client"

import { motion } from 'framer-motion'
import { Trophy, Star, Award, Crown } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

const rewards = [
  {
    icon: Star,
    title: "Housing Helper",
    description: "Help 5 students find housing",
    progress: 60,
    color: "text-yellow-500"
  },
  {
    icon: Award,
    title: "Community Champion",
    description: "Create 10 discussion topics",
    progress: 40,
    color: "text-purple-500"
  },
  {
    icon: Crown,
    title: "Event Enthusiast",
    description: "Attend 3 community events",
    progress: 80,
    color: "text-blue-500"
  }
]

export default function RewardsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Community Rewards
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Earn badges and rewards for being an active community member
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rewards.map((reward, index) => {
            const Icon = reward.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-full bg-gray-100 w-fit mb-4 ${reward.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
                <p className="text-gray-600 mb-4">{reward.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{reward.progress}%</span>
                  </div>
                  <Progress value={reward.progress} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}