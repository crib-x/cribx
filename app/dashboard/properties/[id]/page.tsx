
import DashboardHeader from '@/components/dashboard/dashboard-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyOverview from '@/components/dashboard/properties/property-overview'
import UnitList from '@/components/dashboard/units/unit-list'
import { getPropertyById } from '@/app/actions/properties';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PropertyDetailPage({ params }: PageProps) {

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
        title={property.title}
        description={property.address}
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <PropertyOverview property={property} />
        </TabsContent>

        <TabsContent value="units" className="mt-6">
          <UnitList
            propertyId={propertyId}
            units={property || []}
  
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
        </TabsContent>
      </Tabs>
    </div>
  )
}