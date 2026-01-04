"use client";

import { useGetAllJobs } from "@/query/hooks";
import { useEffect, useRef } from "react";
import Alert from "./ui/alert";

export function CheckApiTime() {
  const jobsQuery = useGetAllJobs({ filter: "" });
  const delay = 6000;
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!jobsQuery.isLoading && !jobsQuery.isFetching) return;

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
  }, [jobsQuery.isLoading, jobsQuery.isFetching, delay]);

  return null;
}
