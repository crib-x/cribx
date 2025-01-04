import PropertyManagementTable from '@/components/dashboard/properties/property-management-table'
import { getProperties } from '@/app/actions/properties'

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <div className="space-y-8">
      {/* <DashboardHeader
        title="Property Management"
        description="Manage your properties and units"
      /> */}

      {/* Property Table */}
      <PropertyManagementTable properties={properties} />
    </div>
  )
}
