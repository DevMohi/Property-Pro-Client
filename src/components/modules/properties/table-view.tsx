"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { deleteListing, getMyListings } from "@/services/PropertyService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PropertyTableProps {
  searchQuery?: string;
  filters?: {
    status: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    bathrooms: string;
  };
}

export default function PropertyTable({
  searchQuery = "",
  filters = {
    status: "",
    minPrice: 0,
    maxPrice: 5000,
    bedrooms: "",
    bathrooms: "",
  },
}: PropertyTableProps) {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const res = await getMyListings();
        setProperties(res?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteListing(id);

      if (res?.success) {
        toast.success(res.message || "Property deleted successfully");
        setProperties((prev) => prev.filter((property) => property._id !== id));
        setOpenDialogId(null);
      } else {
        toast.error(res?.message || "Failed to delete property");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
      console.error("Error deleting property:", error);
    }
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const price = parseFloat(property.rent);
      const bedrooms = parseInt(property.bedrooms);
      const bathrooms = parseInt(property.bathrooms);

      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.status &&
        property.houseStatus?.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }

      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }

      if (filters.bedrooms && bedrooms < Number(filters.bedrooms)) {
        return false;
      }

      if (filters.bathrooms && bathrooms < Number(filters.bathrooms)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters, properties]);

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="flex justify-center py-12 text-red-500">{error}</div>
    );
  if (filteredProperties.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">
          No properties found matching your criteria.
        </p>
      </div>
    );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProperties.map((property) => (
            <TableRow key={property._id}>
              <TableCell className="font-medium">
                <Link
                  href={`/landlord/properties/${property._id}`}
                  className="hover:underline"
                >
                  {property.title}
                </Link>
              </TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>${property.rent}/month</TableCell>
              <TableCell>
                <Badge
                  className={
                    property.houseStatus === "available"
                      ? "bg-green-500 hover:bg-green-600"
                      : property.houseStatus === "rented"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }
                >
                  {property.houseStatus ?? "Pending"}
                </Badge>
              </TableCell>
              <TableCell>
                {property.bedrooms} bed | {property.bathrooms} bath |{" "}
                {property.area} sqft
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/landlord/properties/${property._id}`}>
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/landlord/properties/${property._id}/edit`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setOpenDialogId(property._id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Modal inside map */}
                <Dialog
                  open={openDialogId === property._id}
                  onOpenChange={() => setOpenDialogId(null)}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                    </DialogHeader>
                    <p>
                      This action cannot be undone. This will permanently delete
                      the property.
                    </p>
                    <DialogFooter className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setOpenDialogId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(property._id)}
                      >
                        Confirm Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
