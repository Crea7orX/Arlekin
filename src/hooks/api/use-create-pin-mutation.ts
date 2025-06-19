import { axiosInstance } from "@/lib/axios";
import type { PinCreate, PinResponse } from "@/lib/validation/pin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosError, type AxiosResponse } from "axios";

export function useCreatePinMutation() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<PinResponse>, AxiosError, PinCreate>({
    mutationKey: ["Pins", "Create"],
    mutationFn: (create) => axiosInstance.post("/pins", create),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["Pins", "GetAll"],
      }),
  });
}
