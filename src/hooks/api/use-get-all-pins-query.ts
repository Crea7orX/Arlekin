import { axiosInstance } from "@/lib/axios";
import type { PinResponse } from "@/lib/validation/pin";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { type AxiosError } from "axios";

export function useGetAllPinsQuery({
  ...options
}: Partial<UseQueryOptions<PinResponse[], AxiosError>>) {
  return useQuery<PinResponse[], AxiosError>({
    ...options,
    queryKey: ["Pins", "GetAll"],
    queryFn: async () =>
      (await axiosInstance.get("/pins")).data as PinResponse[],
  });
}
