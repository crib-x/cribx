"use client"

import MarketplaceCard from './marketplace-card'

const SAMPLE_ITEMS = [
  {
    title: "Study Desk with Chair",
    price: 120,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
    condition: "Like New",
    category: "Furniture",
    seller: "Alex S.",
    description: "Perfect condition desk and chair set, great for studying. Moving out and must sell."
  },
  {
    title: "Mini Refrigerator",
    price: 80,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
    condition: "Good",
    category: "Appliances",
    seller: "Sarah M.",
    description: "Compact fridge, perfect for dorm rooms. Works great, selling due to upgrade."
  },
  {
    title: "Textbook Bundle",
    price: 150,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
    condition: "Used",
    category: "Books",
    seller: "Mike R.",
    description: "Business major textbooks for first and second year courses. All in good condition."
  }
]

export default function MarketplaceGrid() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Student Marketplace
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_ITEMS.map((item, index) => (
          <MarketplaceCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}