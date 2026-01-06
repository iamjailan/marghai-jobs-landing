"use client";
import { useState } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/jobs");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href={"/"}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Image
              width={40}
              height={40}
              src={"/logo.png"}
              alt="marghai-logo"
            />
          </Link>

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
            <Link
              href={isLoggedIn ? "/post" : "/login"}
              className="bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
            >
              Post a Job
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                 bg-linear-to-r from-[#00cbff] to-[#0066FF] 
                 text-white hover:shadow-lg transition-all"
                  title="Profile"
                >
                  <User size={20} />
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full 
                 bg-red-500 text-white hover:bg-red-600 
                 transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden cursor-pointer"
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="block w-full cursor-pointer text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
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
            <Link
              href={isLoggedIn ? "/post" : "/login"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white px-6 py-2 rounded-full"
            >
              Post a Job
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex mt-3 w-[50px] h-[50px] items-center justify-center px-4 py-2 rounded-sm
                 bg-linear-to-r from-[#00cbff] to-[#0066FF] 
                 text-white hover:shadow-lg transition-all"
                  title="Profile"
                >
                  <User size={20} />
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer justify-center px-4 py-2 rounded-full 
                 bg-red-500 text-white hover:bg-red-600 
                 transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
