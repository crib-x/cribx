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
          <SubleaseGrid />
        </TabsContent>
        <TabsContent value="marketplace">
          <MarketplaceGrid />
        </TabsContent>
      </Tabs>
    </div>
  )
}