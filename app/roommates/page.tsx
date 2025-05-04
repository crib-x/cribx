"use client"

import { useState, useTransition } from "react";
import { matchRoommates, RoommateMatch } from "../actions/rommates";
import PreferencesForm, {
  PreferencesFormData,
} from "@/components/roommates/preferences-form";
import RoommateHero from "@/components/roommates/roommate-hero";
import RoommateGrid from "@/components/roommates/roommate-grid";
import { RoommateCardProps } from "@/components/roommates/roommate-card";



export default function RoommatePage() {
  const [showPreferences, setShowPreferences] = useState(true);
  const [roommateMatches, setRoommateMatches] = useState<RoommateCardProps[]>(
    []
  );
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = (values: PreferencesFormData) => {
    startTransition(async () => {
      try {
        const matches: RoommateMatch[] = await matchRoommates(values);

        // Map the results to fit RoommateCardProps
        const transformedMatches: RoommateCardProps[] = matches.map(
          (match) => ({
            name: match.name, // Assuming match has a name property
            age: 25, // Add logic to determine age if available (use a default if not)
            occupation: "", // If occupation info is available in match, use it; else default to an empty string
            compatibility: 85, // You can use a scoring system or fetch the compatibility score if available
            image: "", // If image URL is available, use it. Otherwise, you could default to a placeholder image
            interests: match.interests, // No need to split if it's already an array

            budget: match.budget,
          })
        );

        setRoommateMatches(transformedMatches);
      } catch (error) {
        console.error("Error matching roommates:", error);
      }
    });
  };


  return (
    <div className="pt-16">
      <RoommateHero onGetStarted={() => setShowPreferences(true)} />

      {showPreferences ? (
        <PreferencesForm onSubmit={handleFormSubmit} />
      ) : (
        <RoommateGrid roommates={roommateMatches} />
      )}
    </div>
  );
}
