"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    title: "Smart Rental Housing",
    desc: "Easily connect with landlords and tenants for a seamless rental experience.",
    img: "https://images.unsplash.com/photo-1627141234469-24711efb373c?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "List & Manage Properties",
    desc: "Landlords can post, update, and manage property listings with ease.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Find Your Next Home",
    desc: "Browse verified rental listings and request rentals securely.",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function HomeSlider() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(0);

  // Always register the effect, but only start the slider timer on the home page
  useEffect(() => {
    if (pathname !== "/") return;
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [pathname]);

  // If not on "/", render nothing
  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="relative h-[65vh] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            width={1920}
            height={1080}
            src={slide.img}
            alt={slide.title}
            className="w-full h-full brightness-40 object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl max-w-2xl">{slide.desc}</p>
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setCurrent((p) => (p - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition z-20"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => setCurrent((p) => (p + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition z-20"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
