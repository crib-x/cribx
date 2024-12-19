"use client"

import SubleaseHero from '@/components/sublease/sublease-hero'
import SubleaseGrid from '@/components/sublease/sublease-grid'
import MarketplaceGrid from '@/components/sublease/marketplace-grid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubleasePage() {
  return (
    <div className="pt-16">
      <SubleaseHero />
      <Tabs defaultValue="subleases" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="subleases">Subleases</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        <TabsContent value="subleases">
      <>
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Under Development</h1>
          <p className="text-lg">This feature is currently under development. Please check back later.</p>

        </div>
      </div>

      </>
    
        </TabsContent>
        <TabsContent value="marketplace">
 
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Under Development</h1>
          <p className="text-lg">This feature is currently under development. Please check back later.</p>

        </div>
      </div>

        </TabsContent>
      </Tabs>
    </div>
  )
}