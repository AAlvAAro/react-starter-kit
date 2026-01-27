import { Head } from "@inertiajs/react"
import {
  Navbar,
  HeroSection,
  SocialProofBar,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  TestimonialsSection,
  CTASection,
  Footer,
} from "@/components/landing"

export default function Home() {
  return (
    <>
      <Head title="CatalogoPro - Your catalog, on autopilot" />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <SocialProofBar />
          <FeaturesSection />
          <HowItWorksSection />
          <PricingSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}