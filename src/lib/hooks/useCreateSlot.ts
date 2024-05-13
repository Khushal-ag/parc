import { Slot } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateSlot({
  mutateFn,
  queryKey,
}: {
  mutateFn: (slot: number) => Promise<Slot[]>;
  queryKey: string[];
}) {
  const queryClient = useQueryClient();

  const { mutate: createSlot, isPending: isCreating } = useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      toast.success("Slot added successfully");
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return { createSlot, isCreating };
}
