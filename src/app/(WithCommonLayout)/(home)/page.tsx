import ClientHomePage from "./ClientHomePage";
import { getCurrentUser } from "@/services/AuthService";
import RentTips from "@/components/modules/home/Tips";
import FeaturedSection from "@/components/modules/home/FeaturedSection";
import TestimonialSection from "@/components/modules/home/Testimonials";
import HowItWorksSection from "@/components/modules/home/HowItWorks";
import WhyChooseUsSection from "@/components/modules/home/WhyChooseUsSection";
import ListingSection from "@/components/modules/home/CardSection";

const HomePage = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <ClientHomePage user={user} />
      <FeaturedSection />
      <ListingSection />
      <HowItWorksSection />
      <RentTips />
      <WhyChooseUsSection />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
