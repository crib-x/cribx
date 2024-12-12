"use client"

import CommunityHero from '@/components/community/community-hero'
import CommunityFeatures from '@/components/community/community-features'
import DiscussionBoard from '@/components/community/discussion-board'
import EventsSection from '@/components/community/events-section'
import RewardsSection from '@/components/community/rewards-section'

export default function CommunityPage() {
  return (
    <div className="pt-16">
      <CommunityHero />
      <CommunityFeatures />
      <DiscussionBoard />
      <EventsSection />
      <RewardsSection />
    </div>
  )
}