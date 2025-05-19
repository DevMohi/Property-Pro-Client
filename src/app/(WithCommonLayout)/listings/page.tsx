import AllProducts from "@/components/modules/tenant";
import ProductBanner from "@/components/modules/tenant/banner";
import { getAllListings } from "@/services/PropertyService";

const AllProductsPage = async () => {
  const { data: listings } = await getAllListings();
  return (
    <div className="container mx-auto">
      <ProductBanner title="All Products" path="Home-Products" />
      <h2 className="text-xl font-bold mt-10 my-5 text-center lg:text-start">
        Your Next Favorite Home Awaits
      </h2>
      <h6 className=" text-center lg:text-start">
        Showing approx 6 available listings for you
      </h6>

      <AllProducts listings={listings} />
    </div>
  );
};

export default AllProductsPage;
