"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Edit2,
  Save,
  Camera,
  Trash2,
  Calendar,
} from "lucide-react";
import {
  useCustomerMe,
  useDeleteJob,
  useGetCustomerJob,
  useUpdateCustomer,
  useUpdateJob,
} from "@/query/hooks";
import Image from "next/image";
import Link from "next/link";
import { Spinner, SpinnerCustom } from "@/components/loading";
import { useI18n } from "@/lib/i18n";

type ProfileForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  location: string;
  company: string;
};

const ProfilePage = () => {
  const { t, isRTL } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const useGetMe = useCustomerMe();
  const useUpdateMe = useUpdateCustomer();
  const useCustomerJobs = useGetCustomerJob({ filter: "" });
  const useDeleteJobMe = useDeleteJob();
  const useUpdateJobMe = useUpdateJob();
  const userJobs = useCustomerJobs?.data?.data;
  const customerData = useGetMe?.data?.data;
  const customerJobsCount = useCustomerJobs?.data?.count;

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset,
  } = useForm<ProfileForm>({
    defaultValues: {
      email: customerData?.email,
      phone: customerData?.phone,
      location: customerData?.location,
      company: customerData?.company,
    },
  });

  useEffect(() => {
    if (customerData) {
      reset({
        email: customerData?.email,
        phone: customerData?.phone,
        location: customerData?.location,
        company: customerData?.company,
      });
    }
  }, [customerData, reset]);

  const {
    register: registerJob,
    handleSubmit: handleSubmitJob,
    reset: resetJob,
    setValue: setJobValue,
  } = useForm();

  const handleProfileSubmit = async (data: ProfileForm) => {
    useUpdateMe.mutate(
      {
        first_name: data?.company,
        last_name: data?.company,
        company: data.company,
        location: data.location,
        phone: data.phone,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          useGetMe.refetch();
        },
      }
    );
  };

  const handleJobEdit = (job: any) => {
    setEditingJobId(job.id);
    setJobValue("jobTitle", job.title);
    setJobValue("location", job.location);
    setJobValue("jobType", job.type);
    setJobValue("salary", job.salary);
    setJobValue("description", job.description);
    // Format deadline for date input (YYYY-MM-DD)
    if (job.deadline) {
      const deadlineDate = new Date(job.deadline);
      const formattedDeadline = deadlineDate.toISOString().split("T")[0];
      setJobValue("deadline", formattedDeadline);
    }
  };

  const handleJobUpdate = async (data: any) => {
    if (!editingJobId) return;

    const updateData = {
      title: data.jobTitle,
      location: data.location,
      type: data.jobType,
      salary: data.salary,
      deadline: data.deadline,
      description: data.description,
    };

    useUpdateJobMe.mutate(
      {
        id: editingJobId,
        body: updateData,
      },
      {
        onSuccess: () => {
          setEditingJobId(null);
          resetJob();
          useCustomerJobs.refetch();
        },
      }
    );
  };

  const handleImageChange = (e: { target: { files: string[] } }) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const deleteJob = (id: string) => {
    useDeleteJobMe.mutate(id, {
      onSuccess: () => {
        useCustomerJobs.refetch();
      },
    });
  };

  if (useGetMe.isLoading) {
    return <SpinnerCustom />;
  }

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Main Content */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
            {/* Header Banner */}
            <div className="h-32 bg-linear-to-r from-[#00cbff] to-[#0066FF]"></div>

            <div className="px-8 pb-8">
              {/* Profile Image */}
              <div
                className={`flex flex-col md:flex-row items-start md:items-end ${
                  isRTL ? "flex-row-reverse" : ""
                } gap-6 -mt-16 mb-8`}
              >
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-linear-to-br from-[#00cbff] to-[#0066FF] flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        height={40}
                        width={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <label
                    className={`absolute bottom-0 ${
                      isRTL ? "left-0" : "right-0"
                    } bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors`}
                  >
                    <Camera className="w-5 h-5 text-[#0066FF]" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      // @ts-expect-error ts issue
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {customerData?.company}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {t("profile.jobPoster")} • {t("profile.techRecruiter")}
                  </p>
                  <div
                    className={`flex flex-wrap ${
                      isRTL ? "flex-row-reverse" : ""
                    } gap-4 text-sm text-gray-600`}
                  >
                    <div
                      className={`flex items-center ${
                        isRTL ? "flex-row-reverse gap-2" : "gap-2"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      {customerData?.email}
                    </div>
                    <div
                      className={`flex items-center ${
                        isRTL ? "flex-row-reverse gap-2" : "gap-2"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      {customerData?.location}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center ${
                    isRTL ? "flex-row-reverse gap-2" : "gap-2"
                  } px-6 py-3 bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white rounded-xl hover:shadow-lg transition-all`}
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? t("profile.cancel") : t("profile.editProfile")}
                </button>
              </div>

              {isEditing && (
                <form
                  onSubmit={handleSubmitProfile(handleProfileSubmit)}
                  className="border-t pt-8 mt-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {t("profile.editProfileInformation")}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`flex items-center ${
                          isRTL ? "flex-row-reverse gap-2" : "gap-2"
                        } text-gray-700 font-semibold mb-2`}
                      >
                        <Mail className="w-4 h-4 text-[#0066FF]" />
                        {t("login.email")} *
                      </label>
                      <input
                        type="email"
                        disabled
                        {...registerProfile("email", {
                          required: t("login.emailRequired"),
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: t("login.invalidEmail"),
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                          profileErrors.email
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#0066FF]"
                        }`}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                      {profileErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileErrors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`flex items-center ${
                          isRTL ? "flex-row-reverse gap-2" : "gap-2"
                        } text-gray-700 font-semibold mb-2`}
                      >
                        <Phone className="w-4 h-4 text-[#0066FF]" />
                        {t("profile.phone")} *
                      </label>
                      <input
                        type="tel"
                        {...registerProfile("phone", {
                          required: t("profile.phoneRequired"),
                          pattern: {
                            value: /^\+?[\d\s-]+$/,
                            message: t("profile.invalidPhone"),
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                          profileErrors.phone
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#0066FF]"
                        }`}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                      {profileErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileErrors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`flex items-center ${
                          isRTL ? "flex-row-reverse gap-2" : "gap-2"
                        } text-gray-700 font-semibold mb-2`}
                      >
                        <MapPin className="w-4 h-4 text-[#0066FF]" />
                        {t("postJob.location")} *
                      </label>
                      <select
                        {...registerProfile("location", {
                          required: t("profile.locationRequired"),
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                          profileErrors.location
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#0066FF]"
                        }`}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        <option value="Kabul">Kabul</option>
                        <option value="Herat">Herat</option>
                        <option value="Mazar-i-Sharif">Mazar-i-Sharif</option>
                        <option value="Kandahar">Kandahar</option>
                        <option value="Jalalabad">Jalalabad</option>
                        <option value="Wardak">Wardak</option>
                        <option value="Kunar">Kunar</option>
                      </select>
                      {profileErrors.location && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileErrors.location.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label
                        className={`flex items-center ${
                          isRTL ? "flex-row-reverse gap-2" : "gap-2"
                        } text-gray-700 font-semibold mb-2`}
                      >
                        <Building className="w-4 h-4 text-[#0066FF]" />
                        {t("login.company")} *
                      </label>
                      <input
                        type="text"
                        {...registerProfile("company", {
                          required: t("profile.companyRequired"),
                        })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all"
                        dir={isRTL ? "rtl" : "ltr"}
                      />

                      {profileErrors.company && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileErrors.company.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={useUpdateMe.isPending}
                    className={`mt-6 flex items-center ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    } px-8 py-3 rounded-xl font-semibold transition-all ${
                      useUpdateMe.isPending
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white hover:shadow-lg"
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    {useUpdateMe.isPending
                      ? t("profile.saving")
                      : t("profile.saveChanges")}
                  </button>
                </form>
              )}
            </div>
          </div>

          {useCustomerJobs.isLoading || useCustomerJobs.isPending ? (
            <SpinnerCustom />
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {userJobs?.length > 0 && (
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("profile.yourPostedJobs")} ({customerJobsCount})
                </h2>
              )}

              {!userJobs?.length ? (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />

                  <p className="text-gray-500 text-lg mb-6">
                    {t("profile.noJobsPosted")}
                  </p>

                  <Link
                    href={"/post"}
                    className={`inline-flex items-center ${
                      isRTL ? "flex-row-reverse gap-2" : "gap-2"
                    } px-6 py-3 bg-blue-600 text-white rounded-lg
               hover:bg-blue-700 transition-colors`}
                  >
                    <Briefcase className="w-5 h-5" />
                    {t("profile.postAJob")}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userJobs?.map((job: any) => (
                    <div
                      key={job.id}
                      className="border-2 border-gray-100 rounded-xl p-6 hover:border-[#00cbff] transition-all"
                    >
                      {editingJobId === job.id ? (
                        // Edit Form
                        <form
                          onSubmit={handleSubmitJob(handleJobUpdate)}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                {t("profile.jobTitle")} *
                              </label>
                              <input
                                type="text"
                                {...registerJob("jobTitle", {
                                  required: t("profile.required"),
                                })}
                                className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                                dir={isRTL ? "rtl" : "ltr"}
                              />
                            </div>

                            <div>
                              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                {t("postJob.location")} *
                              </label>
                              <select
                                {...registerJob("location", {
                                  required: t("profile.required"),
                                })}
                                className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <option value="Kabul">Kabul</option>
                                <option value="Herat">Herat</option>
                                <option value="Mazar-i-Sharif">
                                  Mazar-i-Sharif
                                </option>
                                <option value="Kandahar">Kandahar</option>
                                <option value="Jalalabad">Jalalabad</option>
                                <option value="Remote">Remote</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                {t("postJob.jobType")} *
                              </label>
                              <select
                                {...registerJob("jobType", {
                                  required: t("profile.required"),
                                })}
                                className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                {t("postJob.salary")} *
                              </label>
                              <input
                                type="text"
                                {...registerJob("salary", {
                                  required: t("profile.required"),
                                })}
                                className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                                dir={isRTL ? "rtl" : "ltr"}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                {t("postJob.applicationDeadline")} *
                              </label>
                              <input
                                type="date"
                                {...registerJob("deadline", {
                                  required: t("profile.required"),
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
                                className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                {t("postJob.jobDescription")} *
                              </label>
                              <textarea
                                {...registerJob("description", {
                                  required: t("profile.required"),
                                })}
                                rows={3}
                                className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF] resize-none"
                                dir={isRTL ? "rtl" : "ltr"}
                              />
                            </div>
                          </div>
                          <div
                            className={`flex ${
                              isRTL ? "flex-row-reverse" : ""
                            } gap-3`}
                          >
                            <button
                              type="submit"
                              disabled={useUpdateJobMe.isPending}
                              className={`px-6 py-2 rounded-lg transition-all ${
                                useUpdateJobMe.isPending
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white hover:shadow-lg"
                              }`}
                            >
                              {useUpdateJobMe.isPending
                                ? t("profile.saving")
                                : t("profile.save")}
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingJobId(null)}
                              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                            >
                              {t("profile.cancel")}
                            </button>
                          </div>
                        </form>
                      ) : (
                        // Display Mode
                        <>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-linear-to-br from-[#00cbff] to-[#0066FF] rounded-lg flex items-center justify-center text-white font-bold">
                                {job.logo}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {job.title}
                                </h3>
                                <p className="text-gray-600">{job.company}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleJobEdit(job)}
                                disabled={useUpdateJobMe.isPending}
                                className="p-2 text-[#0066FF] cursor-pointer disabled:cursor-not-allowed hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => deleteJob(job?.id)}
                                disabled={useDeleteJobMe.isPending}
                                className="p-2 text-red-500 cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-red-50 rounded-lg transition-colors"
                              >
                                {useDeleteJobMe.isPending ? (
                                  <Spinner className="h-[30px] w-[30px]" />
                                ) : (
                                  <Trash2 className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div
                            className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-4`}
                          >
                            <div
                              className={`flex items-center ${
                                isRTL ? "flex-row-reverse gap-2" : "gap-2"
                              } text-sm text-gray-600`}
                            >
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                            <div
                              className={`flex items-center ${
                                isRTL ? "flex-row-reverse gap-2" : "gap-2"
                              } text-sm text-gray-600`}
                            >
                              <Briefcase className="w-4 h-4" />
                              {job.type}
                            </div>
                            <div
                              className={`flex items-center ${
                                isRTL ? "flex-row-reverse gap-2" : "gap-2"
                              } text-sm text-gray-600`}
                            >
                              <Calendar className="w-4 h-4" />
                              {job.deadline
                                ? formatDate(job.deadline)
                                : t("profile.nA")}
                            </div>
                            <div className="text-sm font-semibold text-[#0066FF]">
                              {job.salary}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {job.description}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
