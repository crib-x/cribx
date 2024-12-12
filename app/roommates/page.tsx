"use client"

import RoommateHero from '@/components/roommates/roommate-hero'
import RoommateGrid from '@/components/roommates/roommate-grid'
import PreferencesForm from '@/components/roommates/preferences-form'
import { useState } from 'react'

export default function RoommatePage() {
  const [showPreferences, setShowPreferences] = useState(false)

  return (
    <div className="pt-16">
      <RoommateHero onGetStarted={() => setShowPreferences(true)} />
      {showPreferences ? (
        <PreferencesForm />
      ) : (
        <RoommateGrid />
      )}
    </div>
  )
}