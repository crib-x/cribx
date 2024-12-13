import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  title: string
  description?: string
  backButton?: boolean
  backUrl?: string
}

export default function DashboardHeader({
  title,
  description,
  backButton = true,
  backUrl = "/dashboard"
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        {backButton && (
          <Link href={backUrl}>
            <Button variant="ghost" size="sm" className="mb-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}