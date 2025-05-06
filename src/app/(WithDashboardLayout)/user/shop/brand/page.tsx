import ManageBrand from "@/components/modules/shop/brand";
import { getAllBrands } from "@/services/Brand";
import React from "react";

const ProductBrandPage = async () => {
  const { data } = await getAllBrands();
  return (
    <div>
      <ManageBrand brands={data} />
    </div>
  );
};

export default ProductBrandPage;
