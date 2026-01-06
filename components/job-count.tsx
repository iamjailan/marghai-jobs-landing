"use client";
import { useGetStatistics } from "@/query/hooks";
import { Briefcase } from "lucide-react";
import React from "react";

const JobCount = () => {
  const status = useGetStatistics();
  const count = status?.data?.data?.totalJobs;

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-14 h-14 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-xl flex items-center justify-center mb-4">
        <Briefcase className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-4xl font-bold text-gray-900 mb-2">
        {count?.toLocaleString("en-US") || 0}+
      </h3>
      <p className="text-gray-600">Active Job Listings</p>
    </section>
  );
};

export default JobCount;
