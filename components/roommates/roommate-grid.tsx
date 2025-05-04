// roommate-grid.tsx
import RoommateCard, { RoommateCardProps } from "./roommate-card";

export default function RoommateGrid({
  roommates,
}: {
  roommates: RoommateCardProps[];
}) {
  if (roommates.length === 0) {
    return (
      <section className="py-16 bg-gray-50 text-center">
        <p className="text-lg text-gray-700">
          No matches found. Try updating your preferences.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Potential Roommates
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roommates.map((roommate, index) => (
            <RoommateCard key={index} {...roommate} />
          ))}
        </div>
      </div>
    </section>
  );
}
