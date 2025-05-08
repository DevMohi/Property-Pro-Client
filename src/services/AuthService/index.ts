"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    const storeCookies = await cookies();
    if (result?.success) {
      storeCookies.set("accessToken", result.data.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
// export const loginUser = async (userData: FieldValues) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     //Setting access token in browser cookie
//     const result = await res.json();
//     const storeCookies = await cookies();
//     if (result?.success) {
//       storeCookies.set("accessToken", result.data.accessToken);
//     }
//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };

export const loginUser = async (userData: FieldValues) => {
  console.log("Inside login", userData);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    console.log(result);
    const storeCookies = await cookies();

    if (result?.success) {
      storeCookies.set("accessToken", result.data.accessToken);

      // ✅ Decode and return user info too
      const decodedUser = jwtDecode(result.data.accessToken);
      return {
        ...result,
        user: decodedUser,
      };
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const storeCookies = await cookies();
  const accessToken = storeCookies.get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const reCaptchaTokenVerification = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY!,
        response: token,
      }),
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
