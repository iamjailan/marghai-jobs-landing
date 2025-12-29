import { apiRequest } from "@/lib/request";

export const getAllJobs = async ({ filter }: { filter: string }) => {
  const data = await apiRequest({
    url: `customer/jobs?${filter}`,
  });

  return data;
};
