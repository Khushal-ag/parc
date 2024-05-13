import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteSlot({
  mutateFn,
  queryKey,
}: {
  mutateFn: (slot: number) => Promise<null>;
  queryKey: string[];
}) {
  const queryClient = useQueryClient();

  const { mutate: deleteSlot, isPending: isDeleting } = useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      toast.success("Slot removed successfully");
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return { deleteSlot, isDeleting };
}
