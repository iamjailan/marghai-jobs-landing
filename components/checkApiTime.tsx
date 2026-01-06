"use client";

import { useGetStatistics } from "@/query/hooks";
import { useEffect, useRef } from "react";
import Alert from "./ui/alert";

export function CheckApiTime() {
  const status = useGetStatistics();
  const delay = 6000;
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!status.isLoading && !status.isFetching) return;

    const timer = setTimeout(() => {
      if (!hasShownRef.current) {
        Alert(
          "info",
          "Waking up the backend server…",
          "This project backend server runs on free hosting, so the first request may take a moment."
        );
        hasShownRef.current = true;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [status.isLoading, status.isFetching, delay]);

  return null;
}
