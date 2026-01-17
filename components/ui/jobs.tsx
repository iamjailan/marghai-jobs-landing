"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Alert from "./alert";
import { useGetAllJobs } from "@/query/hooks";
import { SpinnerCustom } from "@/components/loading";
import { useSearchParams } from "next/navigation";
import JobCard from "./job-card";
import JobsEmpty from "./jobs-empty";
import { useI18n } from "@/lib/i18n";

const JobsPage = () => {
  const { t, isRTL } = useI18n();
  const searchParam = useSearchParams();
  const location = searchParam.get("location");
  const search = searchParam.get("search");

  const [searchTerm, setSearchTerm] = useState(search || "");
  const [locationFilter, setLocationFilter] = useState(location || "");
  const [inputValue, setInputValue] = useState(10);
  const [offset, setOffset] = useState(0);

  const allJobs = useGetAllJobs({
    filter: `filter=location=${locationFilter},title=${searchTerm}&limit=${
      inputValue > 100 || inputValue < 1 ? 10 : inputValue
    }&offset=${offset}`,
  });

  const jobsCount = allJobs?.data?.count;
  const data = allJobs?.data?.data;

  const totalPages = Math.ceil(jobsCount / inputValue);

  const currentPage = Math.floor(offset / inputValue) + 1;

  const hasNextPage = currentPage < totalPages;

  const hasPrevPage = currentPage > 1;

  const isToday = (date: string | Date) => {
    const d = new Date(date);
    const today = new Date();

    return d?.toDateString() === today.toDateString();
  };

  useEffect(() => {
    if (allJobs?.isError) {
      const message = (allJobs.error as any)?.message || t("common.error");
      Alert("error", message);
    }
  }, [allJobs?.isError, allJobs?.error, t]);

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("jobs.title")}{" "}
            <span className="bg-linear-to-r from-[#00cbff] to-[#0066FF] bg-clip-text text-transparent">
              {t("jobs.opportunities")}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {jobsCount} {t("jobs.jobsAvailable")}
          </p>

          <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div
                className={`flex items-center ${
                  isRTL ? "flex-row-reverse gap-3" : "gap-3"
                } px-4 py-3 bg-gray-50 rounded-xl`}
              >
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("jobs.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <div
                className={`flex items-center ${
                  isRTL ? "flex-row-reverse gap-3" : "gap-3"
                } px-4 py-3 bg-gray-50 rounded-xl`}
              >
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("jobs.locationPlaceholder")}
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
            </div>

            <div
              className={`flex items-center ${
                isRTL ? "flex-row-reverse gap-3" : "gap-3"
              }`}
            >
              <label className="text-gray-700 font-medium">
                {t("jobs.itemsPerPage")}
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="w-20 px-3 py-2 bg-gray-50 rounded-lg outline-none text-gray-700 border border-gray-200 focus:border-[#00cbff]"
              />
            </div>
          </section>

          {allJobs.isLoading || allJobs.isFetching ? (
            <SpinnerCustom />
          ) : (
            <>
              {jobsCount === 0 ? (
                <JobsEmpty />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {data?.map((job: any) => {
                      const isNew = isToday(job?.createdAt);
                      return <JobCard key={job.id} job={job} isNew={isNew} />;
                    })}
                  </div>

                  <main
                    className={`flex items-center justify-center ${
                      isRTL ? "flex-row-reverse gap-4" : "gap-4"
                    }`}
                  >
                    <button
                      onClick={() => setOffset(offset <= 0 ? 0 : offset - 1)}
                      disabled={!hasPrevPage}
                      className={`flex items-center ${
                        isRTL ? "flex-row-reverse gap-2" : "gap-2"
                      } px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        !hasPrevPage
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white cursor-pointer text-gray-700 hover:bg-gray-100 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      <ChevronLeft
                        className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                      />
                      {t("jobs.previous")}
                    </button>

                    <button
                      onClick={() => setOffset(offset + 1)}
                      disabled={!hasNextPage}
                      className={`flex items-center ${
                        isRTL ? "flex-row-reverse gap-2" : "gap-2"
                      } px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        !hasNextPage
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-linear-to-r cursor-pointer from-[#00cbff] to-[#0066FF] text-white hover:shadow-xl"
                      }`}
                    >
                      {t("jobs.next")}
                      <ChevronRight
                        className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                      />
                    </button>
                  </main>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobsPage;
