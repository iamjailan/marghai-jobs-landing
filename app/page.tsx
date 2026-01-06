"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Building,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import JobCount from "@/components/job-count";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const filter = `location=${locationFilter}&search=${searchTerm}`;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Find Your Dream Job in
              <span className="block bg-linear-to-r from-[#00cbff] to-[#0066FF] bg-clip-text text-transparent">
                Afghanistan
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Marghai connects talented professionals with leading companies
              across Afghanistan. Your next career opportunity is just a search
              away.
            </p>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>
              <Link
                href={`/jobs?${filter}`}
                className="bg-linear-to-r hover:opacity-85  bg-[#0066FF] hover:bg-[#00cbff] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Search Jobs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <JobCount />
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-xl flex items-center justify-center mb-4">
                <Building className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">850+</h3>
              <p className="text-gray-600">Partner Companies</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-xl flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">15,000+</h3>
              <p className="text-gray-600">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Why Choose Marghai?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verified Opportunities
              </h3>
              <p className="text-gray-600">
                All job listings are verified to ensure authenticity and quality
                for our users.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Easy Application
              </h3>
              <p className="text-gray-600">
                Apply to multiple jobs with just a few clicks using your
                profile.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Daily Updates
              </h3>
              <p className="text-gray-600">
                New opportunities added every day across all major cities in
                Afghanistan.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-linear-to-br from-[#00cbff] to-[#0066FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have found their dream jobs
            through Marghai.
          </p>
          <Link
            href={"/jobs"}
            className="bg-white text-[#0066FF] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300"
          >
            Browse All Jobs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
