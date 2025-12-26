"use client";

import React, { useState } from "react";
import { Search, MapPin, Clock, TrendingUp } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Solutions Afghanistan",
    location: "Kabul",
    type: "Full-time",
    salary: "Competitive",
    postedDate: new Date(),
    description:
      "We're looking for an experienced software engineer to join our team.",
    logo: "TS",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Digital Marketing Hub",
    location: "Herat",
    type: "Full-time",
    salary: "25,000 - 35,000 AFN",
    postedDate: new Date(Date.now() - 86400000),
    description: "Lead our marketing initiatives and grow our brand presence.",
    logo: "DM",
  },
  {
    id: 3,
    title: "Graphic Designer",
    company: "Creative Studio",
    location: "Mazar-i-Sharif",
    type: "Part-time",
    salary: "20,000 AFN",
    postedDate: new Date(),
    description: "Create stunning visual designs for our diverse client base.",
    logo: "CS",
  },
  {
    id: 4,
    title: "Sales Representative",
    company: "Afghan Trading Co",
    location: "Kandahar",
    type: "Full-time",
    salary: "18,000 - 28,000 AFN",
    postedDate: new Date(Date.now() - 172800000),
    description: "Drive sales growth and build lasting client relationships.",
    logo: "AT",
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "Kabul",
    type: "Full-time",
    salary: "30,000 AFN",
    postedDate: new Date(),
    description:
      "Analyze data and provide insights to drive business decisions.",
    logo: "AP",
  },
  {
    id: 6,
    title: "Customer Support Specialist",
    company: "ServiceFirst",
    location: "Kabul",
    type: "Remote",
    salary: "15,000 - 22,000 AFN",
    postedDate: new Date(Date.now() - 259200000),
    description: "Provide exceptional support to our growing customer base.",
    logo: "SF",
  },
];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      !locationFilter ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-[#00cbff] to-[#0066FF] bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {filteredJobs.length} jobs available across Afghanistan
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const isNew = isToday(job.postedDate);
              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    isNew ? "ring-2 ring-[#00cbff] relative" : ""
                  }`}
                >
                  {isNew && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[#00cbff] to-[#0066FF] text-white px-4 py-1 rounded-bl-xl text-sm font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      New Today
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br from-[#00cbff] to-[#0066FF] rounded-xl flex items-center justify-center text-white font-bold text-xl ${
                          isNew ? "animate-pulse" : ""
                        }`}
                      >
                        {job.logo}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 font-medium mb-4">
                      {job.company}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {job.salary}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {job.description}
                    </p>

                    <button
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isNew
                          ? "bg-gradient-to-r from-[#00cbff] to-[#0066FF] text-white hover:shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobsPage;
