"use client";
import React from "react";
import { CheckCircle, MapPin, FileText, Search } from "lucide-react";

export default function TipsForRenters() {
  const tips = [
    {
      Icon: CheckCircle,
      title: "Set Your Budget",
      text: "Know how much you can afford monthly before you begin your search. Factor in rent, utilities, and any extra fees.",
    },
    {
      Icon: MapPin,
      title: "Choose the Right Location",
      text: "Look for areas with easy access to work, school, and transport. Check safety and nearby facilities like markets or hospitals.",
    },
    {
      Icon: Search,
      title: "Inspect Before You Rent",
      text: "Visit the property in person if possible. Check water, electricity, ventilation, and ask about maintenance responsibilities.",
    },
    {
      Icon: FileText,
      title: "Read the Lease Carefully",
      text: "Understand your rental agreement fully. Look for hidden charges, notice periods, and deposit terms.",
    },
  ];

  return (
    <section className="pt-10 lg:pt-24">
      <div className="container mx-auto px-6 lg:px-0 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
          Tips for Renters
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Advice on finding and renting the right house.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 ">
          {tips.map(({ Icon, title, text }, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center "
            >
              <Icon className="text-teal-600 w-10 h-10 sm:w-12 sm:h-12 mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
