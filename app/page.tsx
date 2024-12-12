import HeroSection from '@/components/home/hero-section'
import FeaturesSection from '@/components/home/features-section'
import ServicesSection from '@/components/home/services-section'
import PropertyGrid from '@/components/home/property-grid'
import PartnersSection from '@/components/home/partners-section'
import ContactAndFAQSection from '@/components/home/contact-and-faq-section'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <PropertyGrid />
      <PartnersSection />
      <ContactAndFAQSection />
    </div>
  )
}