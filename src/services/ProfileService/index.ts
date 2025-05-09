"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getSingleUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["USER"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProfile = async ({ payload }: { payload: any }) => {
  try {
    console.log("Inside update", payload);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${payload?.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("USER");

    return res.json(); // Return the updated listing data
  } catch (error: any) {
    console.error("Error updating listing:", error);
    return Error(error);
  }
};

export const changePassword = async ({ data }: { data: any }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("USER");

    return res.json(); // Return the updated listing data
  } catch (error: any) {
    console.error("Error updating listing:", error);
    return Error(error);
  }
};
