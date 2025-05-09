import EditPage from "@/components/modules/properties/edit-page";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  return (
    <div>
      <EditPage params={param} />
    </div>
  );
};

export default page;
