import HomeSlider from "@/components/modules/home/HomeSlider";
import ClientHomePage from "./ClientHomePage";
import { getCurrentUser } from "@/services/AuthService";
// import HomeSlider from "@/components/modules/home/HomeSlider";

const HomePage = async () => {
  const user = await getCurrentUser(); // server-side auth check
  return (
    <div>
      <ClientHomePage user={user} />
      <HomeSlider />
    </div>
  );
};

export default HomePage;
