// import PropertyDetailPage from "@/components/modules/properties/property-details";
// import PropertyDetailPage from "@/components/modules/properties/property-details";

import PropertyDetailPage from "@/components/modules/properties/property-details";



const Page = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  console.log("inside", param);


  return (
    <div>
      <h1>Hello</h1>
      <PropertyDetailPage params={param} /> 
    </div>
  );
};

export default Page;
