
import { Property } from "@/lib/types/property"

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Lexington Concord Apartments Macomb",
    address: "902 N Charles St, Macomb, IL 61455",
    description: `Lexington Concord Apartments can be your perfect home next to campus! Conveniently located to Western Illinois University and Spoon River College in Macomb, IL, we are also located on the "Go West" bus service.Enjoy our pool, 24-hour business/study center, and 24-hour fitness center! Pets welcome with permission`,
    price: { min: 800, max: 1200 },
    logo: '/lexi_logo.jpg',
    type: "Property",
    featuredImage: "/lexicon/property_photos/lexington_property1.jpg",
    specs: {
      beds: 2,
      baths: 2,
      sqft: 900
    },
    parking: {
      type: "Garage",
      spaces: 100,
      cost: 50
    },
    incentiveList: [
      {
        propertyType: 'All',
        title: "$20 off on Security Deposit through cribX",
        note: "Discount"
      }
    ],
    incentives: {
      discount: {
        amount: 20,
        title: '$20 off on Security Deposit through cribX'
      }
    },
    fees: [
      { title: "Application Fee", amount: 30 },
      { title: "Security Deposit", amount: 99 }
    ],
    pet: {
      allowed: true,
      typesAllowed: [" Dogs ", " Cats "],
      monthlyRent: 30,
      oneTimeFee: 0,
      countLimit: 2,
      weightLimit: "45 lbs"
    },
    charges: {
      water: [
        { title: "Water - 1BR", amount: 35 },
        { title: "Water - 1BR", amount: 50 },
        { title: "Water - 2BR", amount: 65 }
      ]
    },
    units: [
      // {
      //   id: "u1",
      //   propertyId: "1",
      //   type: "Apartment",
      //   name: "Unit 101",
      //   occupancy: 2,
      //   rent: {
      //     price: 900,
      //     deposit: 500,
      //     incentives: ["First Month Free"]
      //   },
      //   size: 900,
      //   amenities: ["In-Unit Laundry", "Balcony", "Updated Kitchen"],
      //   availability: {
      //     isAvailable: true,
      //     moveInDate: new Date("2024-06-01"),
      //     leaseTerms: ["12 months", "9 months"]
      //   },
      //   utilitiesIncluded: ["Water", "Trash"],
      //   images: ["/turnberry/Turnberry1.jpg", "/turnberry/Turnberry2.jpg"],
      //   floorPlan: "/turnberry/2bed-plan.jpg",
      //   description: "Spacious 2-bedroom apartment with modern finishes"
      // },
      // {
      //   id: "u2",
      //   propertyId: "1",
      //   type: "Apartment",
      //   name: "Unit 102",
      //   occupancy: 2,
      //   rent: {
      //     price: 950,
      //     deposit: 500,
      //     incentives: ["First Month Free"]
      //   },
      //   size: 900,
      //   amenities: ["In-Unit Laundry", "Corner Unit", "City View"],
      //   availability: {
      //     isAvailable: true,
      //     moveInDate: new Date("2024-05-15"),
      //     leaseTerms: ["12 months"]
      //   },
      //   utilitiesIncluded: ["Water", "Trash"],
      //   images: ["/turnberry/Turnberry2.jpg", "/turnberry/Turnberry3.jpg"],
      //   floorPlan: "/turnberry/2bed-plan.jpg",
      //   description: "Premium corner unit with city views"
      // }
    ],
    amenities: [
      "High Speed Internet Access",
      "Wi-Fi",
      "Washer/Dryer",
      "Air Conditioning",
      "Heating",
      "Ceiling Fans",
      "Smoke Free",
      "Cable Ready",
      "Security System",
      "Tub/Shower",
      "Intercom",
      "Sprinkler System",
      "Dishwasher",
      "Disposal",
      "Pantry",
      "Eat-in Kitchen",
      "Balcony",
      "Porch",
      "Deck",
      "Yard",
      "Kitchen",
      "Microwave",
      "Oven",
      "Range",
      "Refrigerator",
      "Freezer",
      "Instant Hot Water",
      "Carpet",
      "Tile Floors",
      "Vinyl Flooring",
      "Family Room",
      "Basement",
      "Recreation Room",
      "Vaulted Ceiling",
      "Views",
      "Walk-In Closets",
      "Linen Closet",
      "Double Pane Windows",
      "Window Coverings",
      "Lawn",
      "Private Entry",
      "Garage Parking",
      "Off-Street Parking",
      "Pet Friendly",
      "Community Pool",
      "On-Site Maintenance",
      "On-Site Management",
      "Fitness Center",
      "Clubhouse",
      "BBQ Grills",
      "Playground",
      "Business Center",
      "Game Room",
      "Media Center",
      "Recycling",
      "Package Service",
      "Controlled Access",
      "Wi-Fi at Pool",
      "Yoga Studio",
      "Bike Storage"
    ],
    floorPlan: [
      '/lexicon/floor_plans/Lexington_1bed.jpg',
      '/lexicon/floor_plans/Lexington_1bedExtend.jpg',
      '/lexicon/floor_plans/Lexington_1bedOffice.jpg',
      '/lexicon/floor_plans/Lexington_2B1.5B.jpg',
      '/lexicon/floor_plans/Lexington_2B2B.jpg',
      '/lexicon/floor_plans/Lexington_studio.jpg',
    ],



    unitMedia: [
      '/lexicon/unit_photos/unit_photo1.jpg',
      '/lexicon/unit_photos/unit_photo2.jpg',
      '/lexicon/unit_photos/unit_photo3.jpg',
      '/lexicon/unit_photos/unit_photo5.jpg',
      '/lexicon/unit_photos/unit_photo6.jpg',
      '/lexicon/unit_photos/unit_photo7.jpg',
      '/lexicon/unit_photos/unit_photo8.jpg',
      '/lexicon/unit_photos/unit_photo9.jpg',
      '/lexicon/unit_photos/unit_photo10.jpg',
      '/lexicon/unit_photos/unit_photo11.jpg',

    ],
    communityFeatures: [
      "Wi-Fi",
      "Laundry Facilities",
      "Maintenance on site",
      "24 Hour Access",
      "Shuttle to Train",
      "Online Services",
      "Pet Play Area",
      "Business Center",
      "Walk-Up",
      "$3 million in recent renovations",
      "Courtyard",
      "Outdoor Grilling station",
      "Picnic Area",
      "Fitness Center",
      "Pool",
      "Bicycle Storage",
      "Volleyball Court",
      "Shuttle To Campus",
      "Walk To Campus",
      "Individual Leases Available"
    ],
    videos: [
      {
        id: "v1",
        title: "Property Tour",
        url: "https://example.com/tour.mp4"
      }
    ],
    contact: {
      name: "Lexington Concord Apartments",
      email: "hayley@lakeshoremgmt.com",
      phone: "(309)837-3377"
    },
    images: [
      "/lexicon/property_photos/lexington_property1.jpg",
      "/lexicon/property_photos/lexington_property2.jpg",
      "/lexicon/property_photos/lexington_property3.jpg",
      "/lexicon/property_photos/lexington_property4.jpg",
      "/lexicon/property_photos/lexington_property5.jpg",
      "/lexicon/property_photos/lexington_property6.jpg",
      "/lexicon/property_photos/lexington_property7.jpg",
      "/lexicon/property_photos/lexington_property8.jpg",
      "/lexicon/property_photos/lexington_property9.jpg",
      "/lexicon/property_photos/lexington_property10.jpg"
    ]
  },
  {
    id: 2,
    title: "Turnberry Village",
    address: "201 Wigwam Hollow Road, Macomb, IL",
    description: `Voted by WIU students and the community as the “Best Apartment Complex to Live” for 2016 and 2017, Turnberry Village in Macomb offers you a comfortable and welcoming place to call home. We offer apartments that include 1 to 4 bedrooms and have been designed with convenient features such as a full-size washer and dryer, energy-efficient electric heat and central air conditioning, and a kitchen complete with a dishwasher, refrigerator, range/oven, and garbage disposal.
Not only have the apartments themselves been designed to offer convenience and comfort, but the community has been built to serve the needs of our residents. Enjoy our fitness center, swimming pool, on-the-go snack room, and bark park.
We have built our apartment complex to exceed the expectations of our residents. Our dedication to customer service, including 24-hour emergency maintenance service, has strengthened our community and allowed us to serve the people of Macomb. We look forward to learning more about how we can help you.
Turnberry Village III is an apartment community located in McDonough County and the 61455 ZIP Code. This area is served by the Macomb Community Unit School District 185 attendance zone.`,
    price: { min: 800, max: 1200 },
    logo: '/turn_logo.jpeg',

    featuredImage:  "/turnberry/Turnberry8.jpg",
    specs: {
      beds: 2,
      baths: 2,
      sqft: 900
    },
    parking: {
      type: "Garage",
      spaces: 100,
      cost: 50
    },
    incentives: {
      discount: {
        amount: 50,
        title: '$20 off on Security Deposit through cribX'
      }
    },
    
    
    fees: [
      { title: "Application Fee", amount: 30 },
      { title: "Security Deposit", amount: 500 }
    ],
    type: "Property",
    pet: {
      allowed: true,
      typesAllowed: [" Dogs ", " Cats "],
      monthlyRent: 20,
      oneTimeFee: 300,
      countLimit: 2,
      weightLimit: "45 lbs"
    },
    charges: {
      water: [
        { title: "Water - 1BR", amount: 30 },
        { title: "Water - 2BR", amount: 40 },
        { title: "Water - 3BR", amount: 60 },
        { title: "Water - 4BR", amount: 80 }
      ]
    },
    units: [],
    amenities: [
      "High Speed Internet Access",
      "Wi-Fi",
      "Washer/Dryer",
      "Air Conditioning",
      "Heating",
      "Ceiling Fans",
      "Smoke Free",
      "Cable Ready",
      "Security System",
      "Tub/Shower",
      "Intercom",
      "Sprinkler System",
      "Dishwasher",
      "Disposal",
      "Pantry",
      "Eat-in Kitchen",
      "Balcony",
      "Porch",
      "Deck",
      "Yard",
      "Kitchen",
      "Microwave",
      "Oven",
      "Range",
      "Refrigerator",
      "Freezer",
      "Instant Hot Water",
      "Carpet",
      "Tile Floors",
      "Vinyl Flooring",
      "Family Room",
      "Basement",
      "Recreation Room",
      "Vaulted Ceiling",
      "Walk-In Closets",
      "Lawn"
    ],
    incentiveList: [
      {
        title: "2 bedroom - $20 discount",
      },
      {
        title: "3 bedroom - $30 discount",
      },
      {
        title: "4 bedroom - $40 discount",
      }
    ],
    floorPlan: [],
    unitMedia: [],
    communityFeatures: [
      "Wi-Fi",
      "Laundry Facilities",
      "Maintenance on site",
      "24 Hour Access",
      "Shuttle to Train",
      "Online Services",
      "Pet Play Area",
      "Business Center",
      "Courtyard",
      "Outdoor Grilling station",
      "Picnic Area",
      "Fitness Center",
      "Pool",
      "Bicycle Storage",
      "Shuttle To Campus",
      "Individual Leases Available"
    ],
    videos: [
      {
        id: "v1",
        title: "Property Tour",
        url: "https://example.com/tour.mp4"
      }
    ],
    contact: {
      name: "Turnberry Apartments",
      email: "turnberrymacomb2@aol.com",
      phone: "309-836-3536"
    },
    images: [
      "/turnberry/Turnberry1.jpg",
      "/turnberry/Turnberry2.jpg",
      "/turnberry/Turnberry3.jpg",
      "/turnberry/Turnberry4.jpg",
      "/turnberry/Turnberry5.jpg",
      "/turnberry/Turnberry6.jpg",
      "/turnberry/Turnberry7.jpg",
      "/turnberry/Turnberry8.jpg"
    ]
  },
]
