"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, SquareIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ListingCardProps {
  listing: {
    _id: string;
    title: string;
    location: string;
    rent: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    houseStatus: string;
    imageUrls?: string[];
  };
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <div className="rounded-lg border shadow-sm bg-white">
      <div className="relative w-full aspect-video overflow-hidden rounded-t-lg">
        {listing.houseStatus && (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 capitalize">
            {listing.houseStatus}
          </Badge>
        )}
        <Image
          src={listing.imageUrls?.[0] || "/placeholder.svg"}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-sm text-muted-foreground my-1">
          <span className="text-sm text-teal-600 font-medium hover:underline">
            Location:
          </span>
          {listing.location}
        </p>
        <div className="flex items-center justify-between text-sm mt-2 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            {listing.bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {listing.bathrooms}
          </div>
          <div className="flex items-center gap-1">
            <SquareIcon className="w-4 h-4" />
            {listing.area} sqft
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t px-4 py-3">
        <p className="text-md font-bold">${listing.rent}/month</p>
        <Link
          href={`/properties/${listing._id}`}
          className="text-sm text-teal-600 font-medium hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
