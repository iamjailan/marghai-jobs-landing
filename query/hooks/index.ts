import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../functions";

export const useGetAllJobs = ({ filter }: { filter: string }) => {
  return useQuery({
    queryKey: ["jobs", filter],
    queryFn: () => getAllJobs({ filter }),
    staleTime: 60 * 60 * 1000,
  });
};
