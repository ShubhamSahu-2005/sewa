import { HeroSection } from "../components/hero-section"
import { FeaturesSection } from "../components/features-sections"
import { WhyChooseUs } from "../components/why-choose-us"
import  TopFundraisers  from "../components/top-fundraisers"
import { SuccessStories } from "../components/success-stories"

export default function Home() {
  return (
    <div className="space-y-8 pb-15">
      <HeroSection />
      <FeaturesSection />
      <WhyChooseUs />
      <TopFundraisers />
      <SuccessStories />
    </div>
  )
}