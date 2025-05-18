import HomeSlider from "@/components/modules/home/HomeSlider";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <HomeSlider />
      <main className="min-auto  lg:min-h-screen w-[90%] mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
