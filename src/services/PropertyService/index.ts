"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getMyListings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/my-postings`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["PROPERTY"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleListing = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["PROPERTY"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// services/PropertyService.ts
export const updateListing = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json", // Sending JSON instead of FormData
        },
        body: data, // Pass the form data as JSON
      }
    );

    // Optionally revalidate the tag or perform any other actions
    revalidateTag("PROPERTY");

    return res.json(); // Return the updated listing data
  } catch (error: any) {
    console.error("Error updating listing:", error);
    return Error(error);
  }
};

export const deleteListing = async (id: string) => {
  console.log("New id", id);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/${id}`,
      {
        method: "DELETE", // Using DELETE method
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["PROPERTY"], // Optional: Revalidate the tag or trigger any caching actions
        },
      }
    );

    // if (!res.ok) {
    //   throw new Error("Failed to delete listing");
    // }

    return res.json(); // Return the response from the server
  } catch (error: any) {
    console.error("Error deleting listing:", error);
    return Error(error);
  }
};
