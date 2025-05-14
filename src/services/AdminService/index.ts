"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["USERS"],
      },
    });

    return res.json();
  } catch (error: any) {
    console.error("getAllRentalRequests error:", error);
    return Error(error);
  }
};
export const getAllRentalRequests = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/rental-requests`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["RENTAL"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    console.error("getAllRentalRequests error:", error);
    return Error(error);
  }
};
export const getAllOrders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/rental-transactions`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["ORDERS"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    console.error("getAllRentalRequests error:", error);
    return Error(error);
  }
};
export const deleteUsers = async (id: string) => {
  console.log(id, "inside delete");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
      method: "DELETE",
      // headers: {
      //   Authorization: (await cookies()).get("accessToken")!.value,
      // },
    });
    revalidateTag("USERS");
    return res.json();
  } catch (error: any) {
    console.error("deleting users error:", error);
    return Error(error);
  }
};
