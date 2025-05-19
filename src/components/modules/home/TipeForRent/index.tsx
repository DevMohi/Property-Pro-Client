"use client";
import Link from "next/link";
import { Lightbulb, Home, Handshake } from "lucide-react";

const tips = [
  {
    Icon: Lightbulb,
    title: "Inspect Before You Rent",
    description:
      "Check the plumbing, electricity, and overall condition before signing. Avoid future repair surprises.",
    updated: "March 2025",
  },
  {
    Icon: Home,
    title: "Know Your Neighborhood",
    description:
      "Research schools, markets, transport, and safety. A great home includes a great community.",
    updated: "March 2025",
  },
  {
    Icon: Handshake,
    title: "Understand the Agreement",
    description:
      "Read the contract. Know your rights, responsibilities, and lease terms before signing.",
    updated: "March 2025",
  },
];

export default function TipsForRent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-8 md:px-0 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900">
            Smart Renting Tips{" "}
            <span role="img" aria-label="brain emoji">
              🧠
            </span>
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Expert guidance to help renters and landlords make smarter, more
            confident property decisions.
          </p>
        </section>

        {/* Tips Cards */}
        <section className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {tips.map(({ Icon, title, description, updated }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-teal-100 rounded-full">
                <Icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                {title}
              </h3>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                {description}
              </p>
              <p className="mt-6 text-gray-400 text-sm">Updated: {updated}</p>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center mb-24">
          <div className="inline-block bg-white p-10 rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Ready to Rent Smarter?
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover your next home or become a trusted landlord today.
              Whether you are searching for the perfect place to call home or
              looking to offer a great rental experience to tenants, we make the
              process simple and efficient.
            </p>
            <Link
              href="/listings"
              className="mt-8 inline-block px-10 py-4 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition"
            >
              Explore Listings
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
