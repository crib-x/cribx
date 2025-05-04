"use server";
import { PreferencesFormData } from "@/components/roommates/preferences-form";
import { getDataFromSupabase } from "@/hooks/database-actions"; // Import database action functions

// Define a type for the roommates data
export type RoommateMatch = {
  id: number;
  name: string;
  age: number; // Added age property
  occupation: string; // Added occupation property
  budget: number;
  location: string;
  gender: string;
  lifestyle: string;
  cleanliness: string;
  quietHours: string;
  smokingPreference: string;
  petPreference: string;
  shareItems: string;
  noisePreference: string;
  guestFrequency: string;
  moveInDate: string;
  stayDuration: string;
  interests: string[]; // Changed from string to string[] for array
  cookingHabits: string;
  cleaningHabits: string;
  contactMethod?: string; // Optional
  compatibility: number; // Added compatibility score
};

export async function matchRoommates(data: PreferencesFormData) {
  try {
    // Fetch matching roommates based on preferences data
    const matches = await getMatchesFromSupabase(data); // Custom Supabase query logic

    return matches || []; // Return an empty array if no matches found
  } catch (error) {
    console.error("Server Error:", error);
    throw error;
  }
}

// Function to simulate fetching matches from Supabase
async function getMatchesFromSupabase(
  data: PreferencesFormData
): Promise<RoommateMatch[]> {
  const {
    location,
    budget,
    gender,
    lifestyle,
    cleanliness,
    quietHours,
    smokingPreference,
    petPreference,
    shareItems,
    noisePreference,
    guestFrequency,
    moveInDate,
    stayDuration,
    interests,
    cookingHabits,
    cleaningHabits,
    contactMethod,
  } = data;

  // Fetch all roommates data from Supabase
  const matches = await getDataFromSupabase("roommates", true);

  // Handle the case where the result might be null
  if (!matches) {
    return []; // If `matches` is null, return an empty array
  }

  // Filter roommates based on the matching criteria, e.g., budget, location, etc.
  const filteredMatches = matches.filter((match: RoommateMatch) => {
    return (
      match.location === location &&
      match.budget <= budget &&
      match.gender === gender &&
      match.lifestyle === lifestyle &&
      match.cleanliness === cleanliness &&
      match.quietHours === quietHours &&
      match.smokingPreference === smokingPreference &&
      match.petPreference === petPreference &&
      match.shareItems === shareItems &&
      match.noisePreference === noisePreference &&
      match.guestFrequency === guestFrequency &&
      match.moveInDate === moveInDate &&
      match.stayDuration === stayDuration &&
      match.interests.some((interest) => interests.includes(interest)) && // Match based on common interests
      match.cookingHabits === cookingHabits &&
      match.cleaningHabits === cleaningHabits &&
      (contactMethod ? match.contactMethod === contactMethod : true) // Only filter by contactMethod if it's provided
    );
  });

  return filteredMatches.map((match: RoommateMatch) => ({
    id: match.id,
    name: match.name,
    age: match.age, // Added age
    occupation: match.occupation, // Added occupation
    budget: match.budget,
    location: match.location,
    gender: match.gender,
    lifestyle: match.lifestyle,
    cleanliness: match.cleanliness,
    quietHours: match.quietHours,
    smokingPreference: match.smokingPreference,
    petPreference: match.petPreference,
    shareItems: match.shareItems,
    noisePreference: match.noisePreference,
    guestFrequency: match.guestFrequency,
    moveInDate: match.moveInDate,
    stayDuration: match.stayDuration,
    interests: match.interests,
    cookingHabits: match.cookingHabits,
    cleaningHabits: match.cleaningHabits,
    contactMethod: match.contactMethod,
    compatibility: match.compatibility, // Added compatibility score
  }));
}
