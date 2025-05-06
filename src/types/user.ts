export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  role: "tenant" | "landlord" | "admin";
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  iat?: number;
  exp?: number;
}
