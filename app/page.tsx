import HeroSection from '@/components/home/hero-section'
import FeaturesSection from '@/components/home/features-section'
import ServicesSection from '@/components/home/services-section'
import PropertyGrid from '@/components/home/property-grid'
import PartnersSection from '@/components/home/partners-section'
import ContactAndFAQSection from '@/components/home/contact-and-faq-section'
import { CountdownTimer } from '@/components/countdown/countdown-timer'

export default function Home() {
  const targetDate = new Date('2024-12-23T08:00:00')
  if(new Date() < targetDate){
      return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      <CountdownTimer targetDate={targetDate} />
    </div>
  )
  }

  return (
    <div>
      <HeroSection />
      {/* <FeaturesSection /> */}
      <ServicesSection />
      <PropertyGrid />
      <PartnersSection />
      <ContactAndFAQSection />
    </div>
  )
}