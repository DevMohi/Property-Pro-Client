"use client";
import React from "react";
import { Search, Mail, FileSignature, ChevronRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      Icon: Search,
      title: "Browse Listings",
      description:
        "Explore available rental properties in your area with advanced filters and high-quality images.",
    },
    {
      Icon: Mail,
      title: "Request Rentals",
      description:
        "Send rental requests directly to property owners and schedule viewings in a few clicks.",
    },
    {
      Icon: FileSignature,
      title: "Sign & Move In",
      description:
        "Complete the lease digitally with secure signatures and get ready to move into your new home.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            How PropertyPro Works
          </h2>
          <div className="mt-2 w-24 h-1 bg-teal-600 mx-auto"></div>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Renting a property is effortless. Follow these simple steps and get
            started today!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-20">
          {steps.map(({ Icon, title, description }, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex-1 max-w-sm text-center p-6 flex flex-col h-full">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-teal-100 rounded-full mb-4">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className=" lg:block w-8 h-8 text-teal-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
