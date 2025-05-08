import AllProducts from "@/components/modules/tenant";
import ProductBanner from "@/components/modules/tenant/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllListings } from "@/services/PropertyService";

const AllProductsPage = async () => {
  //   const { data: categories } = await getAllCategories();
  const { data: listings } = await getAllListings();
  return (
    <NMContainer>
      <ProductBanner title="All Products" path="Home-Products" />
      <h2 className="text-xl font-bold mt-10 my-5">
        Your Next Favorite Home Awaits
      </h2>
      <h6>Showing approx 6 available listings for you</h6>
      <div className="grid grid-cols-6 gap-8 my-5"></div>
      <AllProducts listings={listings} />
    </NMContainer>
  );
};

export default AllProductsPage;
