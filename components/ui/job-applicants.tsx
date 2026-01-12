"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, FileText, ArrowLeft } from "lucide-react";
import { useGetJobApplicants } from "@/query/hooks";
import { SpinnerCustom } from "@/components/loading";
import { useI18n } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

const JobApplicantsClient = () => {
  const { t, isRTL } = useI18n();
  const { id }: { id?: string } = useParams();
  const router = useRouter();

  const useApplicants = useGetJobApplicants(id || "");
  const applicants = useApplicants?.data?.data || [];

  if (useApplicants.isLoading) return <SpinnerCustom />;

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className={`flex items-center ${
                isRTL ? "flex-row-reverse gap-2" : "gap-2"
              } text-gray-600 hover:text-[#0066FF] transition-colors`}
            >
              <ArrowLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              {t("applicants.backToProfile") || t("jobDetails.backToJobs")}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t("applicants.title") || "Applicants"}
            </h1>

            {!applicants?.length ? (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {t("applicants.noApplicants") || "No applicants yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applicants.map((a: any) => (
                  <div
                    key={a.id}
                    className="border-2 border-gray-100 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-lg flex items-center justify-center text-white font-bold">
                          {a.fullName ? a.fullName.charAt(0) : "A"}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {a.fullName || a.name || "—"}
                          </h3>
                          <p className="text-gray-600">
                            {a.position || a.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {a.createdAt ? formatDate(a.createdAt) : ""}
                      </div>
                    </div>

                    <div
                      className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-600`}
                    >
                      <div
                        className={`flex items-center ${
                          isRTL ? "flex-row-reverse gap-2" : "gap-2"
                        }`}
                      >
                        <Mail className="w-4 h-4" />
                        {a.email || t("applicants.noEmail")}
                      </div>
                      <div
                        className={`flex items-center ${
                          isRTL ? "flex-row-reverse gap-2" : "gap-2"
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        {a.phone || t("applicants.noPhone")}
                      </div>
                      <div className="text-right md:text-left">
                        {a.resume ? (
                          <a
                            href={a.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-[#0066FF] hover:underline"
                          >
                            <FileText className="w-4 h-4" />{" "}
                            {t("applicants.viewResume") || "View Resume"}
                          </a>
                        ) : (
                          <span className="text-gray-400">
                            {t("applicants.noResume") || "No resume"}
                          </span>
                        )}
                      </div>
                    </div>

                    {a.coverLetter && (
                      <div className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {t("applicants.coverLetter") || "Cover Letter"}
                        </h4>
                        <p className="text-sm leading-relaxed">
                          {a.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobApplicantsClient;
