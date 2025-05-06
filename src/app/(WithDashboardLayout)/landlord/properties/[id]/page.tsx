// import PropertyDetailPage from "@/components/modules/properties/property-details";
import PropertyDetailPage from "@/components/modules/properties/property-details";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  console.log("inside", param);
  return (
    <div>
      <PropertyDetailPage params={param} />
    </div>
  );
};

export default page;
