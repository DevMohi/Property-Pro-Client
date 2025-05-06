export interface TProperty {
  _id: string;
  title: string;
  location: string;
  imageUrls: string[];
  houseStatus: "available" | "rented" | string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  rent: string;
}
