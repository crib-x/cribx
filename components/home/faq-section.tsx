"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the platform work?",
    answer: "Our platform connects students with housing options, roommates, and community resources. You can browse listings, filter by preferences, and connect directly with property owners or potential roommates. We also offer a marketplace for essentials and community features for events and discussions."
  },
  {
    question: "Is the platform secure?",
    answer: "Yes, we take security seriously. All users must verify their accounts, and we implement strict data protection measures. We also provide secure messaging and reporting features to ensure a safe environment for all users."
  },
  {
    question: "How does the roommate matching process work?",
    answer: "Our roommate matching system uses a comprehensive questionnaire to assess lifestyle preferences, habits, and interests. We then use this information to suggest compatible matches, showing you a compatibility percentage for each potential roommate."
  },
  {
    question: "Can I select a specific roommate?",
    answer: "Yes, you have full control over your roommate selection. While we provide compatibility matches, you can browse all available profiles and connect with anyone you're interested in. You can message potential roommates directly through our platform."
  },
  {
    question: "How do I delete my account?",
    answer: "To delete your account, go to your account settings and select 'Delete Account'. You'll need to confirm your decision. Note that this action is permanent and will remove all your data from our platform."
  }
]

export default function FAQSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}