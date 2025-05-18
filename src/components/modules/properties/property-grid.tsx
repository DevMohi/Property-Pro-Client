"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getMyListings } from "@/services/PropertyService";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TablePagination from "@/components/ui/core/NMTable/TablePaginationDynamic";
import { Bed, Bath, SquareIcon as SquareFeet } from "lucide-react";

interface PropertyGridProps {
  searchQuery?: string;
  filters?: {
    status: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    bathrooms: string;
  };
}

const PropertyGrid = ({
  searchQuery = "",
  filters = {
    status: "",
    minPrice: 0,
    maxPrice: 5000,
    bedrooms: "",
    bathrooms: "",
  },
}: PropertyGridProps) => {
  const { setIsLoading } = useUser();
  const params = useSearchParams();
  const pageParam = params.get("page") ?? "1";
  const limitParam = params.get("limit") ?? "4";

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getMyListings(pageParam, limitParam);
        setProperties(res.data || []);
        setTotalPage(res.meta.totalPage);
      } catch (err: any) {
        console.error("Error loading properties", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    })();
  }, [pageParam, limitParam, setIsLoading]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const rent = parseFloat(property.rent);
      const beds = parseInt(property.bedrooms);
      const baths = parseFloat(property.bathrooms);
      const status = property.houseStatus || "available";

      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      if (filters.status && status !== filters.status.toLowerCase()) {
        if (filters.status.toLowerCase() === "any") return true;
        return false;
      }
      if (rent < filters.minPrice || rent > filters.maxPrice) return false;
      if (filters.bedrooms && beds < parseInt(filters.bedrooms)) return false;
      if (filters.bathrooms && baths < parseInt(filters.bathrooms))
        return false;

      return true;
    });
  }, [properties, searchQuery, filters]);

  if (loading) {
    return <p className="text-center py-12">Loading properties…</p>;
  }
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }
  if (!properties.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">No properties available</p>
      </div>
    );
  }
  if (filteredProperties.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">
          No properties match your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProperties.map((property) => (
          <Card key={property._id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Badge
                className={`absolute right-2 top-2 z-10 ${
                  property.houseStatus === "available"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {property.houseStatus ?? "available"}
              </Badge>
              <Image
                src={property.imageUrls?.[0] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-sm text-muted-foreground">
                {property.location}
              </p>
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <SquareFeet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.area} sqft</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <p className="font-bold">${property.rent}/month</p>
              <Link
                href={`/landlord/properties/${property._id}`}
                className="text-sm font-medium text-teal-600 hover:underline"
              >
                View Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end text-sm text-gray-500">
        <TablePagination totalPage={totalPage} />
      </div>
    </>
  );
};

export default PropertyGrid;
