"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { protectedRoutes } from "@/constants";

import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home as HomeIcon,
  ChevronDown,
  Heart,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, setUser, setIsLoading } = useUser();
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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Listings" },
    { href: "/about", label: "About Us" },
    { href: "/tips", label: "Tips" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy & Policy" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b px-4 lg:px-0">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center text-2xl font-black">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-600 text-white">
              <HomeIcon className="h-4 w-4" />
            </div>
            <span className="font-semibold text-xl">PropertyPro</span>
          </div>
        </Link>

        {/* Desktop Main Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {["/", "/listings", "/about", "/tips"].map((href) => {
            const label = navItems.find((n) => n.href === href)!.label;
            return (
              <Link
                key={href}
                href={href}
                className={`font-semibold ${
                  pathname === href
                    ? "text-teal-600"
                    : "text-gray-800 hover:text-teal-600"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {/* Explore Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span
                className={`flex items-center font-semibold ${
                  pathname.startsWith("/faq") ||
                  pathname.startsWith("/privacy-policy")
                    ? "text-teal-600"
                    : "text-gray-800 hover:text-teal-600"
                }`}
              >
                Explore
                <ChevronDown className="ml-1 h-4 w-4" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/faq">
                <DropdownMenuItem>FAQ</DropdownMenuItem>
              </Link>
              <Link href="/privacy-policy">
                <DropdownMenuItem>Privacy &amp; Policy</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Right Nav */}
        <nav className="hidden lg:flex items-center gap-4">
          {user?.role === "tenant" && (
            <Link href="/tenant/requests">
              <Button variant="outline" className="p-0 rounded-full">
                <Heart />
              </Button>
            </Link>
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
                <Link href={`/${user.role}/dashboard`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <Link href={`/${user.role}/profile`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/register">
                <Button variant="outline" className="cursor-pointer">
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Slide-in Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop with reduced opacity */}
          <div
            className="fixed inset-0 bg-opacity-70"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="relative w-64 bg-white p-6 shadow-xl overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            <nav className="mt-8 flex flex-col space-y-4">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-2 py-1 text-lg font-medium rounded transition ${
                    pathname === href
                      ? "text-teal-600 underline"
                      : "text-gray-800 hover:text-teal-600"
                  }`}
                >
                  {label}
                </Link>
              ))}

              {user?.email ? (
                <>
                  <Link
                    href={`/${user.role}/dashboard`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-2 py-1 text-lg font-medium rounded transition ${
                      pathname === `/${user.role}/dashboard`
                        ? "text-teal-600 underline"
                        : "text-gray-800 hover:text-teal-600"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1 text-lg font-medium rounded text-gray-800 hover:text-teal-600 transition"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/register">
                    <Button
                      variant="outline"
                      className="w-full mb-2 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
