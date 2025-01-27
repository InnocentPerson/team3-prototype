"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-[#a65c1c] text-white drop-shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 drop-shadow-sm">
        <div className="flex justify-between h-16">
          {/* Left Side: Logo and Links */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center pr-3 hover:transform hover:scale-105 transition">
              <Link href="/">
                <span className="font-bold text-xl">Discreta</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-white"
              >
                Dashboard
              </Link>
              <Link
                href="/permutation"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-white"
              >
                Permutation
              </Link>
              <Link
                href="/lattices"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-white"
              >
                Lattices
              </Link>
              <Link
                href="/posets"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-white"
              >
                Posets
              </Link>
            </div>
          </div>

          {/* Right Side: Login/Signup */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/login"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8e4e18]"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#8e4e18] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#a65c1c] focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed: Hamburger Menu */}
              {!isMobileMenuOpen && (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
              )}
              {/* Icon when menu is open: X Mark */}
              {isMobileMenuOpen && (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-[#8e4e18] hover:border-white"
            >
              Dashboard
            </Link>
            <Link
              href="/permutation"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-[#8e4e18] hover:border-white"
            >
              Permutation
            </Link>
            <Link
              href="/lattices"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-[#8e4e18] hover:border-white"
            >
              Lattices
            </Link>
            <Link
              href="/posets"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-[#8e4e18] hover:border-white"
            >
              Posets
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-[#8e4e18]">
            <Link
              href="/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-[#8e4e18] hover:border-white"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
