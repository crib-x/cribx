"use client"

import { Button } from "@/components/ui/button"
import { Plus, Bell, Grid } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

export default function QuickActions() {
  return (
    <div className="flex items-center gap-2">
      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <DropdownMenuItem>
            <div className="flex flex-col">
              <span className="font-medium">New Message</span>
              <span className="text-sm text-gray-500">From John about Unit 101</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col">
              <span className="font-medium">Maintenance Request</span>
              <span className="text-sm text-gray-500">Unit 204 reported AC issues</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Quick Add Buttons */}
      <Link href="/dashboard/properties">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </Link>
      
      <Link href="/dashboard/units">
        <Button variant="outline">
          <Grid className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </Link>
    </div>
  )
}