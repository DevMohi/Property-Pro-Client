"use client";
import React from "react";
import {
  CheckCircle,
  MessageSquare,
  Lock,
  Truck,
  Phone,
  Home,
} from "lucide-react";

const features = [
  {
    Icon: CheckCircle,
    title: "Verified Listings",
    text: "All properties go through rigorous verification to ensure safety and quality.",
  },
  {
    Icon: MessageSquare,
    title: "Direct Communication",
    text: "Chat instantly with landlords and agents—no middlemen, no delays.",
  },
  {
    Icon: Lock,
    title: "Secure Payments",
    text: "Benefit from encrypted transactions and secure payment gateways.",
  },
  {
    Icon: Truck,
    title: "Fast Moves",
    text: "Enjoy rapid lease approvals with our streamlined digital process.",
  },
  {
    Icon: Phone,
    title: "24/7 Support",
    text: "Access round-the-clock assistance for any questions or concerns.",
  },
  {
    Icon: Home,
    title: "Wide Property Range",
    text: "Choose from a diverse catalog of homes to match your style and budget.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-gray-50 pt-10 md:pt-18 lg:pt-24">
      <div className="container mx-auto px-6 lg:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Why Choose PropertyPro?
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes us the preferred platform for renters and
            landlords alike.
          </p>
        </div>

        {/* Alternating feature rows */}
        <div className="space-y-12">
          {features.map(({ Icon, title, text }, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-center md:justify-between md:gap-12 p-6 bg-white rounded-xl shadow-lg transition-transform hover:-translate-y-1 ${
                idx % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <div className="flex-shrink-0 bg-teal-100 p-4 rounded-full">
                <Icon className="w-8 h-8 text-teal-600" />
              </div>
              <div className="mt-4 md:mt-0 md:flex-1 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-gray-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
