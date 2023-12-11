import { Vehicle } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateNewVehicle({
  mutateFn,
  queryKey,
}: {
  mutateFn: ({
    license_no,
    username,
  }: {
    license_no: string;
    username: string;
  }) => Promise<Vehicle[]>;

  queryKey: string[];
}) {
  const queryClient = useQueryClient();

  const { mutate: createNewVehicle, isPending: isCreating } = useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      toast.success("Vehicle added successfully");
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return { createNewVehicle, isCreating };
}
