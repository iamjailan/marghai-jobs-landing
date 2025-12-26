"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Sparkles,
} from "lucide-react";

const CreateJobPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: Record<string, any>) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newJob = {
      id: new Date().getTime(),
      title: data.jobTitle,
      company: data.companyName,
      location: data.location,
      type: data.jobType,
      salary: data.salary,
      postedDate: new Date(),
      description: data.description,
      logo: data.companyName.substring(0, 2).toUpperCase(),
    };

    console.log(newJob);

    setIsSubmitting(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00cbff] to-[#0066FF] rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Post a{" "}
              <span className="bg-gradient-to-r from-[#00cbff] to-[#0066FF] bg-clip-text text-transparent">
                New Job
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Find the perfect candidate for your company
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          >
            <div className="mb-6">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Briefcase className="w-5 h-5 text-[#0066FF]" />
                Job Title *
              </label>
              <input
                type="text"
                {...register("jobTitle", {
                  required: "Job title is required",
                  minLength: {
                    value: 3,
                    message: "Job title must be at least 3 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Job title must be less than 100 characters",
                  },
                })}
                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                  errors.jobTitle
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#0066FF]"
                }`}
                placeholder="e.g. Senior Software Engineer"
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Building className="w-5 h-5 text-[#0066FF]" />
                Company Name *
              </label>
              <input
                type="text"
                {...register("companyName", {
                  required: "Company name is required",
                  minLength: {
                    value: 2,
                    message: "Company name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Company name must be less than 50 characters",
                  },
                })}
                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                  errors.companyName
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#0066FF]"
                }`}
                placeholder="e.g. Tech Solutions Afghanistan"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <MapPin className="w-5 h-5 text-[#0066FF]" />
                Location *
              </label>
              <select
                {...register("location", {
                  required: "Location is required",
                })}
                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                  errors.location
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#0066FF]"
                }`}
              >
                <option value="">Select a location</option>
                <option value="Kabul">Kabul</option>
                <option value="Herat">Herat</option>
                <option value="Mazar-i-Sharif">Mazar-i-Sharif</option>
                <option value="Kandahar">Kandahar</option>
                <option value="Jalalabad">Jalalabad</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Clock className="w-5 h-5 text-[#0066FF]" />
                  Job Type *
                </label>
                <select
                  {...register("jobType", {
                    required: "Job type is required",
                  })}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                    errors.jobType
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#0066FF]"
                  }`}
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jobType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <DollarSign className="w-5 h-5 text-[#0066FF]" />
                  Salary *
                </label>
                <input
                  type="text"
                  {...register("salary", {
                    required: "Salary is required",
                    pattern: {
                      value: /^[0-9,\-\s]+AFN$|^Competitive$/i,
                      message:
                        'Enter valid salary (e.g., "20,000 AFN" or "Competitive")',
                    },
                  })}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                    errors.salary
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#0066FF]"
                  }`}
                  placeholder="e.g. 25,000 AFN or Competitive"
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salary.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FileText className="w-5 h-5 text-[#0066FF]" />
                Job Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Job description is required",
                  minLength: {
                    value: 50,
                    message: "Description must be at least 50 characters",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Description must be less than 1000 characters",
                  },
                })}
                rows="6"
                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all resize-none ${
                  errors.description
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#0066FF]"
                }`}
                placeholder="Describe the role, responsibilities, and requirements..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#00cbff] to-[#0066FF] text-white hover:shadow-2xl transform hover:-translate-y-1"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting Job...
                </span>
              ) : (
                "Post Job"
              )}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              * Required fields
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateJobPage;
