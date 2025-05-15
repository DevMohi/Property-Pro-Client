// components/modules/tenant/AllProducts.tsx

"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import ListingCard from "./listing-card";
import TablePaginationStatic from "@/components/ui/core/NMTable/TablePaginationStatic";

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
  amenities?: string[];
  createdAt: string;
}

export default function AllProducts({ listings }: { listings: Listing[] }) {
  // ─── Filter & Sort State ────────────────────────────
  const [keyword, setKeyword] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [bedroomsMin, setBedroomsMin] = useState("");
  const [bedroomsMax, setBedroomsMax] = useState("");
  const [bathroomsMin, setBathroomsMin] = useState("");
  const [bathroomsMax, setBathroomsMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // ─── Pagination & UI State ─────────────────────────
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activePage, setActivePage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = useMemo(() => {
    // Make a copy of the original listings array to avoid mutating props
    let result = [...listings];

    const term = keyword.trim().toLowerCase();

    if (term) {
      result = result.filter((item) => {
        const title = item.title.toLowerCase();
        const location = item.location.toLowerCase();
        return title.includes(term) || location.includes(term);
      });
    }

    if (priceMin) {
      result = result.filter((item) => Number(item.rent) >= Number(priceMin));
    }

    if (priceMax) {
      result = result.filter((item) => Number(item.rent) <= Number(priceMax));
    }

    if (bedroomsMin) {
      result = result.filter(
        (item) => Number(item.bedrooms) >= Number(bedroomsMin)
      );
    }

    if (bedroomsMax) {
      result = result.filter(
        (item) => Number(item.bedrooms) <= Number(bedroomsMax)
      );
    }

    if (bathroomsMin) {
      result = result.filter(
        (item) => Number(item.bathrooms) >= Number(bathroomsMin)
      );
    }

    if (bathroomsMax) {
      result = result.filter(
        (item) => Number(item.bathrooms) <= Number(bathroomsMax)
      );
    }

    if (areaMin) {
      result = result.filter((item) => Number(item.area) >= Number(areaMin));
    }

    if (areaMax) {
      result = result.filter((item) => Number(item.area) <= Number(areaMax));
    }

    // Sort the filtered results
    result.sort((a, b) => {
      if (sortField === "location") {
        if (sortDirection === "asc") {
          return a.location.localeCompare(b.location);
        } else {
          return b.location.localeCompare(a.location);
        }
      }

      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return result;
  }, [
    listings,
    keyword,
    priceMin,
    priceMax,
    bedroomsMin,
    bedroomsMax,
    bathroomsMin,
    bathroomsMax,
    areaMin,
    areaMax,
    sortField,
    sortDirection,
  ]);

  // ─── Pagination slice ────────────────────────────────
  const startIndex = (activePage - 1) * itemsPerPage;
  const pageItems = filteredListings.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  return (
    <div className="container mx-auto py-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-wrap lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex grow items-center bg-white rounded shadow px-3 py-2 min-w-0">
          <Search className="mr-2 text-gray-500 flex-shrink-0" />
          <Input
            placeholder="Search by title or location…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border-none focus:ring-0 flex-1 min-w-0"
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-start">
          {/* Show per page */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Label>Show:</Label>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(v) => {
                setItemsPerPage(+v);
                setActivePage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[3, 6, 9].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Label>Sort:</Label>
            <Select value={sortField} onValueChange={(v) => setSortField(v)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date Added" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date Added</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortDirection}
              onValueChange={(v) => setSortDirection(v as any)}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Desc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Desc</SelectItem>
                <SelectItem value="asc">Asc</SelectItem>
              </SelectContent>
            </Select>

            {/* Toogle  */}
            <Button variant="outline" onClick={() => setShowFilters((f) => !f)}>
              {showFilters ? <X size={16} /> : <Filter size={16} />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`bg-white rounded-lg shadow p-6 space-y-6 lg:block ${
            showFilters ? "block" : "hidden"
          }`}
        >
          {/* Price Range */}
          <div>
            <Label className="font-semibold">Rent Range</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <Label className="font-semibold">Bedrooms</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                placeholder="Min"
                value={bedroomsMin}
                onChange={(e) => setBedroomsMin(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={bedroomsMax}
                onChange={(e) => setBedroomsMax(e.target.value)}
              />
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <Label className="font-semibold">Bathrooms</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                placeholder="Min"
                value={bathroomsMin}
                onChange={(e) => setBathroomsMin(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={bathroomsMax}
                onChange={(e) => setBathroomsMax(e.target.value)}
              />
            </div>
          </div>

          {/* Area */}
          <div>
            <Label className="font-semibold">Area (sqft)</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                placeholder="Min"
                value={areaMin}
                onChange={(e) => setAreaMin(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={areaMax}
                onChange={(e) => setAreaMax(e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => {
              setKeyword("");
              setPriceMin("");
              setPriceMax("");
              setBedroomsMin("");
              setBedroomsMax("");
              setBathroomsMin("");
              setBathroomsMax("");
              setAreaMin("");
              setAreaMax("");
              setSortField("createdAt");
              setSortDirection("desc");
              setItemsPerPage(6);
              setActivePage(1);
              setShowFilters(false);
            }}
          >
            Clear All Filters
          </Button>
        </aside>

        {/* Listings List */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageItems.map((item) => (
              <ListingCard key={item._id} listing={item} />
            ))}
          </div>

          <TablePaginationStatic
            totalPage={totalPages}
            currentPage={activePage}
            onPageChange={setActivePage}
          />
        </main>
      </div>
    </div>
  );
}
