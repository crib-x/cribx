import DashboardStats from "@/components/dashboard/dashboard-stats";
import QuickActions from "@/components/dashboard/quick-actions";
import { getProperties } from "../actions/properties";
import { Property } from "@/lib/types/property";
import PropertyManagementTable from "@/components/dashboard/properties/property-management-table";
import { useSupabaseAuth } from "@/lib/auth/auth-server";
export default async function DashboardPage() {
  const { data } = await useSupabaseAuth();
  const properties: Property[] = await getProperties();
 
  const dashboardStats = {
    properties:{ 
    count: properties?.length,
    total: properties?.reduce((acc, property) => {
      return acc + property?.units?.length;
    }, 0)},
    oc: properties?.reduce((acc, property) => {
      return (
        acc +
        property?.units?.filter((unit) => unit?.status === "occupied")?.length
      );
    }, 0),
    totalVacant: properties.reduce((acc, property) => {
      return (
        acc +
        property?.units?.filter((unit) => unit?.status === "vacant")?.length
      );
    }, 0),
  }

  console.dir(dashboardStats);
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {data?.user?.email}</h1>
          <p className="text-gray-500">
            Here's what's happening with your properties today.
          </p>
        </div>
        <QuickActions />
      </div>

      <DashboardStats dashboardStats={[]} />

      <div className="grid grid-cols-1  gap-8">
        {/* <DashboardOverview /> */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Insights</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Most Popular Area</p>
                <p className="text-lg font-bold text-blue-600">
                  University District
                </p>
              </div>
              <div className="text-2xl font-bold text-blue-600">45%</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Average Occupancy</p>
                <p className="text-lg font-bold text-green-600">92%</p>
              </div>
              <div className="text-2xl font-bold text-green-600">↑ 5%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Property Overview</h2>
        <PropertyManagementTable properties={properties} />
      </div>
    </div>
  );
}
