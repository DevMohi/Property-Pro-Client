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
import ListingCard from "./listing-card";

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
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [minBathrooms, setMinBathrooms] = useState("");
  const [maxBathrooms, setMaxBathrooms] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
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

    // Filter by bedrooms
    if (minBedrooms) {
      results = results.filter(
        (item) => parseInt(item.bedrooms) >= parseInt(minBedrooms)
      );
    }

    if (maxBedrooms) {
      results = results.filter(
        (item) => parseInt(item.bedrooms) <= parseInt(maxBedrooms)
      );
    }

    // Filter by bathrooms
    if (minBathrooms) {
      results = results.filter(
        (item) => parseInt(item.bathrooms) >= parseInt(minBathrooms)
      );
    }

    if (maxBathrooms) {
      results = results.filter(
        (item) => parseInt(item.bathrooms) <= parseInt(maxBathrooms)
      );
    }

    // Filter by area (sqft)
    if (minArea) {
      results = results.filter(
        (item) => parseInt(item.area) >= parseInt(minArea)
      );
    }

    if (maxArea) {
      results = results.filter(
        (item) => parseInt(item.area) <= parseInt(maxArea)
      );
    }

    // Sort by createdAt date
    results.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return results;
  }, [
    listings,
    searchQuery,
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    minBathrooms,
    maxBathrooms,
    minArea,
    maxArea,
    sortOrder,
  ]);

  return (
    <div className="flex flex-wrap gap-8 my-10">
      {/* Sidebar */}
      <div className="w-full max-w-xs space-y-4 sm:w-1/3 lg:w-1/4 bg-white border rounded-lg  p-4">
        <h2 className="text-xl font-bold text-gray-700">Search Filters</h2>

        <div>
          <Label htmlFor="search">Search by Location</Label>
          <Input
            id="search"
            className="mt-2"
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
              className="mt-2"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              className="mt-2"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Bedrooms</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              className="mt-2"
              placeholder="Min"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
            />
            <Input
              type="number"
              className="mt-2"
              placeholder="Max"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Bathrooms</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              className="mt-2"
              placeholder="Min"
              value={minBathrooms}
              onChange={(e) => setMinBathrooms(e.target.value)}
            />
            <Input
              type="number"
              className="mt-2"
              placeholder="Max"
              value={maxBathrooms}
              onChange={(e) => setMaxBathrooms(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Area (sqft)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              className="mt-2"
              placeholder="Min"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
            />
            <Input
              type="number"
              className="mt-2"
              placeholder="Max"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
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
            setMinBedrooms("");
            setMaxBedrooms("");
            setMinBathrooms("");
            setMaxBathrooms("");
            setMinArea("");
            setMaxArea("");
            setSortOrder("asc");
          }}
        >
          Clear All Filters
        </Button>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 rounded-lg">
        {filteredListings.map((listing) => (
          <div className="flex flex-col h-full" key={listing._id}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
}
