"use client";

import PropertyCard from "./property-card";

const SAMPLE_PROPERTIES = [
  {
    title: "Lexington Concord Apartments Macomb",
    address: "902 N Charles St, Macomb, IL 61455",
    description: `Lexington Concord Apartments can be your perfect home next to campus! Conveniently located to Western Illinois University and Spoon River College in Macomb, IL, we are also located on the "Go West" bus service. Enjoy our pool, 24-hour business/study center, and 24-hour fitness center! Pets welcome with permission!`,
    price: { min: 500, max: 700 },
    featuredImage: "/lexington/lexington1.jpeg",
    specs: {
      beds: 2,
      baths: 1,
      sqft: 900,
    },
    parking: {},
    incentives: [{ title: "$20 off on Security Deposit through cribX" }],
    fees: [
      {
        title: "ASecurity Deposit",
        amount: 99,
      },
      {
        title: "Application Fees",
        amount: 30,
      },
    ],
    pet: {
      allowed: ["Cats", "Dogs"],
      monthlyRent: 25,
      onTimeFee: 0,
      countLimit: 2,
      weightLimit: "45 lb",
    },
    charges: {
      water: [
        {
          type: "1 BR",
          amount: 35,
        },
        {
          type: "2 BR",
          amount: 50,
        },
        {
          type: "3 BR",
          amount: 65,
        },
      ],
    },
    amenities: ["Pool", "Fitness Center", "Study Center"],
    units: [],
    floorPlan: [],
    communityFeatures: [
      "Wi-Fi",
      " Laundry Facilities",
      " Maintenance on site",
      "24 Hour Access",
      "Shuttle to Train",
      " Online Services",
      "Pet Play Area",
      " Business Center",
      "Walk-Up",
      " $3 million in recent renovations",
      " Courtyard",
      "Outdoor Grilling station",
      " Picnic Area",
      " Fitness Center",
      "Pool",
      " Bicycle Storage",
      "Volleyball Court",
      " Shuttle To Campus",
      " Walk To Campus",
      "Individual Leases Available"
    ],
    videos: [],
    contact: {
      name: "Lexington Concord Apartments",
      phone: "309-833-2024",
      email: "",
    },
    logo: "/logo/turnberry.png",
    images: [
      "turnberry/turnberry1.jpeg",
      "turnberry/turnberry2.jpeg",
      "turnberry/turnberry3.jpeg",
    ],
  },
  {
    title: "Turnberry Apartments Macomb",
    address: "456 College St",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
    beds: 1,
    baths: 1,
    amenities: ["Furnished", "Utilities Included"],
  },
];

export default function PropertyGrid() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium student accommodations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_PROPERTIES.map((property, index) => (
            <PropertyCard key={index} {...property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
