import { Slot } from "@/types";
import { Plus, Trash } from "lucide-react";

import { useCreateSlot } from "@/lib/hooks/useCreateSlot";
import { useDeleteSlot } from "@/lib/hooks/useDeleteSlot";
import Button from "@/components/ui/Button";

function Card({
  icon,
  title,
  value,
  queryKey,
  addMutationFn,
  deleteMutationFn,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  queryKey: string[];
  addMutationFn: (slot: number) => Promise<Slot[]>;
  deleteMutationFn: (slot: number) => Promise<null>;
}) {
  const { createSlot, isCreating } = useCreateSlot({
    mutateFn: addMutationFn,
    queryKey: queryKey,
  });
  const { deleteSlot, isDeleting } = useDeleteSlot({
    mutateFn: deleteMutationFn,
    queryKey: queryKey,
  });
  if (isCreating) console.log("Creating");
  if (isDeleting) console.log("Deleting");
  return (
    <div className="max-w-md space-y-6 rounded-lg border border-gray-200 bg-white px-12 py-6 shadow-lg">
      <div className=" flex items-center gap-3 space-y-2 text-center">
        <div className="rounded-full bg-orange-100 p-2">{icon}</div>
        <h1 className="text-3xl font-bold uppercase text-stone-800">{title}</h1>
      </div>
      <div className="flex-col space-y-2">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-zinc-600">{value}</h1>
        </div>
        <div className="flex justify-between p-4">
          <div>
            <Button
              onPress={() => {
                createSlot(value + 1);
              }}
              type="primary"
              disabled={isCreating ? true : false}
            >
              <Plus size={24} className="me-2" />
              Add Slot
            </Button>
          </div>
          <div>
            <Button
              onPress={() => {
                deleteSlot(value);
              }}
              type="danger"
              disabled={isDeleting}
            >
              <Trash size={24} className="me-2" />
              Delete Slot
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
