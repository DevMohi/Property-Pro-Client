"use client";

import React from "react";
import { Home, Users, ShieldCheck, User, Code, Coffee } from "lucide-react";

export default function AboutUs() {
  const features = [
    {
      title: "For Landlords",
      desc: "Post, manage, and update rental listings with ease. Approve rental requests and securely connect with tenants after approval.",
      Icon: Home,
    },
    {
      title: "For Tenants",
      desc: "Search for homes, request rentals, and unlock secure payment options after landlord approval. Contact landlords directly for details.",
      Icon: Users,
    },
    {
      title: "Admin Oversight",
      desc: "Ensure platform integrity by managing users, verifying listings, and resolving disputes—keeping the experience safe and fair for everyone.",
      Icon: ShieldCheck,
    },
  ];

  const team = [
    { name: "Aisha Patel", role: "Founder & CEO", Icon: User },
    { name: "James Turner", role: "Lead Developer", Icon: Code },
    { name: "Leila Ahmed", role: "Community Manager", Icon: Users },
  ];

  return (
    <div className="space-y-16">
      {/* Mission */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-0 flex flex-col-reverse md:flex-row items-center gap-8 pt-12">
        {/* Text block: full-width on mobile, 3/4 on md+ */}
        <div className="w-full md:w-3/4 space-y-4 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            About <span className="text-teal-600">PropertyPro</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            PropertyPro is your one-stop platform for seamless landlord and
            tenant experiences. We’re dedicated to making renting simple,
            transparent, and stress-free. Whether you’re listing a property or
            hunting for a new home, we’ve got you covered.
          </p>
        </div>

        {/* Illustration: full-width on mobile, 1/4 on md+ */}
        <div className="w-full md:w-1/4 flex justify-center md:justify-end">
          <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[400px] lg:max-w-[430px]">
            <Coffee className="w-full h-auto text-teal-600" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 pt-12">
        <div className="container mx-auto px-6 lg:px-0 space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
            How We Serve You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 sm:gap-8 md:gap-10">
            {features.map(({ title, desc, Icon }, i) => (
              <div
                key={i}
                className="max-w-sm w-full bg-white rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col h-full text-center"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-teal-100 rounded-full mx-auto">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 flex-1 leading-relaxed text-sm sm:text-base">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-0 py-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
          Meet Our <span className="text-teal-600">Team</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {team.map(({ name, role, Icon }, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <Icon className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
              <p className="text-gray-500 text-sm sm:text-base">{role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
