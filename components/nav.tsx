"use client";
import { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00cbff] to-[#0066FF] rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00cbff] to-[#0066FF] bg-clip-text text-transparent">
              Marghai
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href={"/"} className="text-[#0066FF] transition-colors">
              Home
            </Link>
            <Link
              className="text-gray-600 hover:text-[#0066FF] transition-colors"
              href={"/jobs"}
            >
              Jobs
            </Link>
            <button className="text-gray-600 hover:text-[#0066FF] transition-colors">
              About
            </button>
            <button className="text-gray-600 hover:text-[#0066FF] transition-colors">
              Contact
            </button>
            <Link
              href={"/post"}
              className="bg-gradient-to-r from-[#00cbff] to-[#0066FF] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
            >
              Post a Job
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </section>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <Link
              href={"/"}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Home
            </Link>
            <Link
              href={"/jobs"}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Jobs
            </Link>
            <button className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              About
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Contact
            </button>
            <Link
              href={"/post"}
              className="w-full bg-gradient-to-r from-[#00cbff] to-[#0066FF] text-white px-6 py-2 rounded-full"
            >
              Post a Job
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
