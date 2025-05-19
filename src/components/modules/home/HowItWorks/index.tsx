"use client";
import React from "react";
import { Search, Mail, FileSignature } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      Icon: Search,
      title: "Search Properties",
      description:
        "Browse through thousands of verified listings using detailed filters to find the perfect home for your lifestyle.",
    },
    {
      Icon: Mail,
      title: "Contact Landlords",
      description:
        "Message property owners directly, schedule viewings, and negotiate terms—all within our secure platform.",
    },
    {
      Icon: FileSignature,
      title: "Secure Your Lease",
      description:
        "Complete your rental agreement digitally with e-signatures and get ready to move into your new home seamlessly.",
    },
  ];

  return (
    <section className="pt-12 lg:pt-24">
      <div className="container mx-auto px-6 lg:px-0">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            How PropertyPro Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Our three-step process makes renting effortless—designed to get you
            from browsing to moving in with ease.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map(({ Icon, title, description }, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center text-center shadow hover:shadow-lg transition"
            >
              <div className="p-4 bg-teal-100 rounded-full mb-4">
                <Icon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
