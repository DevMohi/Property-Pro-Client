"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About Us" },
  { href: "/tips", label: "Tips" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy & Policy" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  const half = Math.ceil(quickLinks.length / 2);
  const firstHalf = quickLinks.slice(0, half);
  const secondHalf = quickLinks.slice(half);

  return (
    <footer className="bg-gray-900 text-white py-10 px-6 lg:px-0">
      {/* Mobile/Tablet: 2-col */}
      <div className="grid grid-cols-2 gap-8 md:hidden container mx-auto">
        {/* Left: Contact + Follow */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-teal-500" />
            support@property.com
          </p>
          <p className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-teal-500" />
            +1 (800) 123-4567
          </p>
          <h3 className="text-xl font-semibold mb-3 mt-23 md:mt-0">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 hover:text-blue-400 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 hover:text-blue-300 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 hover:text-pink-400 transition" />
            </a>
          </div>
        </div>

        {/* Right: Quick + More */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 mb-6">
            {firstHalf.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-gray-300 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-3">More Links</h3>
          <ul className="space-y-2">
            {secondHalf.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-gray-300 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop: 4-col */}
      <div className="hidden md:grid grid-cols-4 gap-8 container mx-auto">
        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-teal-500" />
            support@property-pro.com
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-teal-500" />
            +1 (800) 123-4567
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 hover:text-blue-400 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 hover:text-blue-300 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 hover:text-pink-400 transition" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {firstHalf.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-gray-300 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">More Links</h3>
          <ul className="space-y-2">
            {secondHalf.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-gray-300 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PropertyPro. All rights reserved.
      </div>
    </footer>
  );
}
