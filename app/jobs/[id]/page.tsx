"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Clock,
  Building,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  Share2,
  Bookmark,
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle,
  FileText,
  Award,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SpinnerCustom } from "@/components/loading";
import { useApplyJob, useGetJobId } from "@/query/hooks";
import {
  formatDate,
  getDaysSincePosted,
  getDaysUntilExpiration,
} from "@/lib/utils";
import JobNotFound from "@/components/ui/job-not-found";

const JobDetailsPage = () => {
  const { id }: { id: string } = useParams();
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const useJobApply = useApplyJob();

  const useJobById = useGetJobId(id);
  const job = useJobById?.data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onApplicationSubmit = async (data: any) => {
    useJobApply.mutate(
      {
        id,
        body: {
          fullName: data?.fullName,
          email: data.email,
          phone: data.phone,
          resume: data?.resume,
          coverLetter: data?.coverLetter,
        },
      },
      {
        onSuccess: () => {
          setApplicationSubmitted(true);
          reset();
        },
      }
    );
  };

  if (useJobById.isLoading) {
    return <SpinnerCustom />;
  }

  if (useJobById.isError) {
    return <JobNotFound />;
  }

  console.log(getDaysUntilExpiration(job?.deadline));

  const daysUntilExpiration = getDaysUntilExpiration(job?.deadline);

  const isExpiringSoon = daysUntilExpiration <= 7;
  const isExpired = daysUntilExpiration < 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href={"/jobs"}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0066FF] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-xl flex items-center justify-center text-white font-bold text-2xl shrink-0">
                      {job?.logo}
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {job?.title}
                      </h1>
                      <p className="text-xl text-gray-600 mb-4">
                        {job?.company}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getDaysSincePosted(job?.createdAt) === "Today" && (
                          <span className="px-3 py-1 bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white text-sm font-semibold rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            New Today
                          </span>
                        )}
                        {isExpiringSoon && !isExpired && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full">
                            Expiring Soon
                          </span>
                        )}
                        {isExpired && (
                          <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                            Expired
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-5 h-5 text-[#0066FF]" />
                          <span>{job?.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-5 h-5 text-[#0066FF]" />
                          <span>{job?.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="w-5 h-5 text-[#0066FF]" />
                          <span className="font-semibold">{job?.salary}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building className="w-5 h-5 text-[#0066FF]" />
                          <span>{job?.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`p-3 rounded-xl transition-all ${
                        isSaved
                          ? "bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#0066FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted</p>
                      <p className="font-semibold text-gray-900">
                        {getDaysSincePosted(job?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#0066FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Announced</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(job?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isExpired
                          ? "bg-red-50"
                          : isExpiringSoon
                          ? "bg-orange-50"
                          : "bg-green-50"
                      }`}
                    >
                      <Calendar
                        className={`w-5 h-5 ${
                          isExpired
                            ? "text-red-600"
                            : isExpiringSoon
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expires</p>
                      <p
                        className={`font-semibold ${
                          isExpired
                            ? "text-red-600"
                            : isExpiringSoon
                            ? "text-orange-600"
                            : "text-gray-900"
                        }`}
                      >
                        {isExpired
                          ? "Expired"
                          : `In ${daysUntilExpiration} days`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#0066FF]" />
                  Job Description
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {job?.description}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0066FF]" />
                  Requirements
                </h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Bachelor degree in relevant field or equivalent experience
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Strong communication and problem-solving skills
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Ability to work independently and as part of a team
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Proficiency in relevant tools and technologies
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#0066FF]" />
                  Benefits
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Competitive salary package
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Health insurance coverage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Professional development opportunities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Flexible working arrangements
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24">
                {applicationSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Application Sent!
                    </h3>
                    <p className="text-gray-600">
                      Your application has been submitted successfully. We ll
                      contact you soon.
                    </p>
                  </div>
                ) : isExpired ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Job Expired
                    </h3>
                    <p className="text-gray-600 mb-4">
                      This job posting has expired and is no longer accepting
                      applications.
                    </p>
                    <Link
                      href={"/jobs"}
                      className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                      Browse Active Jobs
                    </Link>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Apply for this job
                    </h3>
                    <form
                      onSubmit={handleSubmit(onApplicationSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          {...register("fullName", {
                            required: "Name is required",
                          })}
                          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all"
                          placeholder="Wadan Samun"
                        />
                        {errors?.fullName?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors?.fullName?.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          Email *
                        </label>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email",
                            },
                          })}
                          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all"
                          placeholder="wadan@marghai.com"
                        />
                        {errors.email?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors?.email?.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          {...register("phone", {
                            required: "Phone is required",
                          })}
                          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all"
                          placeholder="+93 899 799 799"
                        />
                        {errors?.phone?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.phone.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          Cover Letter *
                        </label>
                        <textarea
                          {...register("coverLetter", {
                            required: "Cover letter is required",
                            minLength: {
                              value: 50,
                              message: "Minimum 50 characters",
                            },
                          })}
                          rows={4}
                          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all resize-none"
                          placeholder="Tell us why you're a great fit..."
                        />
                        {errors?.coverLetter?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors?.coverLetter?.message)}
                          </p>
                        )}
                      </div>

                      {useJobApply?.isError && (
                        <p className="text-red-500 text-xs mt-1">
                          {String(useJobApply?.error?.message)}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={useJobApply.isPending}
                        className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                          useJobApply.isPending
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white hover:shadow-lg"
                        }`}
                      >
                        {useJobApply.isPending ? (
                          <>
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
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Submit Application
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              <section className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  About Company
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-[#0066FF]" />
                    <span className="text-gray-600">{job?.company}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#0066FF]" />
                    <span className="text-gray-600">{job?.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#0066FF]" />
                    <span className="text-gray-600">50-200 employees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-[#0066FF]" />
                    <span className="text-gray-600">Growing rapidly</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailsPage;
