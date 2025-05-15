"use client";

import { Button } from "../ui/button";
import {
  Heart,
  LogOut,
  ShoppingBag,
  Menu,
  X,
  Home,
  ChevronDown,
} from "lucide-react"; // Import ChevronDown
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { protectedRoutes } from "@/constants";
import React from "react";

export default function Navbar() {
  const { user, setIsLoading, setUser } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/";
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsLoading(true);

    //jodi kono protected route thake then it will navigate to login. // will do this logic later
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push(redirectPath);
    }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center text-2xl font-black">
          <div className="flex items-center gap-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Home className="h-4 w-4" />
            </div>
            <div className="font-semibold">PropertyPro</div>
          </div>
        </Link>

        {/* Middle Navigation Links */}
        <nav className="hidden lg:flex gap-6 items-center">
          <Link
            href="/"
            className={`font-semibold ${
              pathname === "/"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/listings"
            className={`font-semibold ${
              pathname === "/listings"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            Listings
          </Link>
          <Link
            href="/about"
            className={`font-semibold ${
              pathname === "/about"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            About Us
          </Link>

          {/* Explore Dropdown with Arrow */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span
                className={`font-semibold ${
                  pathname.includes("/explore")
                    ? "text-teal-600"
                    : "text-gray-800 hover:text-teal-600"
                }`}
              >
                Explore{" "}
                <ChevronDown className="inline-block ml-2 h-4 w-4 text-gray-800" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/faq">
                <DropdownMenuItem>FAQ</DropdownMenuItem>
              </Link>
              <Link href="/privacy-policy">
                <DropdownMenuItem>Privacy & Policy</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Nav for Cart, Heart, etc. */}

        <nav className="hidden lg:flex gap-2 items-center">
          {user?.role === "tenant" && (
            <div>
              <Button variant="outline" className="rounded-full p-0 size-10">
                <ShoppingBag />
              </Button>
              <Link href="/tenant/requests">
                <Button
                  variant="outline"
                  className="rounded-full p-0 size-10 ml-2 cursor-pointer"
                >
                  <Heart />
                </Button>
              </Link>
            </div>
          )}

          {user?.email ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white p-5 shadow-lg`}
      >
        <div className="flex flex-col gap-4">
          {/* Middle Nav Links for Mobile */}
          <Link
            href="/"
            className={`text-teal-600 font-semibold ${
              pathname === "/"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/tenants"
            className={`text-teal-600 font-semibold ${
              pathname === "/tenants"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            Tenants
          </Link>
          <Link
            href="/about"
            className={`text-teal-600 font-semibold ${
              pathname === "/about"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`text-teal-600 font-semibold ${
              pathname === "/contact"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            Contact Us
          </Link>

          {/* Cart and User related */}
          <Link href="/cart">
            <Button variant="outline" className="rounded-full w-full">
              <ShoppingBag /> Cart
            </Button>
          </Link>

          {/* Additional links for mobile */}
          <Link
            href="/faq"
            className={`text-teal-600 font-semibold ${
              pathname === "/faq"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            FAQ
          </Link>
          <Link
            href="/privacy-policy"
            className={`text-teal-600 font-semibold ${
              pathname === "/privacy-policy"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            Privacy & Policy
          </Link>

          {user?.email ? (
            <>
              <Link href="/create-shop">
                <Button className="w-full rounded-full">Create Shop</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="w-full rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
