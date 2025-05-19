
import { getAllListings } from "@/services/PropertyService";
import React from "react";
import ListingCard from "../../tenant/listing-card";
import Link from "next/link";

const ListingSection = async () => {
  const { data: listings } = await getAllListings();

  return (
    <section className="bg-gray-50 pt-10 lg:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Featured Listings
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mt-2">
            Explore the best rental properties in your area. Find your perfect
            home today!
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-6 gap-y-8">
          {listings.slice(0, 4).map((listing: any) => (
            <div className="flex flex-col h-full" key={listing._id}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-10 text-center md:text-end">
          <Link
            href="/listings"
            className="inline-block bg-teal-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-semibold hover:bg-teal-700 transition-all"
          >
            See More Listings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
