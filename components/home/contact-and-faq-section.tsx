"use client"

import ContactSection from './contact-section'
import FAQSection from './faq-section'

export default function ContactAndFAQSection() {
  return (
    <>
      <section id="contact" className="py-24 bg-white">
        <ContactSection />
      </section>
      <section id="faq" className="py-24 bg-gray-50">
        <FAQSection />
      </section>
    </>
  )
}