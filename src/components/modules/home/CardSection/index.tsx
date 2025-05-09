import { getAllListings } from "@/services/PropertyService";
import React from "react";
import ListingCard from "../../tenant/listing-card";
import Link from "next/link";

const ListingSection = async () => {
  const { data: listings } = await getAllListings();

  return (
    <div className="container mx-auto py-16">
      {/* Heading and Subheading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">
          Featured Listings
        </h2>
        <p className="text-lg text-gray-700">
          Explore the best rental properties in your area. Find your perfect
          home today!
        </p>
      </div>

      {/* Grid Layout for Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.slice(0, 4).map((listing: any) => (
          <div className="flex flex-col h-full" key={listing._id}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>

      {/* See More Listings Button */}
      <div className="text-center mt-8">
        <Link
          href="/listings"
          className="inline-block bg-teal-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all"
        >
          See More Listings
        </Link>
      </div>
    </div>
  );
};

export default ListingSection;
