// import HomeSlider from "@/components/modules/home/HomeSlider";
import ClientHomePage from "./ClientHomePage";
import { getCurrentUser } from "@/services/AuthService";
import RentTips from "@/components/modules/home/Tips";
// import StandOutSection from "@/components/modules/home/StandOut";
import FeaturedSection from "@/components/modules/home/FeaturedSection";
import NewsletterSection from "@/components/modules/home/Newsletter";

// import HomeSlider from "@/components/modules/home/HomeSlider";

const HomePage = async () => {
  const user = await getCurrentUser(); // server-side auth check
  return (
    <div>
      <ClientHomePage user={user} />
      <FeaturedSection /> 
      {/* <HomeSlider />  */}
      <RentTips />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
