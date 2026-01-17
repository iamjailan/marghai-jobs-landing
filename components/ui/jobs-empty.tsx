"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const JobsEmpty = () => {
  const { t, isRTL } = useI18n();

  return (
    <div className="pt-16 pb-8 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <AlertCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("jobs.noJobsFound") || "No jobs found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("jobs.noJobsFoundMessage") ||
              "We couldn't find any jobs matching your filters."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/post"
              className="px-6 py-3 bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {t("postJob.newJob") || "Post a Job"}
            </Link>
            <Link
              href="/jobs"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              {t("jobs.browseAll") || "Browse Jobs"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsEmpty;
