import { getAllListings } from "@/services/PropertyService";
import React from "react";
import ListingCard from "../../tenant/listing-card";
import Link from "next/link";

const ListingSection = async () => {
  const { data: listings } = await getAllListings();

  return (
    <section className="bg-gray-50 py-8 md:py-12 ">
      <div className="container mx-auto px-6 lg:px-0">
        {/* Heading and Subheading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
            Featured Listings
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Explore the best rental properties in your area. Find your perfect
            home today!
          </p>
        </div>

        {/* Grid Layout for Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.slice(0, 4).map((listing: any) => (
            <div className="flex flex-col h-full" key={listing._id}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {/* See More Listings Button */}
        <div className="text-center mt-10">
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
