"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, Menu, X, Home, ChevronDown } from "lucide-react";
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
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";

export default function Navbar() {
  const { user, setIsLoading, setUser } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-50 px-2 md:px-0">
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

        {/* Desktop Middle Nav */}
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
          <Link
            href="/tips"
            className={`font-semibold ${
              pathname === "/tips"
                ? "text-teal-600"
                : "text-gray-800 hover:text-teal-600"
            }`}
          >
            Tips
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span
                className={`font-semibold ${
                  pathname.startsWith("/explore")
                    ? "text-teal-600"
                    : "text-gray-800 hover:text-teal-600"
                }`}
              >
                Explore{" "}
                <ChevronDown className="inline-block ml-2 h-4 w-4 text-gray-800" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/faq" >
                <DropdownMenuItem className="cursor-pointer">FAQ</DropdownMenuItem>
              </Link>
              <Link href="/privacy-policy">
                <DropdownMenuItem>Privacy & Policy</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Right Nav */}
        <nav className="hidden lg:flex gap-2 items-center">
          {user?.role === "tenant" && (
            <>
              {/* <Button variant="outline" className="rounded-full p-0">
                <ShoppingBag />
              </Button> */}
              <Link href="/tenant/requests">
                <Button variant="outline" className="rounded-full p-0 ">
                  <Heart />
                </Button>
              </Link>
            </>
          )}

          {user?.email ? (
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
                  <Link href={`/${user.role}/dashboard`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${user.role}/profile`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer"
                >
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer"
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden"
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
        <div className="flex flex-col items-center gap-4">
          {[
            { href: "/", label: "Home" },
            { href: "/listings", label: "Listings" },
            { href: "/about", label: "About Us" },
            { href: "/contact", label: "Contact Us" },
            { href: "/faq", label: "FAQ" },
            { href: "/privacy-policy", label: "Privacy & Policy" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`w-full text-center px-2 py-1 rounded ${
                pathname === href
                  ? "text-teal-600 underline"
                  : "text-gray-800 hover:text-teal-600 hover:underline"
              }`}
            >
              {label}
            </Link>
          ))}

          {user?.email ? (
            <div className="w-full">
              <Link
                href={`/${user.role}/dashboard`}
                className={`block text-center w-full px-2 py-1 rounded ${
                  pathname === `/${user.role}/dashboard`
                    ? "text-teal-600 underline"
                    : "text-gray-800 hover:text-teal-600 hover:underline"
                }`}
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <Link href="/register" className="block">
                <Button variant="outline" className="w-full">
                  Register
                </Button>
              </Link>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
