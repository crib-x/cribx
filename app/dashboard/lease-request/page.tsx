// page.tsx
import { getAllLeaseRequests } from '@/app/actions/lease'
import { DataTable } from '@/components/dashboard/lease-request/data-table'
import { columns } from '@/components/dashboard/lease-request/columns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default async function LeaseRequestPage() {
  const leaseRequests = await getAllLeaseRequests()
  console.log(leaseRequests)

  // Calculate quick insights
  const pendingRequests = leaseRequests?.filter(req => req.status === 'pending').length
  const totalRequests = leaseRequests?.length
  const pickupRequests = leaseRequests?.filter(req => req.needs_pickup === 'true').length

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lease Requests</h1>
          <p className="text-gray-500">Manage and track lease requests from clients</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              All time requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pickup Requests</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 21l-3-3m-8.7-8.7L3 9" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pickupRequests}</div>
            <p className="text-xs text-muted-foreground">
              Need transportation
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Lease Requests</CardTitle>
          <CardDescription>
            Manage lease requests and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={leaseRequests|| []} />
        </CardContent>
      </Card>
    </div>
  )
}