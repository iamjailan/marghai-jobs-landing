"use client";

import React from "react";
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
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle,
  FileText,
  Award,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { SpinnerCustom } from "@/components/loading";
import { useApplyJob, useGetJobId } from "@/query/hooks";
import {
  formatDate,
  getDaysSincePosted,
  getDaysUntilExpiration,
} from "@/lib/utils";
import JobNotFound from "@/components/ui/job-not-found";
import { useI18n } from "@/lib/i18n";

const JobDetailsClient = () => {
  const { t, isRTL } = useI18n();
  const { id }: { id: string } = useParams();
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
          reset();
        },
      }
    );
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success(t("jobDetails.linkCopied"));
    } catch {
      toast.error(t("jobDetails.linkCopyFailed"));
    }
  };

  if (useJobById.isLoading) {
    return <SpinnerCustom />;
  }

  if (useJobById.isError) {
    return <JobNotFound />;
  }

  const daysUntilExpiration = getDaysUntilExpiration(job?.deadline);

  const isExpiringSoon = daysUntilExpiration <= 7;
  const isExpired = daysUntilExpiration < 0;

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href={"/jobs"}
            className={`flex items-center ${
              isRTL ? "flex-row-reverse gap-2" : "gap-2"
            } text-gray-600 hover:text-[#0066FF] mb-6 transition-colors`}
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            {t("jobDetails.backToJobs")}
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
                      <div
                        className={`flex flex-wrap ${
                          isRTL ? "flex-row-reverse" : ""
                        } gap-2 mb-4`}
                      >
                        {getDaysSincePosted(job?.createdAt) === "Today" && (
                          <span
                            className={`px-3 py-1 bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white text-sm font-semibold rounded-full flex items-center ${
                              isRTL ? "flex-row-reverse gap-1" : "gap-1"
                            }`}
                          >
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            {t("jobDetails.newToday")}
                          </span>
                        )}
                        {isExpiringSoon && !isExpired && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full">
                            {t("jobDetails.expiringSoon")}
                          </span>
                        )}
                        {isExpired && (
                          <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                            {t("jobDetails.expired")}
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
                      onClick={handleShare}
                      className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                    >
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
                      <p className="text-sm text-gray-500">
                        {t("jobDetails.posted")}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {getDaysSincePosted(job?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${
                      isRTL ? "flex-row-reverse gap-3" : "gap-3"
                    }`}
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#0066FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("jobDetails.announced")}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(job?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${
                      isRTL ? "flex-row-reverse gap-3" : "gap-3"
                    }`}
                  >
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
                      <p className="text-sm text-gray-500">
                        {t("jobDetails.expires")}
                      </p>
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
                          ? t("jobDetails.expired")
                          : t("jobDetails.inDays").replace(
                              "{days}",
                              daysUntilExpiration.toString()
                            )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2
                  className={`text-2xl font-bold text-gray-900 mb-4 flex items-center ${
                    isRTL ? "flex-row-reverse gap-2" : "gap-2"
                  }`}
                >
                  <FileText className="w-6 h-6 text-[#0066FF]" />
                  {t("jobDetails.jobDescription")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {job?.description}
                </p>

                <h3
                  className={`text-xl font-bold text-gray-900 mb-3 flex items-center ${
                    isRTL ? "flex-row-reverse gap-2" : "gap-2"
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-[#0066FF]" />
                  {t("jobDetails.requirements")}
                </h3>
                <ul
                  className={`space-y-2 text-gray-600 mb-6 ${
                    isRTL ? "list-none" : ""
                  }`}
                >
                  <li
                    className={`flex items-start ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Bachelor degree in relevant field or equivalent experience
                  </li>
                  <li
                    className={`flex items-start ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Strong communication and problem-solving skills
                  </li>
                  <li
                    className={`flex items-start ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Ability to work independently and as part of a team
                  </li>
                  <li
                    className={`flex items-start ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Proficiency in relevant tools and technologies
                  </li>
                </ul>

                <h3
                  className={`text-xl font-bold text-gray-900 mb-3 flex items-center ${
                    isRTL ? "flex-row-reverse gap-2" : "gap-2"
                  }`}
                >
                  <Award className="w-5 h-5 text-[#0066FF]" />
                  {t("jobDetails.benefits")}
                </h3>
                <ul
                  className={`space-y-2 text-gray-600 ${
                    isRTL ? "list-none" : ""
                  }`}
                >
                  <li
                    className={`flex items-start ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Competitive salary package
                  </li>
                  <li
                    className={`flex items-start ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Health insurance coverage
                  </li>
                  <li
                    className={`flex items-start ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Professional development opportunities
                  </li>
                  <li
                    className={`flex items-start ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full mt-2"></span>
                    Flexible working arrangements
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24">
                {useJobApply.isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t("jobDetails.applicationSent")}
                    </h3>
                    <p className="text-gray-600">
                      {t("jobDetails.applicationSentMessage")}
                    </p>
                  </div>
                ) : isExpired ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t("jobDetails.jobExpired")}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t("jobDetails.jobExpiredMessage")}
                    </p>
                    <Link
                      href={"/jobs"}
                      className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                      {t("jobDetails.browseActiveJobs")}
                    </Link>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {t("jobDetails.applyForJob")}
                    </h3>
                    <form
                      onSubmit={handleSubmit(onApplicationSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          {t("jobDetails.fullName")} *
                        </label>
                        <input
                          type="text"
                          {...register("fullName", {
                            required: t("common.nameRequired"),
                          })}
                          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all"
                          placeholder="Wadan Samun"
                          dir={isRTL ? "rtl" : "ltr"}
                        />
                        {errors?.fullName?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors?.fullName?.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          {t("jobDetails.email")} *
                        </label>
                        <input
                          type="email"
                          {...register("email", {
                            required: t("common.emailRequired"),
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: t("common.invalidEmail"),
                            },
                          })}
                          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all"
                          placeholder="wadan@marghai.com"
                          dir={isRTL ? "rtl" : "ltr"}
                        />
                        {errors.email?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors?.email?.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          {t("jobDetails.phone")} *
                        </label>
                        <input
                          type="tel"
                          {...register("phone", {
                            required: t("common.phoneRequired"),
                          })}
                          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all"
                          placeholder="+93 899 799 799"
                          dir={isRTL ? "rtl" : "ltr"}
                        />
                        {errors?.phone?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.phone.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          {t("jobDetails.coverLetter")} *
                        </label>
                        <textarea
                          {...register("coverLetter", {
                            required:
                              t("jobDetails.coverLetter") +
                              " " +
                              t("common.required"),
                            minLength: {
                              value: 50,
                              message: t("common.minimumCharacters"),
                            },
                          })}
                          rows={4}
                          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all resize-none"
                          placeholder={t("jobDetails.coverLetterPlaceholder")}
                          dir={isRTL ? "rtl" : "ltr"}
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
                        className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center ${
                          isRTL ? "flex-row-reverse" : ""
                        } justify-center gap-2 ${
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
                            {t("jobDetails.submitting")}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t("jobDetails.submitApplication")}
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              <section className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t("jobDetails.aboutCompany")}
                </h3>
                <div className="space-y-3">
                  <div
                    className={`flex items-center ${
                      isRTL ? "flex-row-reverse gap-3" : "gap-3"
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#0066FF]" />
                    <span className="text-gray-600">{job?.company}</span>
                  </div>
                  <div
                    className={`flex items-center ${
                      isRTL ? "flex-row-reverse gap-3" : "gap-3"
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-[#0066FF]" />
                    <span className="text-gray-600">{job?.location}</span>
                  </div>
                  <div
                    className={`flex items-center ${
                      isRTL ? "flex-row-reverse gap-3" : "gap-3"
                    }`}
                  >
                    <Users className="w-5 h-5 text-[#0066FF]" />
                    <span className="text-gray-600">
                      50-200 {t("jobDetails.employees")}
                    </span>
                  </div>
                  <div
                    className={`flex items-center ${
                      isRTL ? "flex-row-reverse gap-3" : "gap-3"
                    }`}
                  >
                    <TrendingUp className="w-5 h-5 text-[#0066FF]" />
                    <span className="text-gray-600">
                      {t("jobDetails.growingRapidly")}
                    </span>
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

export default JobDetailsClient;
