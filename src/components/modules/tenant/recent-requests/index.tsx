"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, SquareIcon as SquareFeet } from "lucide-react";

export default function PropertyRequests({
  limit,
  properties = [],
}: {
  limit?: number;
  properties?: any[];
}) {
  // Sort properties by createdAt in descending order (latest first)
  const sortedProperties = properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // If limit is provided, slice the properties to show only the top 'limit' items
  const propertiesToDisplay = limit
    ? sortedProperties.slice(0, limit)
    : sortedProperties;

  console.log("p", properties);

  return (
    <div className="space-y-4">
      {propertiesToDisplay.map((property) => (
        <Card key={property._id} className="overflow-hidden">
          <CardContent className="p-0">
            <Link
              href={`/listings/${property.rentalHouseId._id}`}
              className="flex flex-col md:flex-row"
            >
              <div className="relative h-48 w-full md:h-auto md:w-48">
                <Image
                  src={
                    property.rentalHouseId?.imageUrls[0] || "/placeholder.svg"
                  }
                  alt={property.rentalHouseId?.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {property.rentalHouseId?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {property.rentalHouseId?.location}
                    </p>
                  </div>
                  <Badge
                    className={
                      property?.houseStatus === "available"
                        ? "mt-2 md:mt-0 bg-green-500 hover:bg-green-600"
                        : property?.houseStatus === "Pending"
                        ? "mt-2 md:mt-0 bg-yellow-500 hover:bg-yellow-600"
                        : "mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600"
                    }
                  >
                    {property.rentalHouseId?.houseStatus}
                  </Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {property.rentalHouseId?.bedrooms} Beds
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {property.rentalHouseId?.bathrooms} Baths
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SquareFeet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {property.rentalHouseId?.area} sqft
                    </span>
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <p className="font-bold text-lg">
                    ${property.rentalHouseId?.rent}/month
                  </p>
                </div>
                <div className="pt-2">
                  <Badge
                    className={
                      property?.status === "Approved"
                        ? "mt-2 md:mt-0 bg-green-500 hover:bg-green-600"
                        : property?.status === "Pending"
                        ? "mt-2 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600"
                    }
                  >
                    Status : {property.status}
                  </Badge>
                  <Badge
                    className={
                      property?.status === "Approved"
                        ? "mt-2 md:mt-0 bg-green-500 hover:bg-green-600 ml-2"
                        : property?.status === "Pending"
                        ? "mt-2 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-black ml-2"
                        : "mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600 ml-2"
                    }
                  >
                    Payment Status : {property?.paymentStatus || "N/A"}
                  </Badge>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
