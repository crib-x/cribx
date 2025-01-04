
// "use client"

import DashboardHeader from '@/components/dashboard/dashboard-header'
import UnitList from '@/components/dashboard/units/unit-list'
import { getPropertyById } from '@/app/actions/properties';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PropertyUnitsPage({ params }: PageProps) {
  const { id } = await params;
  const propertyId = id

  const property = await getPropertyById(propertyId)
  console.log(property)

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Property Not Found</h2>
        <p className="mt-2 text-gray-600">The property you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={`Units - ${property.title}`}
        description="Manage units for this property"
      />

      <UnitList
        propertyId={propertyId}
        units={property.units || []}
       
      />
    </div>
  )
}