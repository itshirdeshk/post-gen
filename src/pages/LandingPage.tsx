import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { LandingNav } from "@/components/landing/LandingNav";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <LandingNav onGetStarted={onGetStarted} />
      
      {/* Add padding for fixed nav */}
      <div className="pt-16">
        <DashboardHero onCreateBrand={onGetStarted} hasBrand={false} />
        <TrustedBy />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection onGetStarted={onGetStarted} />
        <Footer />
      </div>
    </div>
  );
}
