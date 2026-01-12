"use client";
import { useState } from "react";
import { LogOut, Menu, User, X, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { setLanguage, Language } from "@/store/languageSlice";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const router = useRouter();
  const pathname = usePathname();
  const { t, isRTL } = useI18n();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ps", name: "Pashto", nativeName: "پښتو" },
    { code: "dr", name: "Dari", nativeName: "دری" },
  ];

  const handleLanguageChange = (lang: Language) => {
    dispatch(setLanguage(lang));
    setLanguageMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/jobs");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex ${
            isRTL ? "flex-row-reverse" : ""
          } justify-between items-center h-16`}
        >
          <Link
            href={"/"}
            className={`flex items-center ${
              isRTL ? "space-x-reverse space-x-2" : "space-x-2"
            } cursor-pointer rounded-full`}
          >
            <Image
              width={40}
              height={40}
              src={"/logo.png"}
              className="rounded-full"
              alt="marghai-logo"
            />
          </Link>

          <div
            className={`hidden md:flex items-center ${
              isRTL ? "space-x-reverse space-x-8" : "space-x-8"
            }`}
          >
            <Link
              href={"/"}
              className={`transition-colors ${
                pathname === "/"
                  ? "text-[#0066FF]"
                  : "text-gray-600 hover:text-[#0066FF]"
              }`}
            >
              {t("nav.home")}
            </Link>
            <Link
              className={`transition-colors ${
                pathname === "/jobs" || pathname.startsWith("/jobs/")
                  ? "text-[#0066FF]"
                  : "text-gray-600 hover:text-[#0066FF]"
              }`}
              href={"/jobs"}
            >
              {t("nav.jobs")}
            </Link>
            <Link
              href={isLoggedIn ? "/post" : "/login"}
              className="bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
            >
              {t("nav.postJob")}
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className={`flex items-center ${
                  isRTL ? "space-x-reverse space-x-2" : "space-x-2"
                } px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find((l) => l.code === currentLanguage)
                    ?.nativeName || "EN"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    languageMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {languageMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLanguageMenuOpen(false)}
                  />
                  <div
                    className={`absolute ${
                      isRTL ? "left-0" : "right-0"
                    } top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px] z-20`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full ${
                          isRTL ? "text-right" : "text-left"
                        } px-4 py-2 hover:bg-gray-100 transition-colors ${
                          currentLanguage === lang.code
                            ? "bg-blue-50 text-[#0066FF]"
                            : "text-gray-700"
                        }`}
                      >
                        <div
                          className={`flex items-center ${
                            isRTL
                              ? "justify-end space-x-reverse space-x-2"
                              : "justify-between"
                          }`}
                        >
                          <span className="font-medium">{lang.nativeName}</span>
                          <span className="text-xs text-gray-500">
                            {lang.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
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
              className={`block w-full cursor-pointer ${
                isRTL ? "text-right" : "text-left"
              } px-4 py-2 rounded-lg hover:bg-gray-50 ${
                pathname === "/" ? "text-[#0066FF]" : "text-gray-600"
              }`}
            >
              {t("nav.home")}
            </Link>
            <Link
              href={"/jobs"}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className={`block w-full ${
                isRTL ? "text-right" : "text-left"
              } px-4 py-2 rounded-lg hover:bg-gray-50 ${
                pathname === "/jobs" || pathname.startsWith("/jobs/")
                  ? "text-[#0066FF]"
                  : "text-gray-600"
              }`}
            >
              {t("nav.jobs")}
            </Link>
            <Link
              href={isLoggedIn ? "/post" : "/login"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white px-6 py-2 rounded-full"
            >
              {t("nav.postJob")}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="pt-2 border-t border-gray-200">
              <div className="px-4 py-2 text-sm font-medium text-gray-700 mb-2">
                Language / ژبه / زبان
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full ${
                    isRTL ? "text-right" : "text-left"
                  } px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
                    currentLanguage === lang.code
                      ? "bg-blue-50 text-[#0066FF]"
                      : "text-gray-700"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      isRTL
                        ? "justify-end space-x-reverse space-x-2"
                        : "justify-between"
                    }`}
                  >
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-xs text-gray-500">{lang.name}</span>
                  </div>
                </button>
              ))}
            </div>
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
