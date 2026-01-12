"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Sparkles,
  Calendar,
} from "lucide-react";
import { CreateJobInput } from "@/query/functions";
import {
  useCreateJob,
  useCustomerMe,
  useGetAllJobs,
  useGetCustomerJob,
} from "@/query/hooks";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";

const CreateJobPage = () => {
  const { t, isRTL } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const useJob = useCreateJob();
  const router = useRouter();
  const useGetJob = useGetAllJobs({ filter: "" });
  const useGetMe = useCustomerMe();
  const customerData = useGetMe?.data?.data;
  const useCustomerJobs = useGetCustomerJob({ filter: "" });

  const onSubmit = async (data: CreateJobInput) => {
    const newJob = {
      title: data.title,
      company: customerData?.company,
      location: data.location,
      type: data.type,
      salary: data.salary,
      deadline: data.deadline,
      description: data.description,
    };

    useJob.mutate(newJob, {
      onSuccess: (data) => {
        reset();
        useGetJob.refetch();
        useCustomerJobs.refetch();
        router.push(`/jobs/${data?.data?.id}`);
      },
    });
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("postJob.title")}{" "}
              <span className="bg-linear-to-r from-[#00cbff] to-[#0066FF] bg-clip-text text-transparent">
                {t("postJob.newJob")}
              </span>
            </h1>
            <p className="text-xl text-gray-600">{t("postJob.subtitle")}</p>
          </div>

          <form
            // @ts-expect-error ts issue
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          >
            <div className="mb-6">
              <label
                className={`flex items-center ${
                  isRTL ? "flex-row-reverse gap-2" : "gap-2"
                } text-gray-700 font-semibold mb-2`}
              >
                <Briefcase className="w-5 h-5 text-[#0066FF]" />
                {t("postJob.jobTitle")} *
              </label>
              <input
                type="text"
                {...register("title", {
                  required: t("postJob.jobTitleRequired"),
                  minLength: {
                    value: 3,
                    message: t("postJob.jobTitleMinLength"),
                  },
                  maxLength: {
                    value: 100,
                    message: t("postJob.jobTitleMaxLength"),
                  },
                })}
                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                  errors.jobTitle
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#0066FF]"
                }`}
                placeholder={t("postJob.jobTitlePlaceholder")}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {errors.jobTitle &&
                typeof errors.jobTitle.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jobTitle.message}
                  </p>
                )}
            </div>

            <div className="mb-6">
              <label
                className={`flex items-center ${
                  isRTL ? "flex-row-reverse gap-2" : "gap-2"
                } text-gray-700 font-semibold mb-2`}
              >
                <MapPin className="w-5 h-5 text-[#0066FF]" />
                {t("postJob.location")} *
              </label>
              <select
                {...register("location", {
                  required: t("postJob.locationRequired"),
                })}
                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                  errors.location
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#0066FF]"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <option value="">{t("postJob.selectLocation")}</option>
                <option value="Kabul">Kabul</option>
                <option value="Herat">Herat</option>
                <option value="Mazar-i-Sharif">Mazar-i-Sharif</option>
                <option value="Kandahar">Kandahar</option>
                <option value="Jalalabad">Jalalabad</option>
                <option value="Wardak">Wardak</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.location &&
                typeof errors.location.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className={`flex items-center ${
                    isRTL ? "flex-row-reverse gap-2" : "gap-2"
                  } text-gray-700 font-semibold mb-2`}
                >
                  <Clock className="w-5 h-5 text-[#0066FF]" />
                  {t("postJob.jobType")} *
                </label>
                <select
                  {...register("type", {
                    required: t("postJob.jobTypeRequired"),
                  })}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                    errors.jobType
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#0066FF]"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <option value="">{t("postJob.selectType")}</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
                {errors.jobType &&
                  typeof errors.jobType.message === "string" && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.jobType.message}
                    </p>
                  )}
              </div>

              <div>
                <label
                  className={`flex items-center ${
                    isRTL ? "flex-row-reverse gap-2" : "gap-2"
                  } text-gray-700 font-semibold mb-2`}
                >
                  <DollarSign className="w-5 h-5 text-[#0066FF]" />
                  {t("postJob.salary")} *
                </label>
                <input
                  type="text"
                  {...register("salary", {
                    required: t("postJob.salaryRequired"),
                    pattern: {
                      value: /^[0-9,\-\s]+AFN$|^Competitive$/i,
                      message: t("postJob.invalidSalary"),
                    },
                  })}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                    errors.salary
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#0066FF]"
                  }`}
                  placeholder={t("postJob.salaryPlaceholder")}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.salary && typeof errors.salary.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salary.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                className={`flex items-center ${
                  isRTL ? "flex-row-reverse gap-2" : "gap-2"
                } text-gray-700 font-semibold mb-2`}
              >
                <Calendar className="w-5 h-5 text-[#0066FF]" />
                {t("postJob.applicationDeadline")} *
              </label>
              <input
                type="date"
                {...register("deadline", {
                  required: t("postJob.deadlineRequired"),
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (selectedDate < today) {
                      return t("postJob.deadlineFuture");
                    }
                    return true;
                  },
                })}
                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                  errors.deadline
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#0066FF]"
                }`}
              />
              {errors.deadline &&
                typeof errors.deadline.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.deadline.message}
                  </p>
                )}
            </div>

            <div className="mb-8">
              <label
                className={`flex items-center ${
                  isRTL ? "flex-row-reverse gap-2" : "gap-2"
                } text-gray-700 font-semibold mb-2`}
              >
                <FileText className="w-5 h-5 text-[#0066FF]" />
                {t("postJob.jobDescription")} *
              </label>
              <textarea
                {...register("description", {
                  required: t("postJob.descriptionRequired"),
                  minLength: {
                    value: 50,
                    message: t("postJob.descriptionMinLength"),
                  },
                  maxLength: {
                    value: 1000,
                    message: t("postJob.descriptionMaxLength"),
                  },
                })}
                rows={6}
                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all resize-none ${
                  errors.description
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#0066FF]"
                }`}
                placeholder={t("postJob.descriptionPlaceholder")}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {errors.description &&
                typeof errors.description.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={useJob.isPending}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                useJob.isPending
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#00cbff] to-[#0066FF] text-white hover:shadow-2xl transform hover:-translate-y-1"
              }`}
            >
              {useJob.isPending ? (
                <span
                  className={`flex items-center ${
                    isRTL ? "flex-row-reverse" : ""
                  } justify-center gap-2`}
                >
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
                  {t("postJob.postingJob")}
                </span>
              ) : (
                t("postJob.postJob")
              )}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              {t("postJob.requiredFields")}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateJobPage;
