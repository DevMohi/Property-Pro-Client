import HeroSection from "@/components/modules/home/HeroSection";
import ClientHomePage from "./ClientHomePage";
import { getCurrentUser } from "@/services/AuthService";


const HomePage = async () => {
  const user = await getCurrentUser(); // server-side auth check
  return (
    <div>
      <ClientHomePage user={user} />
      <HeroSection />

    </div>
  );
};

export default HomePage;
