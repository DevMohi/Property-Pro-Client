"use client";

import { IUser } from "@/types";

const ClientHomePage = ({ user }: { user: IUser | null }) => {
  console.log("Client user:", user); 
  return null; // or return your real component tree here
};

export default ClientHomePage;
