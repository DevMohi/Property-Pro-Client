"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListingCard from "../listing-card";

interface Listing {
  _id: string;
  title: string;
  location: string;
  rent: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  houseStatus: string;
  imageUrls?: string[];
  createdAt: string;
  amenities?: string[];
}

export default function AllProducts({ listings }: { listings: Listing[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredListings = useMemo(() => {
    let results = [...listings];

    // Filter by search
    if (searchQuery) {
      results = results.filter((item) =>
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      results = results.filter(
        (item) => parseFloat(item.rent) >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      results = results.filter(
        (item) => parseFloat(item.rent) <= parseFloat(maxPrice)
      );
    }

    // Sort
    results.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return results;
  }, [listings, searchQuery, minPrice, maxPrice, sortOrder]);

  return (
    <div className="flex gap-8 mt-10">
      {/* Sidebar */}
      <div className="w-full max-w-xs space-y-4">
        <div>
          <Label htmlFor="search">Search by Location</Label>
          <Input
            id="search"
            placeholder="Enter location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <Label>Rent Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Sort By</Label>
          <Select value={sortOrder} onValueChange={(val) => setSortOrder(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by created" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSearchQuery("");
            setMinPrice("");
            setMaxPrice("");
            setSortOrder("asc");
          }}
        >
          Clear All Filters
        </Button>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {filteredListings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
