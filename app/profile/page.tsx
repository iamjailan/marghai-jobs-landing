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
} from "@/query/hooks";
import Image from "next/image";
import Link from "next/link";

type ProfileForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  location: string;
  company: string;
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const useGetMe = useCustomerMe();
  const useUpdateMe = useUpdateCustomer();
  const useCustomerJobs = useGetCustomerJob({ filter: "" });
  const useDeleteJobMe = useDeleteJob();
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
      first_name: customerData?.first_name,
      last_name: customerData?.last_name,
      email: customerData?.email,
      phone: customerData?.phone,
      location: customerData?.location,
      company: customerData?.last_name,
    },
  });

  useEffect(() => {
    if (customerData) {
      reset({
        first_name: customerData?.first_name,
        last_name: customerData?.last_name,
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
        first_name: data?.first_name,
        last_name: data?.last_name,
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
    setJobValue("companyName", job.company);
    setJobValue("location", job.location);
    setJobValue("jobType", job.type);
    setJobValue("salary", job.salary);
    setJobValue("description", job.description);
  };

  const handleJobUpdate = async (data: any) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedJob = {
      id: editingJobId,
      title: data.jobTitle,
      company: data.companyName,
      location: data.location,
      type: data.jobType,
      salary: data.salary,
      description: data.description,
      logo: data.companyName.substring(0, 2).toUpperCase(),
    };

    setIsSubmitting(false);
    setEditingJobId(null);
    resetJob();
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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Main Content */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
            {/* Header Banner */}
            <div className="h-32 bg-linear-to-r from-[#00cbff] to-[#0066FF]"></div>

            <div className="px-8 pb-8">
              {/* Profile Image */}
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-linear-to-br from-[#00cbff] to-[#0066FF] flex items-center justify-center overflow-hidden">
                    {customerData?.profile_picture ? (
                      <Image
                        src={customerData?.profile_picture}
                        alt="Profile"
                        height={40}
                        width={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
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
                    {customerData?.first_name + " " + customerData?.last_name}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Job Poster • Tech Recruiter
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {customerData?.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {customerData?.location}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {isEditing && (
                <form
                  onSubmit={handleSubmitProfile(handleProfileSubmit)}
                  className="border-t pt-8 mt-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Edit Profile Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <User className="w-4 h-4 text-[#0066FF]" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...registerProfile("first_name", {
                          required: "first name is required",
                          minLength: {
                            value: 3,
                            message: "first name must be at least 3 characters",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                          profileErrors.first_name
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#0066FF]"
                        }`}
                      />
                      {profileErrors.first_name?.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileErrors.first_name.message}
                        </p>
                      )}
                    </section>

                    <section>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <User className="w-4 h-4 text-[#0066FF]" />
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...registerProfile("last_name", {
                          required: "last name is required",
                          minLength: {
                            value: 3,
                            message: "last name must be at least 3 characters",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                          profileErrors.first_name
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#0066FF]"
                        }`}
                      />
                      {profileErrors.last_name && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileErrors.last_name.message}
                        </p>
                      )}
                    </section>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <Mail className="w-4 h-4 text-[#0066FF]" />
                        Email *
                      </label>
                      <input
                        type="email"
                        disabled
                        {...registerProfile("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                          profileErrors.email
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#0066FF]"
                        }`}
                      />
                      {profileErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileErrors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <Phone className="w-4 h-4 text-[#0066FF]" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        {...registerProfile("phone", {
                          required: "Phone is required",
                          pattern: {
                            value: /^\+?[\d\s-]+$/,
                            message: "Invalid phone number",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                          profileErrors.phone
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#0066FF]"
                        }`}
                      />
                      {profileErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileErrors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <MapPin className="w-4 h-4 text-[#0066FF]" />
                        Location *
                      </label>
                      <select
                        {...registerProfile("location", {
                          required: "Location is required",
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                          profileErrors.location
                            ? "border-red-400"
                            : "border-gray-200 focus:border-[#0066FF]"
                        }`}
                      >
                        <option value="Kabul">Kabul</option>
                        <option value="Herat">Herat</option>
                        <option value="Mazar-i-Sharif">Mazar-i-Sharif</option>
                        <option value="Kandahar">Kandahar</option>
                        <option value="Jalalabad">Jalalabad</option>
                        <option value="Wardak">Wardak</option>
                        <option value="Kunar">Kunar</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <Building className="w-4 h-4 text-[#0066FF]" />
                        Company
                      </label>
                      <input
                        type="text"
                        {...registerProfile("company")}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#0066FF] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={useUpdateMe.isPending}
                    className={`mt-6 flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                      useUpdateMe.isPending
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white hover:shadow-lg"
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    {useUpdateMe.isPending ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Posted Jobs ({customerJobsCount})
            </h2>

            {userJobs?.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />

                <p className="text-gray-500 text-lg mb-6">
                  You have not posted any jobs yet
                </p>

                <Link
                  href={"/post"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg
               hover:bg-blue-700 transition-colors"
                >
                  <Briefcase className="w-5 h-5" />
                  Post a Job
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
                              Job Title *
                            </label>
                            <input
                              type="text"
                              {...registerJob("jobTitle", {
                                required: "Required",
                              })}
                              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1 block">
                              Company *
                            </label>
                            <input
                              type="text"
                              {...registerJob("companyName", {
                                required: "Required",
                              })}
                              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1 block">
                              Location *
                            </label>
                            <select
                              {...registerJob("location", {
                                required: "Required",
                              })}
                              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
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
                              Job Type *
                            </label>
                            <select
                              {...registerJob("jobType", {
                                required: "Required",
                              })}
                              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                            >
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Freelance">Freelance</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1 block">
                              Salary *
                            </label>
                            <input
                              type="text"
                              {...registerJob("salary", {
                                required: "Required",
                              })}
                              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF]"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1 block">
                              Description *
                            </label>
                            <textarea
                              {...registerJob("description", {
                                required: "Required",
                              })}
                              rows={3}
                              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#0066FF] resize-none"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white rounded-lg hover:shadow-lg transition-all"
                          >
                            {isSubmitting ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingJobId(null)}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                          >
                            Cancel
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
                              disabled
                              className="p-2 text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteJob(job?.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {formatDate(job.createdAt)}
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
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
