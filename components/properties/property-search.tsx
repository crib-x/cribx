"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PropertySearch() {
  return (
    <div className="flex gap-2">
      <Input 
        type="text" 
        placeholder="Location, School, or Point of Interest"
        className="flex-grow"
      />
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}