"use client"

import { motion } from 'framer-motion'
import { MessageSquare, ThumbsUp, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const discussions = [
  {
    id: 1,
    title: "Best Housing Deals Near Campus",
    author: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.1&auto=format&fit=crop&w=200&q=80",
    content: "Hey everyone! I'm looking for affordable housing options near the university. Any recommendations?",
    likes: 24,
    replies: 12,
    tags: ["Housing", "Deals"]
  },
  {
    id: 2,
    title: "Roommate Tips & Advice",
    author: "Mike R.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.1&auto=format&fit=crop&w=200&q=80",
    content: "What are some important things to discuss with potential roommates before moving in together?",
    likes: 18,
    replies: 8,
    tags: ["Roommates", "Advice"]
  }
]

export default function DiscussionBoard() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Discussion Board
            </h2>
            <p className="text-gray-600">
              Join the conversation with fellow students
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="mr-2 h-5 w-5" />
            New Discussion
          </Button>
        </motion.div>

        <div className="mb-8">
          <Input 
            type="search" 
            placeholder="Search discussions..." 
            className="max-w-md"
          />
        </div>

        <div className="space-y-6">
          {discussions.map((discussion, index) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={discussion.avatar}
                  alt={discussion.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{discussion.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">Posted by {discussion.author}</p>
                  <p className="text-gray-700 mb-4">{discussion.content}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {discussion.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {discussion.replies}
                    </Button>
                    <div className="flex gap-2">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}