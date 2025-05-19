"use client";

import React from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "Tenant",
    image:
      "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-136701248.jpg", // Replace with actual image path
    quote:
      "This is the best place I’ve ever rented. Everything is handled so smoothly!",
  },
  {
    name: "Jane Smith",
    role: "Landlord",
    image:
      "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-136701248.jpg",
    quote:
      "Easy to work with, and I’m always updated about the tenants' payments and status.",
  },
  {
    name: "Emily Davis",
    role: "Tenant",
    image:
      "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-136701248.jpg",
    quote:
      "Fantastic service! The app is very intuitive and support is always quick.",
  },
  {
    name: "Michael Brown",
    role: "Landlord",
    image:
      "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-136701248.jpg",
    quote:
      "A great way to find reliable tenants. Highly recommended to other landlords.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-10 lg:py-24">
      <div className="container mx-auto px-6 lg:px-0 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-8">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={96} // Set image width
                height={96} // Set image height
                className="rounded-full object-cover mb-4"
                priority={false} // Use lazy loading by default
              />
              <h3 className="font-semibold text-xl text-gray-700">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
