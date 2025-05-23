"use client";

import Image from "next/image";
import Link from "next/link"; 
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, SquareIcon as SquareFeet } from "lucide-react";

import { TProperty } from "@/types/property";

export default function PropertyList({
  limit,
  properties = [],
}: {
  limit?: number;
  properties?: TProperty[];
}) {

  // Sort properties by createdAt in descending order (latest first)
  const sortedProperties = properties.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // If limit is provided, slice the properties to show only the top 'limit' items
  const propertiesToDisplay = limit ? sortedProperties.slice(0, limit) : sortedProperties;

  return (
    <div className="space-y-4">
      {propertiesToDisplay.map((property) => (
        <Card key={property._id} className="overflow-hidden">
          <CardContent className="p-0">
            <Link
              href={`/landlord/properties/${property._id}`}
              className="flex flex-col md:flex-row"
            >
              <div className="relative h-48 w-full md:h-auto md:w-48">
                <Image
                  src={property.imageUrls[0] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {property.location}
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
                    {property.houseStatus}
                  </Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SquareFeet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.area} sqft</span>
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <p className="font-bold text-lg">${property.rent}/month</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
