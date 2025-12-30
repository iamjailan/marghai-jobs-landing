"use client";

import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/store/store";

const authPages = ["/login", "/signup"];
const protectedPages = ["/profile", "/post"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  useEffect(() => {
    if (!isAuthenticated && protectedPages.includes(pathname)) {
      router.replace("/login");
    }

    if (isAuthenticated && authPages.includes(pathname)) {
      router.replace("/profile");
    }
  }, [isAuthenticated, pathname, router]);

  return children;
}
