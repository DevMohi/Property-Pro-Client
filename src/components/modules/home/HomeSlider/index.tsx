"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Smart Rental Housing",
    desc: "Easily connect with landlords and tenants for a seamless rental experience.",
    img: "https://images.unsplash.com/photo-1627141234469-24711efb373c?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "List & Manage Properties",
    desc: "Landlords can post, update, and manage property listings with ease.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "Find Your Next Home",
    desc: "Browse verified rental listings and request rentals securely.",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export default function HomeSlider() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-16 md:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-xl mb-6">
              {slide.desc}
            </p>
            <Link
              href="/listings"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base md:text-lg px-5 py-2 sm:py-3 rounded-full transition"
            >
              See Listings
            </Link>
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setCurrent((c) => (c - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 transition z-20"
      >
        <ChevronLeft className="w-5 h-5 cursor-pointer" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 1bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 transition z-20"
      >
        <ChevronRight className="w-5 h-5 cursor-pointer" />
      </button>
    </div>
  );
}
