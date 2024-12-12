"use client"

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from "date-fns"

export default function PropertyFilters() {
  const [price, setPrice] = useState([500, 2000])
  const [date, setDate] = useState<Date>()

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range (${price[0]} - ${price[1]})</Label>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={price}
          onValueChange={setPrice}
        />
      </div>

      {/* Beds & Baths */}
      <div className="space-y-2">
        <Label>Bedrooms</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Bathrooms</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="1.5">1.5</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="2.5">2.5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <Label>Property Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="shared">Shared Housing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Move-in Date */}
      <div className="space-y-2">
        <Label>Move-in Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Apply Filters Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700">
        Apply Filters
      </Button>
    </div>
  )
}