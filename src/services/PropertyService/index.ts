"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllListings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings`,
      {
        method: "GET",
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

export const getMyListingsRequests = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-requests/my-listing-requests`,
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

export const createListings = async ({
  propertiesData,
}: {
  propertiesData: FormData;
}): Promise<any> => {
  console.log("data in update", propertiesData);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings`,
      {
        method: "POST",
        body: propertiesData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PROPERTY");

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
  data: FormData;
}) => {
  try {
    console.log("Id in update", id);
    console.log("data in update", data);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
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

export const respondToListing = async ({
  requestId,
  data,
}: {
  requestId: string;
  data: { status: string };
}) => {
  try {
    console.log("Id in update", requestId);
    console.log("data in update", data);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/requests/${requestId}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

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
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PROPERTY");

    return res.json();
  } catch (error: any) {
    console.error("Error deleting listing:", error);
    return Error(error);
  }
};
