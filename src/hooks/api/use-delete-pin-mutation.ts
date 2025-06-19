import { axiosInstance } from "@/lib/axios";
import type { PinResponse } from "@/lib/validation/pin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosError, type AxiosResponse } from "axios";

interface Props {
  id: string;
}

export function useDeletePinMutation({ id }: Props) {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<PinResponse>, AxiosError>({
    mutationKey: ["Pins", "Delete"],
    mutationFn: () => axiosInstance.delete(`/pins/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["Pins", "GetAll"],
      }),
  });
}
