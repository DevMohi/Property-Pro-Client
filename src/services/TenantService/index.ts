"use server";

import { cookies } from "next/headers";

// 1. Tenant: Get my rental requests
export const getMyRentalRequests = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-requests/my-requests`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["RENTAL_REQUESTS"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    console.error("getMyRentalRequests error:", error);
    return Error(error);
  }
};

// 2. Admin: Get all rental requests
export const getAllRentalRequests = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-requests`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["RENTAL_REQUESTS"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    console.error("getAllRentalRequests error:", error);
    return Error(error);
  }
};

// 3. Landlord: Get requests for properties they listed
export const getRequestsForLandlord = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-requests/my-listing-requests`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["RENTAL_REQUESTS"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    console.error("getRequestsForLandlord error:", error);
    return Error(error);
  }
};
