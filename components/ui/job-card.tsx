"use client";

import React from "react";
import { MapPin, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    logo?: string;
    createdAt: string | Date;
    customer?: {
      first_name: string;
    };
  };
  isNew: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, isNew }) => {
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

        <h3 className="text-xl font-bold text-gray-900 mb-2">{job?.title}</h3>
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
            <span className="text-sm font-semibold">{job?.salary}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {job?.description}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
