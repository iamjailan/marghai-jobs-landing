import { apiRequest } from "@/lib/request";

export interface CreateJobInput {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: number | string;
  deadline: Date | string;
  description: string;
}

export const getAllJobs = async ({ filter }: { filter: string }) => {
  const data = await apiRequest({
    url: `customer/jobs?${filter}`,
  });

  return data;
};

export const createAccount = async (body: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company: string;
}) => {
  const data = await apiRequest({
    url: "customer/auth/register",
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
};

export const loginAccount = async (body: {
  email: string;
  password: string;
}) => {
  const data = await apiRequest({
    url: "customer/auth/login",
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
};

export const createJob = async (body: CreateJobInput) => {
  const data = await apiRequest({
    url: "customer/jobs",
    method: "POST",
    body: JSON.stringify(body),
    isAuth: true,
  });

  return data;
};

export const getCustomerJobs = async ({ filter }: { filter: string }) => {
  const data = await apiRequest({
    url: `customer/jobs/me?${filter}`,
    isAuth: true,
  });

  return data;
};

export const getCustomer = async () => {
  const data = await apiRequest({
    url: "customer/me",
    isAuth: true,
  });

  return data;
};

export const updateCustomer = async (body: {
  first_name: string;
  last_name: string;
  company: string;
  location: string;
  phone: string;
}) => {
  const data = await apiRequest({
    url: "customer/me",
    isAuth: true,
    method: "PUT",
    body: JSON.stringify(body),
  });

  return data;
};

export const deleteJob = async (id: string) => {
  const data = await apiRequest({
    url: `customer/jobs/id/${id}`,
    isAuth: true,
    method: "DELETE",
  });

  return data;
};

export const getJobById = async (id: string, showError?: boolean) => {
  const data = await apiRequest({
    url: `customer/jobs/id/${id}`,
    showError,
  });

  return data;
};

export const updateJobById = async (id: string, body?: any) => {
  const data = await apiRequest({
    url: `customer/jobs/${id}`,
    body: body ? JSON.stringify(body) : undefined,
    isAuth: true,
    method: "PUT",
  });

  return data;
};

export const applyToJob = async ({ id, body }: { id: string; body: any }) => {
  const data = await apiRequest({
    url: `customer/jobs/id/${id}/apply`,
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
};

export const getJobApplicants = async (id: string) => {
  const data = await apiRequest({
    url: `customer/jobs/id/${id}/applicants`,
    isAuth: true,
  });

  return data;
};

export const getTotalData = async () => {
  const data = await apiRequest({
    url: "customer/jobs/statistics",
  });

  return data;
};
