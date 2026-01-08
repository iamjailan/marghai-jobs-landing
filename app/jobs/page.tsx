import JobsPage from "@/components/ui/jobs";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Jobs | Marghai Jobs - Find Your Dream Job in Afghanistan",
  description:
    "Explore thousands of job opportunities in Afghanistan. Search and filter jobs by location, title, and more. Find your next career opportunity with Marghai Jobs. د افغانستان د کار فرصتونه - بهترین فرصت‌های شغلی افغانستان",
  keywords: [
    "jobs Afghanistan",
    "job search Afghanistan",
    "career opportunities Afghanistan",
    "find jobs Afghanistan",
    "job listings Afghanistan",
    "employment Afghanistan",
    "د افغانستان دندې",
    "د کار فرصتونه",
    "کاریابی افغانستان",
    "وظایف افغانستان",
    "فرصت‌های شغلی افغانستان",
  ],
  openGraph: {
    title: "Browse Jobs | Marghai Jobs - Find Your Dream Job in Afghanistan",
    description:
      "Explore thousands of job opportunities in Afghanistan. Search and filter jobs by location, title, and more.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Marghai Jobs Logo",
      },
    ],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

const Jobs = () => {
  return (
    <div>
      <JobsPage />
    </div>
  );
};

export default Jobs;
