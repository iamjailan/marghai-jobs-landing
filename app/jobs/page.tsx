"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetAllJobs } from "@/query/hooks";
import { SpinnerCustom } from "@/components/loading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const JobsPage = () => {
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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore{" "}
            <span className="bg-linear-to-r from-[#00cbff] to-[#0066FF] bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {jobsCount} jobs available across Afghanistan
          </p>

          <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-gray-700 font-medium">
                Items per page:
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {data?.map((job: any) => {
                  const isNew = isToday(job?.createdAt);
                  return (
                    <Link
                      key={job.id}
                      href={`/jobs/${job?.id}`}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                        isNew ? "ring-2 ring-[#00cbff] relative" : ""
                      }`}
                    >
                      {isNew && (
                        <div className="absolute top-0 right-0 bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white px-4 py-1 rounded-bl-xl text-sm font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          New Today
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-14 h-14 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-xl flex items-center justify-center text-white font-bold text-xl ${
                              isNew ? "animate-pulse" : ""
                            }`}
                          >
                            {job?.logo || "PP"}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {job?.title}
                        </h3>
                        <p className="text-gray-600 font-medium mb-4">
                          {job?.customer?.first_name}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{job?.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{job?.type}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {job?.salary}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                          {job?.description}
                        </p>

                        <button
                          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isNew
                              ? "bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white hover:shadow-lg"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Apply Now
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <main className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setOffset(offset <= 0 ? 0 : offset - 1)}
                  disabled={!hasPrevPage}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    !hasPrevPage
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white cursor-pointer text-gray-700 hover:bg-gray-100 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <button
                  onClick={() => setOffset(offset + 1)}
                  disabled={!hasNextPage}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    !hasNextPage
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-linear-to-r cursor-pointer from-[#00cbff] to-[#0066FF] text-white hover:shadow-xl"
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </main>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobsPage;
