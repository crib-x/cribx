"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MessageSquare, Phone } from 'lucide-react'

interface PropertyContactProps {
  property: {
    title: string
  }
}

export default function PropertyContact({ property }: PropertyContactProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Interested in this property?</h3>
            <p className="text-sm text-gray-500">
              Fill out the form below and we'll get back to you shortly
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Tour
            </Button>
            <Button variant="outline" className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" required />
            <Input type="email" placeholder="Email Address" required />
            <Input type="tel" placeholder="Phone Number" required />
            <Textarea 
              placeholder={`Hi, I am interested in ${property.title}. Please contact me with more information.`}
              className="min-h-[100px]"
              required
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              <MessageSquare className="mr-2 h-4 w-4" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}