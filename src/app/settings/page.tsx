"use client";

import Card from "@/app/settings/Card";
import { Bike, Car } from "lucide-react";

import { useSlots } from "@/lib/hooks/useSlots";
import {
  addBikeSlot,
  addCarSlot,
  deleteBikeSlot,
  deleteCarSlot,
  getBikeSlots,
  getCarSlots,
} from "@/lib/services/apiSlots";
import Loader from "@/components/ui/Loader";

function Settings() {
  const {
    slots: carSlots,
    isLoading: isCarSlotLoading,
    errors: carSlotErrors,
  } = useSlots({
    queryKey: ["car_slots"],
    queryFunction: getCarSlots,
  });

  const {
    slots: bikeSlots,
    isLoading: isBikeSlotLoading,
    errors: bikeSlotErrors,
  } = useSlots({
    queryKey: ["bike_slots"],
    queryFunction: getBikeSlots,
  });

  if (isCarSlotLoading || isBikeSlotLoading) return <Loader />;

  if (carSlotErrors || bikeSlotErrors)
    return <div>Something went wrong. Please try again later.</div>;

  return (
    <div className="flex-col p-6">
      <div className="mb-24">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-stone-700">
          Settings
        </h1>
      </div>
      <div className="flex items-center justify-center gap-20">
        <Card
          icon={<Car size={38} className="text-orange-700" />}
          title="Car Slots"
          value={carSlots?.length || 0}
          addMutationFn={addCarSlot}
          deleteMutationFn={deleteCarSlot}
          queryKey={["car_slots"]}
        />
        <div className="h-36 w-1 rounded-lg bg-gray-300"></div>
        <Card
          icon={<Bike size={38} className="text-orange-700" />}
          title="Bike Slots"
          value={bikeSlots?.length || 0}
          addMutationFn={addBikeSlot}
          deleteMutationFn={deleteBikeSlot}
          queryKey={["bike_slots"]}
        />
      </div>
    </div>
  );
}

export default Settings;
