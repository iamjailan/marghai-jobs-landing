"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGetAllJobs } from "@/query/hooks";
import JobCard from "./job-card";
import { useI18n } from "@/lib/i18n";

const RecentJobs = () => {
  const { t, isRTL } = useI18n();
  const allJobs = useGetAllJobs({
    filter: `limit=3&offset=0`,
  });

  const data = allJobs?.data?.data;

  const isToday = (date: string | Date) => {
    const d = new Date(date);
    const today = new Date();
    return d?.toDateString() === today.toDateString();
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center ${
            isRTL ? "flex-row-reverse" : ""
          } justify-between mb-12`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {t("jobs.recentJobs")}
          </h2>
          <Link
            href="/jobs"
            className={`flex items-center ${
              isRTL ? "flex-row-reverse gap-2" : "gap-2"
            } bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300`}
          >
            {t("jobs.viewAll")}
            <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((job: any) => {
            const isNew = isToday(job?.createdAt);
            return <JobCard key={job.id} job={job} isNew={isNew} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentJobs;
