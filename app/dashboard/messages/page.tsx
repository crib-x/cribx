// page.tsx
import { DataTable } from '@/components/dashboard/lease-request/data-table'
import { columns } from '@/components/dashboard/lease-request/messages'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllMessages } from '@/app/actions/messages'
export default async function LeaseRequestPage() {
  const messages = await getAllMessages()
  console.log(messages)
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Recent Messages</h1>
          <p className="text-gray-500">
            View and manage messages from clients
          </p>
        </div>
      </div>
      
  
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>
            View and manage messages from clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={messages|| []} />
        </CardContent>
      </Card>
    </div>
  )
}