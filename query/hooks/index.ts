import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAccount,
  createJob,
  deleteJob,
  getAllJobs,
  getCustomer,
  getCustomerJobs,
  loginAccount,
  updateCustomer,
} from "../functions";

export const useGetAllJobs = ({ filter }: { filter: string }) => {
  return useQuery({
    queryKey: ["jobs", filter],
    queryFn: () => getAllJobs({ filter }),
    staleTime: 60 * 60 * 1000,
  });
};

export const useGetCustomerJob = ({ filter }: { filter: string }) => {
  return useQuery({
    queryKey: ["customer_jobs", filter],
    queryFn: () => getCustomerJobs({ filter }),
    staleTime: 60 * 60 * 1000,
  });
};

export const useCustomerMe = () => {
  return useQuery({
    queryKey: ["me_get"],
    queryFn: () => getCustomer(),
    staleTime: 60 * 60 * 1000,
  });
};

export const useCreateAccount = () => {
  return useMutation({ mutationFn: createAccount });
};

export const useLoginAccount = () => {
  return useMutation({ mutationFn: loginAccount });
};

export const useCreateJob = () => {
  return useMutation({ mutationFn: createJob });
};

export const useUpdateCustomer = () => {
  return useMutation({ mutationFn: updateCustomer });
};
export const useDeleteJob = () => {
  return useMutation({ mutationFn: deleteJob });
};
