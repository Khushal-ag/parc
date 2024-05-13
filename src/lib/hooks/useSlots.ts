import { Slot } from "@/types";
import { QueryFunction, useQuery } from "@tanstack/react-query";

export function useSlots({
  queryFunction,
  queryKey,
}: {
  queryFunction: () => Promise<Slot[]>;
  queryKey: string[];
}) {
  const {
    isLoading,
    data: slots,
    error: errors,
  } = useQuery({
    queryKey: queryKey,
    queryFn: queryFunction as QueryFunction<Slot[]>,
  });
  return { isLoading, slots, errors };
}
